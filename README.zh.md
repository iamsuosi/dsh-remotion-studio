# dsh-remotion-studio

面向 DeepSeek Harness 的 Agent-first Remotion 视频工作室。通过结构化 case JSON 规划、渲染和编辑宣传片。

## 功能

- `remotion_themes` — 列出内置视频主题/模板。
- `remotion_scan` — 扫描插件仓库，返回制作视频所需的事实与截图。
- `remotion_plan` — 把名称、简介和可选数据点转成故事板 + `case-<slug>.json`。
- `remotion_render` — 根据 case JSON 渲染 16:9 视频、视频封面和/或 3:4 宣传图。
- `remotion_edit` — 合并局部更新到已有 case JSON。
- 自带 `dsh-remotion-studio` 技能，教会 agent 按「理解 → 扫描 → 规划 → 渲染 → 审片」的流程工作。
- 在 DSH Web 侧栏增加 **Remotion Studio** 面板，提供主题示例和快速开始提示。

## 安装

从 npm 安装（推荐）：

```bash
dsh plugin --profile web add @iamsuosi/dsh-remotion-studio
```

从 GitHub 源码安装：

```bash
dsh plugin --profile web add github:iamsuosi/dsh-remotion-studio
```

安装后重启 DSH。

## 安装说明

- npm 包已内置编译好的 `lib/`，安装时不需要额外构建。
- 从 GitHub 源码安装时会在安装过程中执行 `npm run build`。如果你的 DSH profile 拦截了安装脚本，请在 profile 的 `pnpm-workspace.yaml` 中放行本包：

  ```yaml
  allowBuilds:
    '@iamsuosi/dsh-remotion-studio': true
  ```

- 侧栏面板以 **Remotion Studio** 的名字出现在 DSH Web 界面中。面板只负责前端展示，工具在任何 profile 下都可用。

## 环境要求

- Node.js 22 或更高版本
- 用于 Remotion 渲染的 Chrome / Chromium 可执行文件
- 插件已自带 Remotion 4 及其渲染依赖

## 快速开始

1. 列出主题：
   ```
   remotion_themes
   ```

2. 规划视频：
   ```
   remotion_plan {
     name: "My Plugin",
     brief: "A sidebar upgrade for DeepSeek Harness.",
     proof: "首周下载量 500+。"
   }
   ```

3. 渲染：
   ```
   remotion_render {
     caseFile: "<remotion_plan 返回的路径>",
     mode: "both"
   }
   ```

4. 工具会返回生成的 MP4、封面 PNG 和 3:4 宣传图路径。

## 配置

可在 profile 中配置可选参数：

```yaml
- id: dsh-remotion-studio
  config:
    outputDir: ./videos        # 默认输出目录
    defaultTheme: plugin-promo # 默认主题
    defaultDurationSeconds: 24 # 默认视频长度（秒）
```

## 主题

| ID | 用途 |
|----|------|
| `plugin-promo` | 插件发布 / 产品宣传片 |
| `explainer` | 解释型叙事视频（同渲染器，未来拆分模板） |
| `minimal` | 极简文字 fallback |

## Case JSON 结构

参考 [`cases/example.json`](cases/example.json)。

## 协议

Apache-2.0。社区插件，与 DeepSeek 官方无关。
