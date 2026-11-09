import { resolveConfig, buildTools } from './tools.js';
export const name = 'dsh-remotion-studio';
export const inject = ['tools'];
export function apply(ctx, config = {}) {
    const resolved = resolveConfig(config);
    const disposers = [];
    for (const definition of buildTools(resolved)) {
        disposers.push(ctx.tools.register(definition));
    }
    ctx.logger?.info?.('[dsh-remotion-studio] loaded');
    if (typeof ctx.on === 'function') {
        ctx.on('dispose', () => {
            for (const dispose of disposers)
                dispose();
        });
    }
}
export { resolveConfig, buildTools } from './tools.js';
export { renderCase } from './engine.js';
export { scanPluginRepo } from './scanner.js';
export { planCase } from './planner.js';
//# sourceMappingURL=index.js.map