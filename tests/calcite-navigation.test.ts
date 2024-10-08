import { expect, test } from '@playwright/test';

test('home route has expected navigation', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('calcite-navigation')).toBeVisible();
});

test('map route has expected navigation', async ({ page }) => {
	await page.goto('/map');
	await expect(page.locator('calcite-navigation')).toBeVisible();
});
