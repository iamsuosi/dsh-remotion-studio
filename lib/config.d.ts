import type { RemotionStudioConfig } from './types.js';
export declare const DEFAULT_OUTPUT_DIR = "./videos";
export declare const DEFAULT_THEME = "plugin-promo";
export declare const DEFAULT_DURATION_SECONDS = 24;
export declare const DEFAULT_FPS = 30;
export declare const VIDEO_WIDTH = 1920;
export declare const VIDEO_HEIGHT = 1080;
export declare const PROMO_WIDTH = 1080;
export declare const PROMO_HEIGHT = 1440;
export declare function resolveConfig(config?: RemotionStudioConfig): Required<RemotionStudioConfig>;
export declare function resolveOutputDir(config: Required<RemotionStudioConfig>, outputDir: string | undefined, cwd: string): string;
export declare function clampInt(value: number, fallback: number, min: number, max: number): number;
export declare function slugify(name: string): string;
//# sourceMappingURL=config.d.ts.map