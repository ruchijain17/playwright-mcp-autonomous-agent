#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { execSync } from "child_process";
import fs from "fs";

const server = new Server(
  { name: "playwright-autonomous-agent", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler({ method: "tools/list" }, async () => ({
  tools: [
    {
      name: "discover_app",
      description: "Crawl any web app and discover UI elements, forms, buttons",
      inputSchema: { type: "object", properties: { url: { type: "string", description: "URL to discover, e.g. http://localhost:3000" } }, required: ["url"] }
    },
    {
      name: "run_autonomous_tests",
      description: "Run the autonomous Playwright test suite and return results",
      inputSchema: { type: "object", properties: {} }
    },
    {
      name: "get_error_knowledge",
      description: "Get error solutions from knowledge base",
      inputSchema: { type: "object", properties: { error: { type: "string" } } }
    }
  ]
}));

server.setRequestHandler({ method: "tools/call" }, async (req) => {
  const { name, arguments: args } = req.params;
  
  if (name === "discover_app") {
    const url = args.url || "http://localhost:3000";
    try {
      const out = execSync(`node discover.mjs ${url}`, { encoding: "utf-8" });
      return { content: [{ type: "text", text: out.slice(0, 8000) }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Discovery failed: ${e.message}` }], isError: true };
    }
  }
  
  if (name === "run_autonomous_tests") {
    try {
      const out = execSync(`npx playwright test --reporter=list`, { encoding: "utf-8", timeout: 60000 });
      return { content: [{ type: "text", text: out.slice(0, 10000) }] };
    } catch (e) {
      return { content: [{ type: "text", text: e.stdout?.toString() || e.message }] };
    }
  }

  if (name === "get_error_knowledge") {
    const docs = fs.existsSync("docs/ERRORS.md") ? fs.readFileSync("docs/ERRORS.md", "utf-8") : "No ERRORS.md";
    return { content: [{ type: "text", text: docs.slice(0, 8000) }] };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Playwright Autonomous MCP Server running");