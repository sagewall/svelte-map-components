import { expect, test } from '@playwright/test';

test('home page has expected arcgis-editor', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-editor-dropdown-item').click();
	await page.getByTestId('arcgis-editor-dropdown-item-action').click();
	await expect(page.locator('arcgis-editor')).toBeVisible();
});
