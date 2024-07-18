import { expect, test } from '@playwright/test';

test('home route has expected map', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('arcgis-map')).toBeVisible();
});

test('map route has expected map', async ({ page }) => {
	await page.goto('/map');
	await expect(page.locator('arcgis-map')).toBeVisible();
});
