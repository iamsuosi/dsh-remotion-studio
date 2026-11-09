import { resolveConfig, buildTools } from './tools.js'
import type { RemotionStudioConfig, ToolDefinition } from './types.js'

export const name = 'dsh-remotion-studio'
export const inject = ['tools']
export type Config = RemotionStudioConfig

export interface PluginContext {
  tools: { register(definition: ToolDefinition): () => void }
  logger?: { info?(message: string): void; warn?(message: string): void }
  on?(event: string, listener: () => void): () => void
}

export function apply(ctx: PluginContext, config: Config = {}): void {
  const resolved = resolveConfig(config)
  const disposers: Array<() => void> = []

  for (const definition of buildTools(resolved)) {
    disposers.push(ctx.tools.register(definition))
  }

  ctx.logger?.info?.('[dsh-remotion-studio] loaded')

  if (typeof ctx.on === 'function') {
    ctx.on('dispose', () => {
      for (const dispose of disposers) dispose()
    })
  }
}

export { resolveConfig, buildTools } from './tools.js'
export { renderCase } from './engine.js'
export { scanPluginRepo } from './scanner.js'
export { planCase } from './planner.js'
export type {
  RemotionStudioConfig,
  RemotionCase,
  PluginInfo,
  FeatureCard,
  PromoCopy,
  ScanResult,
  PlanResult,
  Storyboard,
  Scene,
  RenderResult,
  ToolDefinition,
} from './types.js'
