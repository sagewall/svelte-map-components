import { expect, test } from '@playwright/test';

test('map route has expected arcgis-home', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-home-dropdown-item').click();
	await page.getByTestId('arcgis-home-dropdown-item-action').click();
	await expect(page.locator('arcgis-home')).toBeVisible();
});
