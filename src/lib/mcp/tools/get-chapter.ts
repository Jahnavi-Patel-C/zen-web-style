import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { chapters } from "./_content";

export default defineTool({
  name: "get_chapter",
  title: "Get chapter",
  description:
    "Fetch the full text of a single chapter from the 'Japanese Web Design — A Comparative Inquiry' research publication by its id (e.g. 'introduction', 'methodology').",
  inputSchema: {
    id: z
      .string()
      .min(1)
      .describe("Chapter id, such as 'introduction' or 'literature-review'. Use list_chapters to discover ids."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const chapter = chapters.find((c) => c.id === id);
    if (!chapter) {
      const known = chapters.map((c) => c.id).join(", ");
      return {
        content: [{ type: "text", text: `Unknown chapter id: ${id}. Known ids: ${known}` }],
        isError: true,
      };
    }
    const text = `${chapter.number} — ${chapter.title}\n\n${chapter.summary}\n\n${chapter.body}`;
    return {
      content: [{ type: "text", text }],
      structuredContent: {
        id: chapter.id,
        number: chapter.number,
        title: chapter.title,
        summary: chapter.summary,
        body: chapter.body,
      },
    };
  },
});