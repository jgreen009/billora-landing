import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.billora')).toHaveAttribute('data-ready', 'true');
});
test('desktop wheel gestures are slowed and still reverse cleanly', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Touch keeps native scrolling.');
  await expect(page.locator('html')).toHaveAttribute('data-scroll', 'smooth');
  await page.mouse.move(1100, 600);
  await page.mouse.wheel(0, 600);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(180);
  expect(await page.evaluate(() => window.scrollY)).toBeLessThan(400);
  await page.mouse.wheel(0, -600);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(10);
});
test('smooth anchor navigation retains the hash and clears the sticky header', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Touch uses browser anchors.');
  await page.locator('.hero-actions a').first().click();
  await expect(page).toHaveURL(/#workflow$/);
  await expect.poll(() => page.locator('#workflow').evaluate(el => Math.round(el.getBoundingClientRect().top))).toBeGreaterThanOrEqual(80);
  await expect.poll(() => page.locator('#workflow').evaluate(el => Math.round(el.getBoundingClientRect().top))).toBeLessThan(140);
});
test('reduced motion immediately removes wheel smoothing', async ({ page, isMobile }) => {
  test.skip(isMobile, 'No wheel smoothing is applied to touch.');
  await expect(page.locator('html')).toHaveAttribute('data-scroll', 'smooth');
  await page.locator('.motion-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-scroll', 'native');
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
  await page.locator('.brand').first().click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
  await page.mouse.move(1100, 600);
  await page.mouse.wheel(0, 600);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(450);
});
test('the menu pauses and releases smoothing on desktop-sized pointers', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Native touch menu coverage lives in the landing-page suite.');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.locator('html')).toHaveClass(/lenis-stopped/);
  await page.keyboard.press('Escape');
  await expect(page.locator('html')).not.toHaveClass(/lenis-stopped/);
  await page.mouse.move(200, 500);
  await page.mouse.wheel(0, 600);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.locator('.mobile-menu a[href="#workflow"]').first().click();
  await expect(page.locator('.mobile-menu')).toHaveCount(0);
  await expect(page.locator('html')).not.toHaveClass(/lenis-stopped/);
  await expect(page).toHaveURL(/#workflow$/);
  await expect.poll(() => page.locator('#workflow').evaluate(el => Math.round(el.getBoundingClientRect().top))).toBeLessThan(140);
});
test('keyboard anchor navigation focuses its destination', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop keyboard interaction.');
  await expect(page.locator('html')).toHaveAttribute('data-scroll', 'smooth');
  await page.locator('.hero-actions a').first().focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#workflow$/);
  await expect(page.locator('#workflow')).toBeFocused();
});
test('touch and OS reduced motion stay native', async ({ page, isMobile }) => {
  if (isMobile)
    await expect(page.locator('html')).toHaveAttribute('data-scroll', 'native');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await expect(page.locator('html')).toHaveAttribute('data-scroll', 'native');
  await expect(page.locator('.b-nav')).toBeVisible();
  await expect(page.locator('.hero-actions')).toBeVisible();
});
