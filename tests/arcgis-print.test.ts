import { expect, test } from '@playwright/test';

test('map route has expected arcgis-print', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-print-dropdown-item').click();
	await page.getByTestId('arcgis-print-dropdown-item-action').click();
	await expect(page.locator('arcgis-print')).toBeVisible();
});
