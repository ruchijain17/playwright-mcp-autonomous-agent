# Autonomous Setup - Just Open in VS Code

## For User: Do this first
1. Open folder `playwright-mcp-autonomous-agent` in VS Code
2. Open Copilot Chat and type: `@workspace Follow SETUP.md and run everything`
3. Done.

## What Copilot will do automatically (from this file)
- `npm install`
- `npm run build` -> compiles MCP tools
- `npx playwright install chromium` -> installs browsers
- `npx playwright test --headed` -> verifies 2 base tests
- `node discover.mjs` -> generates discovered tests
- `npx playwright test` -> runs all 5 tests

## Manual fallback if Copilot not available
```bash
npm install
npm run build
npx playwright install
npx playwright test --headed