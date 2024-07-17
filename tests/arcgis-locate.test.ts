import { expect, test } from '@playwright/test';

test('home page has expected arcgis-locate', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-locate-dropdown-item').click();
	await page.getByTestId('arcgis-locate-dropdown-item-action').click();
	await expect(page.locator('arcgis-locate')).toBeVisible();
});
