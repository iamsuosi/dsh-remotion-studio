import assert from 'node:assert/strict'
import { mkdirSync, rmSync, rmdirSync } from 'node:fs'
import { test } from 'node:test'
import { buildTools, resolveConfig } from '../lib/tools.js'

const tmp = new URL('./.tmp/', import.meta.url)

function clean() {
  try {
    rmSync(tmp, { recursive: true, force: true })
  } catch {}
}

test('remotion_themes lists built-in themes', async () => {
  const tools = buildTools(resolveConfig())
  const t = tools.find((x) => x.name === 'remotion_themes')
  const result = await t.execute()
  assert.deepEqual(result, { themes: ['plugin-promo', 'explainer', 'minimal'] })
})

test('remotion_scan reads current repo', async () => {
  const tools = buildTools(resolveConfig())
  const t = tools.find((x) => x.name === 'remotion_scan')
  const result = await t.execute({ target: '.' })
  assert.equal(result.name, '@iamsuosi/dsh-remotion-studio')
  assert.equal(result.hasReadme, true)
  assert.ok(Array.isArray(result.screenshots))
})

test('remotion_plan writes a case JSON', async () => {
  clean()
  mkdirSync(tmp, { recursive: true })
  const tools = buildTools(resolveConfig({ outputDir: tmp.pathname.slice(1) }))
  const t = tools.find((x) => x.name === 'remotion_plan')
  const result = await t.execute(
    { name: 'Smoke Plugin', brief: 'A test plugin.', proof: '10 stars' },
    { session: { workspacePath: process.cwd() } },
  )
  assert.ok(result.caseFile.includes('case-smoke-plugin.json'))
  assert.ok(result.storyboard.durationFrames > 0)
  clean()
})
