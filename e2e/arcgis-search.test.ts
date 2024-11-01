import { expect, test } from '@playwright/test';

test('map route has expected arcgis-search', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-search-dropdown-item').click();
	await page.getByTestId('arcgis-search-dropdown-item-action').click();
	await expect(page.locator('arcgis-search')).toBeVisible();
});
