# Playwright MCP Agent - Error Log & Fixes

## Error 1: `dist/mcp-server/tools` not found / build failed
**When:** Initial run `npm run build`
**Why:** TypeScript src not compiled, tools folder missing.
**Fix:** `tsconfig.json` ensure outDir=dist + `npm run build` which runs `tsc`

## Error 2: `webServer` failed - Exit code 1
**When:** `npx playwright test`
**Log:** `Process from config.webServer was not able to start. Exit code: 1`
**Why:** `playwright.config.ts` had `webServer: { command: 'npm run dev' }` but no Vite/React app exists. We are testing playwright.dev.
**Fix:** Remove entire `webServer` block from `playwright.config.ts`. Keep only `baseURL: 'https://playwright.dev'`

## Error 3: Strict mode violation - getByRole('heading') resolved to 19 elements
**When:** `e2e/dashboard.spec.ts:16`
**Why:** `page.getByRole('heading')` too generic, Playwright finds 19 h1-h4.
**Fix:** Make specific:
`await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();`
Rule: Always use `{ name: /.../i }` or `{ level: 1 }` + `.first()`

## Error 4: ERR_MODULE_NOT_FOUND for `src/mcp-server/tools/discover.ts`
**When:** `npx tsx src/.../discover.ts`
**Why:** Path with spaces `Ruchi Jain` + tsx ESM resolver issue.
**Fix:** Created simple `discover.mjs` in project root using ESM, no tsx needed. Run with `node discover.mjs`

## Error 5: Tests timeout / heading not visible
**Why:** Used static `waitForTimeout`. Not autonomous.
**Fix:** Use `expect(...).toBeVisible({ timeout: 10000 })` - web-first assertions.