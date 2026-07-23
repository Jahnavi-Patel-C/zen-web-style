import { defineMcp } from "@lovable.dev/mcp-js";
import listChaptersTool from "./tools/list-chapters";
import getChapterTool from "./tools/get-chapter";

export default defineMcp({
  name: "japanese-web-design-mcp",
  title: "Japanese Web Design — Research Publication",
  version: "0.1.0",
  instructions:
    "Tools for reading an undergraduate research publication comparing Japanese and Indian web design. Use `list_chapters` to see the table of contents, then `get_chapter` to fetch a chapter's full text by id.",
  tools: [listChaptersTool, getChapterTool],
});