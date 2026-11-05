# ADAPT_GUIDE.md - Use This Agent for ANY Web App / Any Server

This guide tells you what to change when you want to test YOUR app instead of playwright.dev.

## You Need to Change Only 3 Files

### 1. `playwright.config.ts` - THE MAIN FILE
This is where you point to your app.

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'https://YOUR_APP_URL_HERE', // <-- CHANGE THIS
    // Examples:
    // 'http://localhost:3000'
    // 'http://localhost:5173'
    // 'https://myapp.vercel.app'
    // 'https://playwright.dev' (current)
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  // If your app runs locally, UNCOMMENT this:
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});