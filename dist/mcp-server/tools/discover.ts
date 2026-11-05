import { chromium } from 'playwright';
import fs from 'fs';

export async function discoverAndGenerate(baseURL = 'https://playwright.dev', limit = 10) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(baseURL);

  // 1. Autonomous discovery: get all nav links
  const links = await page.getByRole('link').all();
  const urls: string[] = [];
  for (const link of links.slice(0, limit)) {
    try {
      const href = await link.getAttribute('href');
      if (href && href.startsWith('/') && !urls.includes(href)) {
        urls.push(href);
      }
    } catch {}
  }

  console.log(`Discovered ${urls.length} routes:`, urls);

  // 2. Auto-generate tests
  const tests = urls.map(url => `
  test('autonomous: discovered route ${url}', async ({ page }) => {
    await page.goto('${url}');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/.*${url.replace(/\//g, '')}/);
  });`).join('\n');

  const content = `
import { test, expect } from '@playwright/test';
import { setupMocks } from '../mocks/api.mocks';

test.describe('Autonomous Discovered Routes', () => {
  test.beforeEach(async ({ page }) => {
    await setupMocks(page);
  });
${tests}
});
`;

  fs.writeFileSync('e2e/discovered.spec.ts', content);
  console.log('✅ Generated e2e/discovered.spec.ts with', urls.length, 'tests');
  
  await browser.close();
}

discoverAndGenerate();