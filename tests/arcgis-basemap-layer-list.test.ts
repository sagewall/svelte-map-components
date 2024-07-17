import { expect, test } from '@playwright/test';

test('home page has expected arcgis-basemap-layer-list', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-basemap-layer-list-dropdown-item').click();
	await page.getByTestId('arcgis-basemap-layer-list-dropdown-item-action').click();
	await expect(page.locator('arcgis-basemap-layer-list')).toBeVisible();
});
