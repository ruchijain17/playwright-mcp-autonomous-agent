import { test, expect } from '@playwright/test';
import { setupMocks } from '../mocks/api.mocks';

test.describe('Autonomous Discovered', () => {
  test.beforeEach(async ({ page }) => { await setupMocks(page); });

  test('discovered: /', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });
  });

  test('discovered: /docs/intro', async ({ page }) => {
    await page.goto('/docs/intro');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });
  });

  test('discovered: /mcp/introduction', async ({ page }) => {
    await page.goto('/mcp/introduction');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });
  });

  test('discovered: /agent-cli/introduction', async ({ page }) => {
    await page.goto('/agent-cli/introduction');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });
  });

  test('discovered: /docs/api/class-playwright', async ({ page }) => {
    await page.goto('/docs/api/class-playwright');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });
  });

  test('discovered: /python/', async ({ page }) => {
    await page.goto('/python/');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });
  });

  test('discovered: /java/', async ({ page }) => {
    await page.goto('/java/');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });
  });

  test('discovered: /dotnet/', async ({ page }) => {
    await page.goto('/dotnet/');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });
  });

  test('discovered: /docs/getting-started-cli', async ({ page }) => {
    await page.goto('/docs/getting-started-cli');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });
  });

  test('discovered: /docs/getting-started-mcp', async ({ page }) => {
    await page.goto('/docs/getting-started-mcp');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });
  });
});
