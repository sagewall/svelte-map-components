import { expect, test } from '@playwright/test';

test('map route has expected arcgis-locate', async ({ page }) => {
	await page.goto('/utility-network');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-utility-network-trace-dropdown-item').click();
	await page.getByTestId('arcgis-utility-network-trace-dropdown-item-action').click();
	await expect(page.locator('arcgis-utility-network-trace')).toBeVisible();
});
