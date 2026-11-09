import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import type { RemotionStudioConfig } from './types.js'

export const DEFAULT_OUTPUT_DIR = './videos'
export const DEFAULT_THEME = 'plugin-promo'
export const DEFAULT_DURATION_SECONDS = 24
export const DEFAULT_FPS = 30
export const VIDEO_WIDTH = 1920
export const VIDEO_HEIGHT = 1080
export const PROMO_WIDTH = 1080
export const PROMO_HEIGHT = 1440

export function resolveConfig(config: RemotionStudioConfig = {}): Required<RemotionStudioConfig> {
  return {
    outputDir: config.outputDir ?? DEFAULT_OUTPUT_DIR,
    defaultTheme: config.defaultTheme ?? DEFAULT_THEME,
    defaultDurationSeconds: config.defaultDurationSeconds ?? DEFAULT_DURATION_SECONDS,
  }
}

export function resolveOutputDir(
  config: Required<RemotionStudioConfig>,
  outputDir: string | undefined,
  cwd: string,
): string {
  const dir = resolve(cwd, outputDir ?? config.outputDir)
  mkdirSync(dir, { recursive: true })
  return dir
}

export function clampInt(value: number, fallback: number, min: number, max: number): number {
  if (typeof value !== 'number' || Number.isNaN(value)) return fallback
  return Math.max(min, Math.min(max, Math.round(value)))
}

export function slugify(name: string): string {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
