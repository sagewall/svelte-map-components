import { expect, test } from '@playwright/test';

test('map route has expected directions', async ({ page }) => {
	await page.goto('/map');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-directions-dropdown-item').click();
	await page.getByTestId('arcgis-directions-dropdown-item-action').click();
	await expect(page.locator('arcgis-directions')).toBeVisible();
});
