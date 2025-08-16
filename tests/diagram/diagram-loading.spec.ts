import { test, expect } from '@playwright/test';

test('all traffic flow diagrams open on button click', async ({ page }) => {
  await page.goto('https://samwi.in/examples/');

  const buttons = page.locator('button:has-text("Click me to see traffic flow!")');
  const count = await buttons.count();

  console.log(`Found ${count} buttons`);

  for (let i = 0; i < count; i++) {
    console.log(`Clicking button ${i + 1}`);

    await buttons.nth(i).click();

    const diagram = page.locator('.diagram-overlay');
    await expect(diagram).toBeVisible({ timeout: 20000 }); // wait for overlay

    // Optional: take screenshot to see what's happening
    await page.screenshot({ path: `diagram-${i + 1}.png` });

    // Close the overlay by pressing Escape
    await page.keyboard.press('Escape');

    // Wait a bit before next button click
    await page.waitForTimeout(1000);
  }
});
