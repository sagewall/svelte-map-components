import { expect, test } from '@playwright/test';

test('home page has expected arcgis-layer-list', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-layer-list-dropdown-item').click();
	await page.getByTestId('arcgis-layer-list-dropdown-item-action').click();
	await expect(page.locator('arcgis-layer-list')).toBeVisible();
});
