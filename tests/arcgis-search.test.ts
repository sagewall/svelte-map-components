import { expect, test } from '@playwright/test';

test('home page has expected arcgis-search', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-search-dropdown-item').click();
	await page.getByTestId('arcgis-search-dropdown-item-action').click();
	await expect(page.locator('arcgis-search')).toBeVisible();
});
