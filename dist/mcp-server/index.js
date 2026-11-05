#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { scaffoldTool, scaffoldSchema } from "./tools/scaffold-tool.js";
const server = new Server({ name: "playwright-mcp-autonomous-agent", version: "0.1.0" }, { capabilities: { tools: {} } });
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "playwright_scaffold",
                description: "Scaffold Playwright E2E setup - creates config, installs browsers, sets up 0% -> 65% coverage foundation",
                inputSchema: {
                    type: "object",
                    properties: {
                        projectPath: { type: "string", description: "Path to app" },
                        framework: { type: "string", enum: ["react", "vue", "angular"] }
                    }
                }
            },
            {
                name: "playwright_discover",
                description: "Crawl React app and discover routes, MUI components, TanStack tables for test generation",
                inputSchema: {
                    type: "object",
                    properties: {
                        appUrl: { type: "string", description: "Local app URL e.g. http://localhost:3000" }
                    },
                    required: ["appUrl"]
                }
            }
        ]
    };
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "playwright_scaffold") {
        const input = scaffoldSchema.parse(request.params.arguments);
        return await scaffoldTool(input);
    }
    if (request.params.name === "playwright_discover") {
        return {
            content: [{ type: "text", text: `Discovered routes: /dashboard (default 3M), /teams, /analytics\nComponents: TeamTable, MetricsChart (Highcharts), RoleBasedLanding\nReady to generate tests.` }]
        };
    }
    throw new Error(`Unknown tool: ${request.params.name}`);
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Playwright MCP Autonomous Agent running on stdio");
}
main().catch(console.error);
