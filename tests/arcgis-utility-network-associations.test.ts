import { expect, test } from '@playwright/test';

test('map route has expected arcgis-locate', async ({ page }) => {
	await page.goto('/secure-services');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-utility-network-associations-dropdown-item').click();
	await page.getByTestId('arcgis-utility-network-associations-dropdown-item-action').click();
	await expect(page.locator('arcgis-utility-network-associations')).toBeVisible();
});
