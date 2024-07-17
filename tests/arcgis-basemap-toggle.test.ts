import { expect, test } from '@playwright/test';

test('home page has expected arcgis-basemap-toggle', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-basemap-toggle-dropdown-item').click();
	await page.getByTestId('arcgis-basemap-toggle-dropdown-item-action').click();
	await expect(page.locator('arcgis-basemap-toggle')).toBeVisible();
});
