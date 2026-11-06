import { test, expect } from "@playwright/test";

// Check user-visible behavior instead of animation-library implementation details.
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".billora")).toHaveAttribute("data-ready", "true");
});

test("the complete page has a clear primary action and no nested controls", async ({
  page,
}) => {
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Great work deserves better billing.",
  );
  await expect(page.locator(".hero-actions a").first()).toHaveAttribute(
    "href",
    "#workflow",
  );
  await expect(page.locator("button a, a button")).toHaveCount(0);
  for (const id of ["workflow", "features", "showcase", "faq"])
    await expect(page.locator(`#${id}`)).toBeAttached();
});

test("all layouts fit their viewport without horizontal scrolling", async ({
  page,
}) => {
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const layout = await page.evaluate(() => ({
      page: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    expect(layout.page, `overflow at ${width}px`).toBeLessThanOrEqual(
      layout.viewport,
    );
  }
});

test("document styles change the preview while retaining the sample total", async ({
  page,
}) => {
  for (const style of ["minimal", "professional", "modern"]) {
    const button = page
      .locator(".template-controls")
      .getByRole("button", { name: new RegExp(style, "i") });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".showcase-paper .paper")).toHaveClass(
      new RegExp(`paper-${style}`),
    );
    await expect(page.locator(".showcase-paper .paper-total")).toContainText(
      "$6,123.60",
    );
  }
});

test("workflow controls show the right document, payment, and balance", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  const controls = page.locator(".stage-tabs");
  await controls.getByRole("button", { name: "Make it an invoice" }).click();
  await expect(page.locator(".stage-visual")).toContainText("INV–0032");
  await controls.getByRole("button", { name: "Record a payment" }).click();
  await expect(page.locator(".record-payment")).toContainText("$2,000.00");
  await expect(page.locator(".record-payment")).toContainText("$4,123.60");
  await controls.getByRole("button", { name: "See the full picture" }).click();
  await expect(page.locator(".balance-ring")).toContainText("$4,123.60");
  await controls.getByRole("button", { name: "Prepare a quote" }).click();
  await expect(page.locator(".stage-visual")).toContainText("QT–0018");
});

test("desktop scroll advances the sticky story", async ({ page, isMobile }) => {
  test.skip(isMobile, "Touch uses explicit stage controls.");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  await page.locator("#story-2").scrollIntoViewIfNeeded();
  await expect(page.locator(".stage-tabs button").nth(2)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator(".record-payment")).toContainText("$2,000.00");
  await page.locator("#story-3").scrollIntoViewIfNeeded();
  await expect(page.locator(".balance-ring")).toBeVisible();
});

test("motion preference persists and stops page motion immediately", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  const toggle = page.locator(".motion-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await page.reload();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".hero-workspace")).toBeVisible();
});

test("FAQ controls expose and hide their associated answer", async ({
  page,
}) => {
  const question = page.getByRole("button", {
    name: "Does Billora process payments?",
  });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#answer-2")).toContainText(
    "does not process payments",
  );
  await question.click();
  await expect(page.locator("#answer-2")).toBeHidden();
});

test("mobile menu traps focus, closes on Escape, and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const opener = page.getByRole("button", { name: "Open menu" });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Navigation menu" });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("link", { name: "Billora home" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("link", { name: "A few answers" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  await opener.click();
  await dialog.getByRole("link", { name: "The documents" }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#showcase$/);
  await expect(page.locator("#showcase-heading")).toBeInViewport();
});

test("sample workspace changes views", async ({ page, isMobile }) => {
  test.skip(isMobile, "Compact preview omits the sidebar.");
  await page
    .locator(".workspace-sidebar")
    .getByRole("button", { name: "Clients" })
    .click();
  await expect(page.locator(".workspace-clients")).toContainText(
    "Northstar Builders",
  );
  await page
    .locator(".workspace-sidebar")
    .getByRole("button", { name: /Invoices/ })
    .click();
  await expect(page.locator(".workspace-invoice-summary")).toContainText(
    "$6,123.60",
  );
  await page
    .locator(".workspace-sidebar")
    .getByRole("button", { name: "Overview" })
    .click();
  await expect(page.locator(".workspace-stats")).toBeVisible();
});

test("page loads without runtime errors and the brand image loads", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.reload();
  const image = page.getByAltText(
    "Sculptural ivory paper ribbon with a cobalt blue interior",
  );
  await image.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      image.evaluate((node) => (node as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test("capture desktop and mobile review artifacts", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page.locator(".billora")).toHaveAttribute(
      "data-ready",
      "true",
    );
    await page.screenshot({
      path: `artifacts/billora-${name}-hero.png`,
      scale: "css",
    });
    for (const [section, selector] of [
      ["features", "#features"],
      ["documents", "#showcase"],
      ["statement", ".statement"],
      ["closing", ".closing"],
    ] as const) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.screenshot({
        path: `artifacts/billora-${name}-${section}.png`,
        scale: "css",
      });
    }
  }
});

test("mobile workspace views remain interactive without a sidebar", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const views = page.getByRole("group", { name: "Sample workspace views" });
  await views.getByRole("button", { name: "Clients" }).click();
  await expect(page.locator(".workspace-clients")).toContainText(
    "Northstar Builders",
  );
  await views.getByRole("button", { name: "Invoices" }).click();
  await expect(page.locator(".workspace-invoice-summary")).toContainText(
    "$6,123.60",
  );
  await views.getByRole("button", { name: "Overview" }).click();
  await expect(page.locator(".workspace-stats")).toBeVisible();
});

test("workflow and style controls support arrow and endpoint keys", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator(".billora")).toHaveAttribute("data-ready", "true");
  const stages = page.getByRole("group", { name: "Choose workflow stage" });
  const first = stages.getByRole("button", { name: "Prepare a quote" });
  await first.focus();
  await first.press("ArrowRight");
  await expect(
    stages.getByRole("button", { name: "Make it an invoice" }),
  ).toBeFocused();
  await expect(
    page.getByRole("region", { name: "Make it an invoice preview" }),
  ).toContainText("INV–0032");
  await page.keyboard.press("End");
  await expect(
    stages.getByRole("button", { name: "See the full picture" }),
  ).toHaveAttribute("aria-pressed", "true");
  const styles = page.getByRole("group", { name: "Document style" });
  const modern = styles.getByRole("button", { name: /modern/i });
  await modern.focus();
  await modern.press("ArrowDown");
  await expect(
    styles.getByRole("button", { name: /professional/i }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Home");
  await expect(
    styles.getByRole("button", { name: /minimal/i }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("navigation follows the visible section", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const id of ["features", "showcase", "workflow"]) {
    await page
      .locator(`#${id}`)
      .evaluate((node) =>
        node.scrollIntoView({ block: "start", behavior: "instant" }),
      );
    await expect(page.locator(`.desktop-nav a[href="#${id}"]`)).toHaveAttribute(
      "aria-current",
      "location",
    );
  }
});
