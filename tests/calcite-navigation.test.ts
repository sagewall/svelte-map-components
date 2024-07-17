import { expect, test } from '@playwright/test';

test('home page has expected navigation', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('calcite-navigation')).toBeVisible();
});
