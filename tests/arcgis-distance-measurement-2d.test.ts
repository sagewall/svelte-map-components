import { expect, test } from '@playwright/test';

test('home page has expected arcgis-distance-measurement-2d', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-distance-measurement-2d-dropdown-item').click();
	await page.getByTestId('arcgis-distance-measurement-2d-dropdown-item-action').click();
	await expect(page.locator('arcgis-distance-measurement-2d')).toBeVisible();
});
