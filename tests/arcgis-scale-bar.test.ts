import { expect, test } from '@playwright/test';

test('map route has expected arcgis-scale-bar', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-scale-bar-dropdown-item').click();
	await page.getByTestId('arcgis-scale-bar-dropdown-item-action').click();
	await expect(page.locator('arcgis-scale-bar')).toBeVisible();
});
