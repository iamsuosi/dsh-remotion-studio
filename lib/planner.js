import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { DEFAULT_FPS, DEFAULT_DURATION_SECONDS, slugify } from './config.js';
export function planCase(name, brief, proof, scan, outputDir, theme, durationSeconds) {
    const slug = slugify(name);
    const totalFrames = Math.round((durationSeconds || DEFAULT_DURATION_SECONDS) * DEFAULT_FPS);
    const plugin = scan
        ? {
            name: scan.name,
            version: scan.version,
            description: scan.description || brief,
            repo: scan.repoUrl,
            installCommand: scan.installCommand,
        }
        : {
            name,
            description: brief,
        };
    const features = scan?.screenshots.length
        ? scan.screenshots.slice(0, 4).map((img, i) => ({
            title: `Feature ${i + 1}`,
            description: 'See it in action.',
            img,
        }))
        : [
            { title: 'Easy to install', description: 'One command and it just works.' },
            { title: 'Built for DSH', description: 'Native DeepSeek Harness integration.' },
            { title: 'Agent friendly', description: 'Designed to be driven by your agent.' },
        ];
    const caseData = {
        plugin,
        features,
        promo: {
            problem: brief || 'Building great DSH plugin demos takes too long.',
            solution: `${name} — ${brief || 'a better way to work in DeepSeek Harness.'}`,
            steps: ['Install the plugin', 'Open the studio', 'Render your story'],
            address: scan?.repoUrl || '',
        },
        theme,
        durationSeconds,
    };
    const storyboard = {
        durationFrames: totalFrames,
        scenes: [
            { from: 0, duration: Math.round(totalFrames * 0.12), label: 'hook', text: '你的 DSH 工作流，还能更高效吗？' },
            { from: Math.round(totalFrames * 0.12), duration: Math.round(totalFrames * 0.15), label: 'problem', text: brief || '手动做视频，太麻烦了。' },
            { from: Math.round(totalFrames * 0.27), duration: Math.round(totalFrames * 0.18), label: 'solution', text: caseData.promo.solution },
            { from: Math.round(totalFrames * 0.45), duration: Math.round(totalFrames * 0.25), label: 'features' },
            { from: Math.round(totalFrames * 0.70), duration: Math.round(totalFrames * 0.15), label: 'howto', text: 'Install → Plan → Render' },
            { from: Math.round(totalFrames * 0.85), duration: Math.round(totalFrames * 0.15), label: 'proof', text: proof || '' },
        ],
    };
    const caseFile = join(outputDir, `case-${slug}.json`);
    writeFileSync(caseFile, JSON.stringify(caseData, null, 2) + '\n', 'utf8');
    return { caseFile, case: caseData, storyboard };
}
//# sourceMappingURL=planner.js.map