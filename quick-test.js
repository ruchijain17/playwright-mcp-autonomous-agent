import { generateTool } from './dist/mcp-server/tools/generate-tool.js';
import { mockTool } from './dist/mcp-server/tools/mock-tool.js';

await mockTool({ apiPattern: "**/api/**", scenario: "happy_path", outputPath: "mocks/api.mocks.ts" });
await generateTool({ route: "/dashboard", component: "Dashboard", outputPath: "e2e/dashboard.spec.ts", useMocks: true });

console.log("✅ Files generated! Check mocks/ and e2e/ folders");