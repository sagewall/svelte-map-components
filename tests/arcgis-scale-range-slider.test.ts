import { expect, test } from '@playwright/test';

test('home page has expected arcgis-scale-range-slider', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-scale-range-slider-dropdown-item').click();
	await page.getByTestId('arcgis-scale-range-slider-dropdown-item-action').click();
	await expect(page.locator('arcgis-scale-range-slider')).toBeVisible();
});
