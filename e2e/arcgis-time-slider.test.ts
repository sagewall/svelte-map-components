import { expect, test } from '@playwright/test';

test('map route has expected table list', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-time-slider-dropdown-item').click();
	await page.getByTestId('arcgis-time-slider-dropdown-item-action').click();
	await expect(page.locator('arcgis-time-slider')).toBeVisible();
});
