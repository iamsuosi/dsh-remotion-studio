# dsh-remotion-studio

Agent-first Remotion video studio for DeepSeek Harness. Plan, render and edit promo videos from a structured case JSON.

## What it does

- `remotion_themes` — list the built-in video themes/templates.
- `remotion_scan` — scan a plugin repo and return facts + screenshots for a video.
- `remotion_plan` — turn a name, brief and optional proof point into a storyboard + `case-<slug>.json`.
- `remotion_render` — render a 16:9 video, a video poster and/or a 3:4 promo image from a case JSON.
- `remotion_edit` — merge partial updates into an existing case JSON.
- Ships a `dsh-remotion-studio` skill that teaches the agent an iterative workflow.
- Adds a **Remotion Studio** sidebar panel in the DSH web UI with theme examples and quick-start hints.

## Install

From npm (recommended):

```bash
dsh plugin --profile web add @iamsuosi/dsh-remotion-studio
```

From GitHub source:

```bash
dsh plugin --profile web add github:iamsuosi/dsh-remotion-studio
```

Restart DSH after install.

## Requirements

- Node.js 22 or later
- A Chrome / Chromium executable for Remotion rendering
- The plugin ships Remotion 4 and its renderer dependencies

## Quick start

1. List themes:
   ```
   remotion_themes
   ```

2. Plan a video:
   ```
   remotion_plan {
     name: "My Plugin",
     brief: "A sidebar upgrade for DeepSeek Harness.",
     proof: "500+ downloads in the first week."
   }
   ```

3. Render it:
   ```
   remotion_render {
     caseFile: "<the-path-returned-by-remotion_plan>",
     mode: "both"
   }
   ```

4. The tool returns paths to the generated MP4, poster PNG and 3:4 promo PNG.

## Configuration

Optional plugin config in your profile:

```yaml
- id: dsh-remotion-studio
  config:
    outputDir: ./videos        # default output directory
    defaultTheme: plugin-promo # default theme id
    defaultDurationSeconds: 24 # default video length
```

## Themes

| ID | Purpose |
|----|---------|
| `plugin-promo` | Plugin launch / product promo |
| `explainer` | Narrative explainer (same renderer, different future templates) |
| `minimal` | Clean, text-only fallback |

## Case JSON shape

See [`cases/example.json`](cases/example.json).

## License

Apache-2.0. Community plugin, not affiliated with DeepSeek.
