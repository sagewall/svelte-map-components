import { expect, test } from '@playwright/test';

test('home page has expected arcgis-bookmarks', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-bookmarks-dropdown-item').click();
	await page.getByTestId('arcgis-bookmarks-dropdown-item-action').click();
	await expect(page.locator('arcgis-bookmarks')).toBeVisible();
});
