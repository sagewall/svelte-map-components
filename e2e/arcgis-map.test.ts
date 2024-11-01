import { expect, test } from '@playwright/test';

test('map route has expected map', async ({ page }) => {
	await page.goto('/map');
	await expect(page.locator('arcgis-map')).toBeVisible();
});

test('utility-network route has expected map', async ({ page }) => {
	await page.goto('/secure-services');
	await expect(page.locator('arcgis-map')).toBeVisible();
});
