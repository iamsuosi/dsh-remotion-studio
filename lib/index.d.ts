import type { RemotionStudioConfig, ToolDefinition } from './types.js';
export declare const name = "dsh-remotion-studio";
export declare const inject: string[];
export type Config = RemotionStudioConfig;
export interface PluginContext {
    tools: {
        register(definition: ToolDefinition): () => void;
    };
    logger?: {
        info?(message: string): void;
        warn?(message: string): void;
    };
    on?(event: string, listener: () => void): () => void;
}
export declare function apply(ctx: PluginContext, config?: Config): void;
export { resolveConfig, buildTools } from './tools.js';
export { renderCase } from './engine.js';
export { scanPluginRepo } from './scanner.js';
export { planCase } from './planner.js';
export type { RemotionStudioConfig, RemotionCase, PluginInfo, FeatureCard, PromoCopy, ScanResult, PlanResult, Storyboard, Scene, RenderResult, ToolDefinition, } from './types.js';
//# sourceMappingURL=index.d.ts.map