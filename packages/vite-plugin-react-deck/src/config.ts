import _ from "lodash";
import { PestacleConfig, PestacleConfigSchema } from "./types";

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
      console.log(
        `Trying to load config from ${candidate}: ${process.cwd()}/${candidate}`,
      );
      const mod = await import(`${process.cwd()}/${candidate}`);

      const config = PestacleConfigSchema.safeParse(mod.default);

      if (!config.success) {
        console.error(`Failed to load config from ${candidate}`);
        console.error(config.error);
        process.exit(1);
      }

      console.log(`Loaded config from ${candidate}`);

      return _.merge(defaultConfig, mod.default as PestacleConfig);
    } catch (error) {
      console.error(`Failed to load config from ${candidate}`);
      console.error(error);
      continue;
    }
  }

  return defaultConfig;
}
