import { expect, test } from '@playwright/test';

test('home page has expected arcgis-home', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-home-dropdown-item').click();
	await page.getByTestId('arcgis-home-dropdown-item-action').click();
	await expect(page.locator('arcgis-home')).toBeVisible();
});
