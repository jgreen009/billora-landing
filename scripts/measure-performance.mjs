import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

// Repeatable lab observations, not a Lighthouse score or real-user telemetry.
const baseURL = process.argv[2] || "http://localhost:3002";
const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const client = await context.newCDPSession(page);
  await client.send("Network.enable");
  await client.send("Network.setCacheDisabled", { cacheDisabled: true });
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: 200000,
    uploadThroughput: 93750,
  });
  await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    window.__billoraVitals = { lcp: 0, cls: 0 };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        window.__billoraVitals.lcp = entry.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        if (!entry.hadRecentInput) window.__billoraVitals.cls += entry.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(baseURL, { waitUntil: "load" });
  await page.waitForTimeout(6000); // Give the first-view animations and observers time to finish.
  const observed = await page.evaluate(() => ({
    lcpMs: Math.round(window.__billoraVitals.lcp),
    cls: Number(window.__billoraVitals.cls.toFixed(5)),
    resources: performance
      .getEntriesByType("resource")
      .map((r) => ({ type: r.initiatorType, bytes: r.encodedBodySize })),
  }));
  const report = {
    conditions: {
      viewport: "390 × 844",
      latencyMs: 150,
      downloadMbps: 1.6,
      cpuSlowdown: 4,
      cache: "disabled",
    },
    lcpMs: observed.lcpMs,
    cls: observed.cls,
    firstViewTransferKB: Math.round(
      observed.resources.reduce((sum, r) => sum + r.bytes, 0) / 1024,
    ),
    resourceCount: observed.resources.length,
  };
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/performance-mobile.json",
    JSON.stringify(report, null, 2),
  );
  await page.screenshot({ path: "artifacts/release-mobile-hero.png" });
  console.log(JSON.stringify(report, null, 2));
  await context.close();
} finally {
  await browser.close();
}
