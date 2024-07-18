import { expect, test } from '@playwright/test';

test('home route has expected scene', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('arcgis-scene')).toBeVisible();
});
