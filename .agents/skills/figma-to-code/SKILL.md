---
name: figma-to-code
description: Use the figwright MCP to read Figma designs and build UI from them. Use whenever the user mentions Figma, figwright, a Figma node id like 2252:3420, a figma.com URL, or "match the design".
---

# Figma to Code (Figwright)

Tools are figwright MCP tools (in Antigravity, call via `call_mcp_tool` with `ServerName: "figwright"`, `ToolName: "<toolName>"`; in Claude, `mcp__figwright__<name>`). Node ids look like `2252:3420`. A URL with `node-id=2252-3420` means id `2252:3420`.

## Steps

1. **Connect:** call `ping`. If you see `Unable to establish connection to Figma` or `plugin request timeout`, ask the user to reopen the Figwright plugin in Figma. Retry once and then stop.
2. **Find the node:**
   - The user gave an id or URL: use it.
   - The user says "selected": `get_selection` → `nodes[0].id`.
   - Otherwise: `get_pages` → `navigate_to_page {pageId}` → `get_design_context {nodeId, detail: "minimal", depth: 2}`.
   - Use `search_nodes {name, root}` only when you pass both `name` and `root`.
3. **Look:** `get_screenshot {nodeIds: ["<id>"]}`. This is only to see what you're building, never to measure.
4. **Read:** `get_design_context {nodeId: "<id>", detail: "full"}`. This is the source of truth for every size, colour, font and spacing value.
   - If it returns a `sectionPlan`, call `get_design_context` again for each `sections[].nodeId` at `detail: "full"`.
   - Build the layout from each frame's `layout` (direction, gap, padding, alignment), never from child x/y.
5. **Reuse:** before writing code, run `component_map {nodeId}`, `token_map {}` and `icon_map {nodeId}`. When one of them finds a match, use the existing component, token or icon.
6. **Assets:** use an absolute `outDir` (figwright resolves relative paths from its own folder). It names files by node id with `:` → `-`.
   - Photos: `save_image_fills {nodeIds, outDir}`
   - Composited art and logos: `save_screenshots {nodeIds, outDir, format: "PNG", scale: 2}`
   - Icons: `save_screenshots {nodeIds, outDir, format: "SVG"}`
7. **Check:** take `get_screenshot` again, compare it to your code, and re-check the values from `get_design_context`. `scan_text_nodes {root: "<id>"}` gives you every text string.

## Never
- `get_document`, `scan_nodes_by_types`, `search_nodes` without `root`, or `get_node`/`get_nodes_info` on a large frame. They return 80k to 5M characters. `get_node` is only for small leaf nodes.
- `batch` for reads. It only accepts writes, in the form `{ops: [{tool, params}]}`.
- `zoom`. It doesn't exist.
- Any `set_*` / `create_*` / `delete_*` call unless the user asks you to edit Figma.
- If a result gets saved to a file for being too large, don't read the whole file. Grep it for the ids you need.

## Common errors
| Error | Fix |
|---|---|
| `nodeIds: expected array` | `get_screenshot {nodeIds: ["id"]}` |
| `at least one of name or type is required` | pass `name` or `type` to `search_nodes` |
| `became FOLLOWER` | fine: another session owns the plugin and your calls go through it |
