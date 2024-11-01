import { expect, test } from '@playwright/test';

test('map route has expected arcgis-basemap-toggle', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-basemap-toggle-dropdown-item').click();
	await page.getByTestId('arcgis-basemap-toggle-dropdown-item-action').click();
	await expect(page.locator('arcgis-basemap-toggle')).toBeVisible();
});
