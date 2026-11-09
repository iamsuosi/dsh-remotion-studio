export const VIDEO_FPS = 30
export const VIDEO_DURATION_IN_FRAMES = 720 // 24 seconds
export const VIDEO_WIDTH = 1920
export const VIDEO_HEIGHT = 1080
export const PROMO_WIDTH = 1080
export const PROMO_HEIGHT = 1440

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

export const defaultCase: RemotionCase = {
  plugin: {
    name: 'dsh-remotion-studio',
    description: 'Agent-first Remotion video studio for DeepSeek Harness.',
    repo: 'https://github.com/iamsuosi/dsh-remotion-studio',
    installCommand: 'dsh plugin add @iamsuosi/dsh-remotion-studio',
  },
  features: [
    { title: 'Scan', description: 'Collect plugin facts and screenshots automatically.' },
    { title: 'Plan', description: 'Turn a brief into a structured video case.' },
    { title: 'Render', description: 'Generate MP4, poster and promo images locally.' },
  ],
  promo: {
    problem: 'Making promo videos for DSH plugins is tedious.',
    solution: 'dsh-remotion-studio — let your agent render it.',
    steps: ['Install the plugin', 'Call remotion_plan', 'Call remotion_render'],
    address: 'https://github.com/iamsuosi/dsh-remotion-studio',
  },
  theme: 'plugin-promo',
  durationSeconds: 24,
}
