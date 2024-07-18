import { expect, test } from '@playwright/test';

test('map route has expected arcgis-locate', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-locate-dropdown-item').click();
	await page.getByTestId('arcgis-locate-dropdown-item-action').click();
	await expect(page.locator('arcgis-locate')).toBeVisible();
});
