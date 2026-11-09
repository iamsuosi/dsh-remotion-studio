# dsh-remotion-studio

Agent-first Remotion video studio for DeepSeek Harness.

## Goal

Turn a user's brief into a rendered promo video (MP4), video poster and 3:4 promo image through an iterative, agent-driven workflow.

## Workflow

1. **Understand** the user's goal, audience, key message and desired length.
2. **Scan** the plugin repo if one exists, using `remotion_scan`, to collect facts and screenshots.
3. **Plan** the video by calling `remotion_plan` with a name, brief and optional proof point. This writes a `case-<slug>.json` file.
4. **Review** the case JSON with the user and edit it with `remotion_edit` if needed.
5. **Render** the video/images by calling `remotion_render` with the case file path.
6. **Deliver** the output paths and ask the user for revisions.

## Tool reference

- `remotion_themes` — list built-in themes (`plugin-promo`, `explainer`, `minimal`).
- `remotion_scan` — read a local plugin repo and return name, version, description, install command and screenshots.
- `remotion_plan` — generate a storyboard and write a case JSON.
- `remotion_render` — render `video`, `image` or `both` from a case JSON.
- `remotion_edit` — merge partial updates into an existing case JSON.

## Case JSON shape

```json
{
  "plugin": {
    "name": "Plugin Name",
    "description": "One-line description.",
    "repo": "https://github.com/owner/repo",
    "installCommand": "dsh plugin add owner/repo"
  },
  "features": [
    { "title": "Feature 1", "description": "...", "img": "assets/shot1.png" }
  ],
  "promo": {
    "problem": "The pain point.",
    "solution": "Plugin Name — the solution.",
    "steps": ["Install", "Plan", "Render"],
    "address": "https://github.com/owner/repo"
  },
  "theme": "plugin-promo",
  "durationSeconds": 24
}
```

## Example

User: "Make a 24-second promo for my DSH plugin dsh-better-sidebar."

Agent:
1. Call `remotion_scan` on the plugin directory to gather facts.
2. Call `remotion_themes` to confirm available themes.
3. Call `remotion_plan` with the scanned facts, a brief and a proof point.
4. Call `remotion_render` with the returned `caseFile` and `mode: "both"`.
5. Summarize the output files and ask if the user wants edits.

## Important notes

- Rendering requires Node.js 22+, a Chrome/Chromium executable and the Remotion CLI dependencies installed with the plugin.
- Rendering can take minutes; always use the `remotion_render` tool rather than trying to run Remotion commands yourself.
- Image paths in `features[].img` are relative to the plugin repo root or the case JSON directory.
