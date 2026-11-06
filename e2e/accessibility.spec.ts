import { test, expect, type Page } from "@playwright/test";
import axe from "axe-core";
import { writeFile, mkdir } from "node:fs/promises";

test("release accessibility audit covers alternate UI states", async ({
  page,
  isMobile,
}, testInfo) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".billora")).toHaveAttribute("data-ready", "true");
  await page.addScriptTag({ content: axe.source });
  const states: Array<{
    state: string;
    violations: axe.Result[];
    incomplete: Array<{ id: string; nodes: number }>;
    passes: number;
  }> = [];
  async function scan(page: Page, state: string) {
    const result = await page.evaluate(async () =>
      (window as typeof window & { axe: typeof axe }).axe.run(document, {
        runOnly: {
          type: "tag",
          values: [
            "wcag2a",
            "wcag2aa",
            "wcag21aa",
            "wcag22aa",
            "best-practice",
          ],
        },
      }),
    );
    states.push({
      state,
      violations: result.violations,
      incomplete: result.incomplete.map((x) => ({
        id: x.id,
        nodes: x.nodes.length,
      })),
      passes: result.passes.length,
    });
  }
  await scan(page, "initial");
  for (const style of ["minimal", "professional"]) {
    await page
      .locator(".template-controls")
      .getByRole("button", { name: new RegExp(style, "i") })
      .click();
    await scan(page, `style-${style}`);
  }
  for (const stage of ["Record a payment", "See the full picture"]) {
    await page
      .locator(".stage-tabs")
      .getByRole("button", { name: stage })
      .click();
    await scan(page, stage);
  }
  const views = page.locator(
    isMobile ? ".workspace-mobile-tabs" : ".workspace-sidebar",
  );
  for (const view of ["Clients", "Invoices"]) {
    await views.getByRole("button", { name: new RegExp(view) }).click();
    await scan(page, `workspace-${view}`);
  }
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await scan(page, "mobile-menu");
  }
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    `artifacts/accessibility-${testInfo.project.name.replace(/ /g, "-")}.json`,
    JSON.stringify(states, null, 2),
  );
  expect(
    states.flatMap((s) =>
      s.violations.map((v) => ({
        state: s.state,
        id: v.id,
        impact: v.impact,
        count: v.nodes.length,
      })),
    ),
  ).toEqual([]);
});
