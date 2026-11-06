import { test, expect } from "@playwright/test";

test("release routes, assets and security headers are present", async ({
  request,
}) => {
  const home = await request.get("/");
  expect(home.ok()).toBeTruthy();
  expect(home.headers()["x-content-type-options"]).toBe("nosniff");
  expect(home.headers()["x-frame-options"]).toBe("DENY");
  expect(home.headers()["x-powered-by"]).toBeUndefined();
  for (const route of [
    "/robots.txt",
    "/sitemap.xml",
    "/manifest.json",
    "/og-image.png",
    "/icon.svg",
    "/favicon.ico",
    "/apple-touch-icon.png",
  ]) {
    const response = await request.get(route);
    expect(response.ok(), route).toBeTruthy();
  }
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).not.toContain("localhost");
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).not.toContain("localhost");
  const missing = await request.get("/this-page-does-not-exist");
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain("A little off the paper trail.");
});

test("every local navigation target exists and skip link focuses main", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".billora")).toHaveAttribute("data-ready", "true");
  const broken = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter(
          (href) =>
            href && href !== "#" && !document.getElementById(href.slice(1)),
        ),
    );
  expect(broken).toEqual([]);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to main content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("page remains readable with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(
    (test.info().project.use.baseURL as string) || "http://localhost:3000",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Great work deserves",
  );
  await expect(page.locator(".hero-actions a").first()).toHaveAttribute(
    "href",
    "#workflow",
  );
  await expect(page.locator(".b-footer")).toContainText("Fictional data");
  await context.close();
});
