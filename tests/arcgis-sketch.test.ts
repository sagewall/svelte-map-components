import { expect, test } from '@playwright/test';

test('map route has expected sketch', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-sketch-dropdown-item').click();
	await page.getByTestId('arcgis-sketch-dropdown-item-action').click();
	await expect(page.locator('arcgis-sketch')).toBeVisible();
});
