import { spawn } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { RenderResult } from './types.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const renderScript = join(root, 'scripts', 'remotion.mjs')

export async function renderCase(
  caseFile: string,
  mode: 'video' | 'image' | 'both',
  posterFrame?: string,
  chromePath?: string,
): Promise<RenderResult> {
  const casePath = resolve(caseFile)
  const args = [renderScript, '--case', casePath, '--mode', mode]
  if (posterFrame) args.push('--poster-frame', posterFrame)
  if (chromePath) args.push('--chrome-path', chromePath)

  return new Promise((resolvePromise, reject) => {
    const cp = spawn(process.execPath, args, {
      cwd: root,
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    let stdout = ''
    let stderr = ''
    cp.stdout?.on('data', (chunk) => {
      stdout += chunk.toString()
      process.stdout.write(chunk)
    })
    cp.stderr?.on('data', (chunk) => {
      stderr += chunk.toString()
      process.stderr.write(chunk)
    })

    cp.on('error', reject)
    cp.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`dsh-remotion-studio: render failed with code ${code}. ${stderr}`))
        return
      }
      resolvePromise(parseRenderOutput(stdout))
    })
  })
}

function parseRenderOutput(stdout: string): RenderResult {
  const pick = (tag: string) => {
    const line = stdout.split('\n').find((l) => l.includes(`[remotion] ${tag}`))
    return line ? line.split('->').pop()?.trim() : undefined
  }
  return {
    video: pick('video'),
    poster: pick('poster'),
    image: pick('image'),
  }
}
