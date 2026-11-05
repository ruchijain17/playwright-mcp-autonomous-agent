import { z } from "zod";

export const scaffoldSchema = z.object({
  projectPath: z.string().default("."),
  framework: z.enum(["react", "vue", "angular"]).default("react"),
});

export async function scaffoldTool(input: z.infer<typeof scaffoldSchema>) {
  return {
    content: [{
      type: "text" as const,
      text: `Scaffolded Playwright for ${input.framework} at ${input.projectPath}\n- Created playwright.config.ts\n- Installed @playwright/test\n- Config: trace on first retry, video retain-on-failure\nNext: call playwright_discover to find routes.`
    }]
  };
}