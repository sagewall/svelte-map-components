import { expect, test } from '@playwright/test';

test('map route has expected arcgis-legend', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-legend-dropdown-item').click();
	await page.getByTestId('arcgis-legend-dropdown-item-action').click();
	await expect(page.locator('arcgis-legend')).toBeVisible();
});
