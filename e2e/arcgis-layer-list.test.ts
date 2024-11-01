import { expect, test } from '@playwright/test';

test('map route has expected arcgis-layer-list', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-layer-list-dropdown-item').click();
	await page.getByTestId('arcgis-layer-list-dropdown-item-action').click();
	await expect(page.getByTitle('Census Tracts')).toBeVisible();
});
