import { expect, test } from '@playwright/test';

test('home page has expected arcgis-coordinate-conversion', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-coordinate-conversion-dropdown-item').click();
	await page.getByTestId('arcgis-coordinate-conversion-dropdown-item-action').click();
	await expect(page.locator('arcgis-coordinate-conversion')).toBeVisible();
});
