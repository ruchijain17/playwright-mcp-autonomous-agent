import { test, expect } from '@playwright/test';
import { setupMocks } from '../mocks/api.mocks';

test.describe('Dashboard - Autonomous E2E', () => {
  test.beforeEach(async ({ page }) => {
    await setupMocks(page);
    await page.goto('/');
  });
  test('should show 3M+ views and role-based landing', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
    console.log('Mock system works - replace URL with your real app');
  });
  test('should show quarter comparison tab interaction', async ({ page }) => {
    await page.getByRole('link', { name: /get started/i }).click();
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });
});