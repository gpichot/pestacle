import _ from "lodash";
import { type PestacleConfig, PestacleConfigSchema } from "./types";

/**
 * Allow to type the config object (similar to Vite's defineConfig)
 */
export function defineConfig(config: PestacleConfig): PestacleConfig {
  return config;
}

/**
 * Create a default config object
 */
export function createDefaultConfig(): PestacleConfig {
  return {
    theme: "green",
  };
}

/**
 * Load the config file from the project root
 */
export async function loadConfigFile(): Promise<PestacleConfig> {
  const candidates = [
    "pestacle.config.ts",
    "pestacle.config.js",
    "pestacle.config.mjs",
  ];

  const defaultConfig = createDefaultConfig();

  for (const candidate of candidates) {
    try {
      const mod = await import(`${process.cwd()}/${candidate}`);

      const config = PestacleConfigSchema.safeParse(mod.default);

      if (!config.success) {
        const issues = config.error.issues
          .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
          .join("\n");
        throw new Error(`Invalid config in ${candidate}:\n${issues}`);
      }

      return _.merge(defaultConfig, mod.default as PestacleConfig);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.startsWith("Invalid config")
      ) {
        throw error;
      }
    }
  }

  return defaultConfig;
}
