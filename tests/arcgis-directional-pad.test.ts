import { expect, test } from '@playwright/test';

test('home page has expected arcgis-directional-pad', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('select-components').click();
	await page.getByTestId('arcgis-directional-pad-dropdown-item').click();
	await page.getByTestId('arcgis-directional-pad-dropdown-item-action').click();
	await expect(page.locator('arcgis-directional-pad')).toBeVisible();
});
