import { expect, test } from '@playwright/test';

test('home page has expected map', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('arcgis-map')).toBeVisible();
});
