import { describe, expect, it } from "vitest";

import { createDefaultConfig, defineConfig } from "./config";

describe("createDefaultConfig", () => {
  it("should return default config with green theme", () => {
    const config = createDefaultConfig();
    expect(config).toEqual({ theme: "green" });
  });
});

describe("defineConfig", () => {
  it("should pass through the config object", () => {
    const config = defineConfig({ theme: "purple" });
    expect(config).toEqual({ theme: "purple" });
  });
});
