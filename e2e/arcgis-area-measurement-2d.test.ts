import { expect, test } from '@playwright/test';

test('map route has expected arcgis-area-measurement-2d', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-area-measurement-2d-dropdown-item').click();
	await page.getByTestId('arcgis-area-measurement-2d-dropdown-item-action').click();
	await expect(page.locator('arcgis-area-measurement-2d')).toBeVisible();
});
