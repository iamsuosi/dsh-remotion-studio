import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type { ScanResult } from './types.js'

const README_CANDIDATES = ['README.md', 'README.zh.md', 'readme.md', 'README.en.md']
const IMAGE_RE = /\.(png|jpe?g|webp|gif)$/i

export async function scanPluginRepo(target: string): Promise<ScanResult> {
  const dir = resolve(target)
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    throw new Error(`dsh-remotion-studio: not a directory: ${dir}`)
  }

  const pkgPath = join(dir, 'package.json')
  const pkg = existsSync(pkgPath) ? JSON.parse(readFileSync(pkgPath, 'utf8')) : {}

  const readmePath = README_CANDIDATES.map((f) => join(dir, f)).find((p) => existsSync(p))

  const screenshots: string[] = []
  for (const rel of ['docs/screenshots', 'assets', 'preview', 'docs/assets']) {
    const p = join(dir, rel)
    if (!existsSync(p)) continue
    try {
      for (const f of readdirSync(p)) {
        if (IMAGE_RE.test(f)) screenshots.push(join(rel, f))
      }
    } catch {
      // ignore unreadable dirs
    }
  }

  const repoUrl = extractRepoUrl(pkg, dir)
  const installCommand = guessInstallCommand(pkg, repoUrl)

  return {
    name: String(pkg.name || 'unknown-plugin'),
    version: String(pkg.version || '0.0.0'),
    description: String(pkg.description || ''),
    installCommand,
    repoUrl,
    hasReadme: Boolean(readmePath),
    screenshots,
  }
}

function extractRepoUrl(pkg: any, _dir: string): string {
  if (pkg?.repository?.url) {
    return pkg.repository.url.replace(/^git\+/, '').replace(/\.git$/, '')
  }
  if (pkg?.homepage && pkg.homepage.includes('github.com')) {
    return pkg.homepage.replace(/#readme$/, '')
  }
  return ''
}

function guessInstallCommand(pkg: any, repoUrl: string): string {
  if (pkg?.name && !pkg.private) {
    return `dsh plugin add ${pkg.name}`
  }
  if (repoUrl) {
    const match = repoUrl.match(/github\.com\/([^/]+\/[^/]+)/)
    if (match) return `dsh plugin add github:${match[1]}`
  }
  return 'dsh plugin add <package-name>'
}
