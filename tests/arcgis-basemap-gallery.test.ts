import { expect, test } from '@playwright/test';

test('home page has expected arcgis-basemap-gallery', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-basemap-gallery-dropdown-item').click();
	await page.getByTestId('arcgis-basemap-gallery-dropdown-item-action').click();
	await expect(page.locator('arcgis-basemap-gallery')).toBeVisible();
});
