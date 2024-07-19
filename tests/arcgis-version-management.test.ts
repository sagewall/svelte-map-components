import { expect, test } from '@playwright/test';

test('map route has expected arcgis-locate', async ({ page }) => {
	await page.goto('/secure-services');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-version-management-dropdown-item').click();
	await page.getByTestId('arcgis-version-management-dropdown-item-action').click();
	await expect(page.locator('arcgis-version-management')).toBeVisible();
});
