# Plugin submission checklist

## Repository

- Name: `dsh-remotion-studio`
- Owner: `iamsuosi`
- URL: `https://github.com/iamsuosi/dsh-remotion-studio`

## Before submitting

1. Create the public GitHub repository and push this code.
2. Add the `dsh-plugin` topic under repo Settings → Topics.
3. Wait at least 1 day after repo creation before opening PRs.
4. Optionally publish to npm for faster installs.

## Submission A: awesome-dsh-plugin/awesome-dsh-plugin

File to add: `data/plugins/iamsuosi__dsh-remotion-studio.yml`

```yaml
url: https://github.com/iamsuosi/dsh-remotion-studio
name: iamsuosi/dsh-remotion-studio
category: vision
description:
  en: 'Agent-first Remotion video studio: plan, render and edit 16:9 promo videos, video posters and 3:4 promo images from a structured case JSON. Rendering needs Node.js 22+ and Chrome.'
  zh: 'Agent-first Remotion 视频工作室：通过结构化 case JSON 规划、渲染和编辑 16:9 宣传片、视频封面与 3:4 宣传图。渲染需要 Node.js 22+ 与 Chrome。'
```

## Submission B: cccakeee/awesome-dsh-plugins

Add one line under `## 设计、媒体与视觉` (or the English equivalent):

```markdown
- [dsh-remotion-studio](https://github.com/iamsuosi/dsh-remotion-studio) — Agent-first Remotion video studio: plan, render and edit 16:9 promo videos, video posters and 3:4 promo images from a structured case JSON. Rendering needs Node.js 22+ and Chrome.
```

## Install command

```bash
dsh plugin --profile web add github:iamsuosi/dsh-remotion-studio
```

After npm publish:

```bash
dsh plugin --profile web add @iamsuosi/dsh-remotion-studio
```
