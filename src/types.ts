export interface RemotionStudioConfig {
  outputDir?: string
  defaultTheme?: string
  defaultDurationSeconds?: number
}

export interface PluginInfo {
  name: string
  handle?: string
  version?: string
  description?: string
  repo?: string
  installCommand?: string
  downloads?: string
  stars?: string
}

export interface FeatureCard {
  title: string
  description: string
  img?: string
}

export interface PromoCopy {
  problem: string
  solution: string
  steps: string[]
  address: string
}

export interface RemotionCase {
  plugin: PluginInfo
  features: FeatureCard[]
  promo: PromoCopy
  theme?: string
  durationSeconds?: number
}

export interface ScanResult {
  name: string
  version: string
  description: string
  installCommand: string
  repoUrl: string
  hasReadme: boolean
  screenshots: string[]
}

export interface PlanResult {
  caseFile: string
  case: RemotionCase
  storyboard: Storyboard
}

export interface Storyboard {
  durationFrames: number
  scenes: Scene[]
}

export interface Scene {
  from: number
  duration: number
  label: string
  text?: string
}

export interface RenderResult {
  video?: string
  poster?: string
  image?: string
}

export interface ToolDefinition {
  name: string
  description: string
  parameters: object
  output: {
    schema: object
    render: (args: unknown, value: unknown) => Array<{ type: 'text'; text: string }>
  }
  execute: (args: any, exec?: any) => Promise<any>
}
