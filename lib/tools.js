import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { DEFAULT_DURATION_SECONDS, clampInt, resolveConfig, resolveOutputDir, } from './config.js';
import { renderCase } from './engine.js';
import { planCase } from './planner.js';
import { scanPluginRepo } from './scanner.js';
const THEMES = ['plugin-promo', 'explainer', 'minimal'];
function text(value) {
    return { type: 'text', text: value };
}
export function buildTools(config) {
    return [
        {
            name: 'remotion_themes',
            description: 'List the built-in Remotion video themes/templates.',
            parameters: {
                type: 'object',
                properties: {},
            },
            output: {
                schema: {
                    type: 'object',
                    properties: {
                        themes: { type: 'array', items: { type: 'string' } },
                    },
                },
                render: (_args, value) => [text(value.themes.join(', '))],
            },
            execute: async () => {
                return { themes: THEMES };
            },
        },
        {
            name: 'remotion_scan',
            description: 'Read a local plugin repository (package.json + README) and return the facts needed for a promo video: name, version, description, install command and available screenshots.',
            parameters: {
                type: 'object',
                properties: {
                    target: {
                        type: 'string',
                        description: 'Local path to the plugin repository or installed package.',
                    },
                },
                required: ['target'],
            },
            output: {
                schema: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        version: { type: 'string' },
                        description: { type: 'string' },
                        installCommand: { type: 'string' },
                        repoUrl: { type: 'string' },
                        hasReadme: { type: 'boolean' },
                        screenshots: { type: 'array', items: { type: 'string' } },
                    },
                },
                render: (_args, value) => [
                    text(`${value.name}@${value.version}`),
                    text(value.description || ''),
                    text(`Install: ${value.installCommand}`),
                    text(`README: ${value.hasReadme ? 'yes' : 'no'} · Screenshots: ${value.screenshots.length}`),
                ],
            },
            execute: async (args) => {
                return scanPluginRepo(args.target);
            },
        },
        {
            name: 'remotion_plan',
            description: 'Turn a product brief into a deterministic storyboard and write a Remotion case JSON to the output directory.',
            parameters: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'Plugin display name.' },
                    brief: { type: 'string', description: 'What the plugin does, ideally one sentence.' },
                    proof: {
                        type: 'string',
                        description: 'One proof point, e.g. weekly downloads or stars.',
                    },
                    scanTarget: {
                        type: 'string',
                        description: 'Optional local plugin repo path to pre-fill facts and screenshots.',
                    },
                    theme: { type: 'string', enum: THEMES, description: 'Video theme id.' },
                    durationSeconds: { type: 'number', description: 'Video length in seconds.' },
                    outputDir: { type: 'string', description: 'Optional output directory for the case JSON.' },
                },
                required: ['name', 'brief'],
            },
            output: {
                schema: {
                    type: 'object',
                    properties: {
                        caseFile: { type: 'string' },
                        storyboard: { type: 'object' },
                    },
                },
                render: (_args, value) => [
                    text(`Case file: ${value.caseFile}`),
                    text(`Duration: ${value.storyboard.durationFrames} frames`),
                    text('Scenes: ' +
                        value.storyboard.scenes
                            .map((s) => `${s.label}(${s.from}-${s.from + s.duration})`)
                            .join(' · ')),
                ],
            },
            execute: async (args, exec) => {
                const cwd = exec?.session?.workspacePath ?? process.cwd();
                const outputDir = resolveOutputDir(config, args.outputDir, cwd);
                const scan = args.scanTarget ? await scanPluginRepo(args.scanTarget) : null;
                return planCase(args.name, args.brief, args.proof || '', scan, outputDir, args.theme ?? config.defaultTheme, clampInt(args.durationSeconds ?? config.defaultDurationSeconds, DEFAULT_DURATION_SECONDS, 5, 120));
            },
        },
        {
            name: 'remotion_render',
            description: 'Render a Remotion video from a case JSON: a 16:9 promo video, a 3:4 promo image, or both.',
            parameters: {
                type: 'object',
                properties: {
                    caseFile: { type: 'string', description: 'Path to a Remotion case JSON.' },
                    mode: {
                        type: 'string',
                        enum: ['video', 'image', 'both'],
                        description: 'video: MP4 + poster; image: promo card PNG; both: all.',
                    },
                    posterFrame: { type: 'string', description: 'Optional frame for the video poster.' },
                    chromePath: { type: 'string', description: 'Optional path to Chrome/Chromium executable.' },
                },
                required: ['caseFile'],
            },
            output: {
                schema: {
                    type: 'object',
                    properties: {
                        video: { type: 'string' },
                        poster: { type: 'string' },
                        image: { type: 'string' },
                    },
                },
                render: (_args, value) => {
                    const lines = [];
                    if (value.video)
                        lines.push(`Video: ${value.video}`);
                    if (value.poster)
                        lines.push(`Poster: ${value.poster}`);
                    if (value.image)
                        lines.push(`Promo image: ${value.image}`);
                    return lines.map(text);
                },
            },
            execute: async (args) => {
                const casePath = resolve(args.caseFile);
                if (!existsSync(casePath)) {
                    throw new Error(`dsh-remotion-studio: case file not found: ${casePath}`);
                }
                return renderCase(casePath, args.mode || 'both', args.posterFrame, args.chromePath);
            },
        },
        {
            name: 'remotion_edit',
            description: 'Edit an existing Remotion case JSON and write the updated file back.',
            parameters: {
                type: 'object',
                properties: {
                    caseFile: { type: 'string', description: 'Path to the case JSON to edit.' },
                    updates: {
                        type: 'object',
                        description: 'Partial RemotionCase fields to merge into the existing case.',
                    },
                },
                required: ['caseFile', 'updates'],
            },
            output: {
                schema: {
                    type: 'object',
                    properties: {
                        caseFile: { type: 'string' },
                    },
                },
                render: (_args, value) => [text(`Updated case file: ${value.caseFile}`)],
            },
            execute: async (args) => {
                const casePath = resolve(args.caseFile);
                const existing = JSON.parse(readFileSync(casePath, 'utf8'));
                const updated = {
                    ...existing,
                    ...args.updates,
                    plugin: { ...existing.plugin, ...args.updates.plugin },
                    promo: { ...existing.promo, ...args.updates.promo },
                };
                writeFileSync(casePath, JSON.stringify(updated, null, 2) + '\n', 'utf8');
                return { caseFile: casePath, case: updated };
            },
        },
    ];
}
export { resolveConfig };
//# sourceMappingURL=tools.js.map