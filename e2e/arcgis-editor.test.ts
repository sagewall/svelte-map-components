import { expect, test } from '@playwright/test';

test('map route has expected arcgis-editor', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-editor-dropdown-item').click();
	await page.getByTestId('arcgis-editor-dropdown-item-action').click();
	await expect(page.locator('arcgis-editor')).toBeVisible();
});
