import { defineTool } from "@lovable.dev/mcp-js";
import { chapters } from "./_content";

export default defineTool({
  name: "list_chapters",
  title: "List chapters",
  description:
    "List every chapter of the 'Japanese Web Design — A Comparative Inquiry' research publication with its number, id, and title.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = chapters.map((c) => ({ number: c.number, id: c.id, title: c.title }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { chapters: items },
    };
  },
});