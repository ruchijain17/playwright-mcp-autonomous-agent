import { chromium } from 'playwright';
import fs from 'fs';

const baseURL = 'https://playwright.dev';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(baseURL);

const hrefs = await page.$$eval('a[href^="/"]', els => [...new Set(els.map(e => e.getAttribute('href')))].slice(0, 10));
console.log('Discovered:', hrefs);

const tests = hrefs.map(url => `
  test('discovered: ${url}', async ({ page }) => {
    await page.goto('${url}');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });
  });`).join('\n');

const content = `import { test, expect } from '@playwright/test';
import { setupMocks } from '../mocks/api.mocks';

test.describe('Autonomous Discovered', () => {
  test.beforeEach(async ({ page }) => { await setupMocks(page); });
${tests}
});
`;

fs.writeFileSync('e2e/discovered.spec.ts', content);
console.log('✅ Generated e2e/discovered.spec.ts');
await browser.close();