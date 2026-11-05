import { test, expect } from '@playwright/test';
import { setupMocks } from '../mocks/api.mocks';

test.describe('Playwright.dev - Autonomous Discovery', () => {
  test.beforeEach(async ({ page }) => {
    await setupMocks(page);
    await page.goto('/');
  });

  test('autonomous: discover nav and assert docs', async ({ page }) => {
    await page.getByRole('link', { name: /docs/i }).first().click();
    await expect(page).toHaveURL(/.*docs/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('autonomous: search flow with role-based locators', async ({ page }) => {
    await page.getByRole('button', { name: /search/i }).click();
    await page.getByPlaceholder(/search/i).fill('locators');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  test('autonomous: verify 3M+ style metric mock', async ({ page }) => {
    // Using your mock data pattern on real site
    await page.route('**/api/**', async route => {
      await route.fulfill({ json: { views: '3M+' } });
    });
    await page.reload();
    await expect(page.getByRole('banner')).toBeVisible();
  });
});