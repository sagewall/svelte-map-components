import { expect, test } from '@playwright/test';

test('map route has expected arcgis-compass', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-compass-dropdown-item').click();
	await page.getByTestId('arcgis-compass-dropdown-item-action').click();
	await expect(page.locator('arcgis-compass')).toBeVisible();
});
