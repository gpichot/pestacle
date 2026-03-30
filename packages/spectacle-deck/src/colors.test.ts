import { describe, expect, it } from "vitest";

import { createCssVariables, extractColors } from "./colors";

describe("extractColors", () => {
  it("should parse rgb colors", () => {
    expect(extractColors("rgb(43,19,90)")).toEqual({ r: 43, g: 19, b: 90 });
  });

  it("should parse rgb colors with spaces", () => {
    expect(extractColors("rgb(43, 19, 90)")).toEqual({ r: 43, g: 19, b: 90 });
  });

  it("should parse rgba colors", () => {
    expect(extractColors("rgba(43, 19, 90, 0.5)")).toEqual({
      r: 43,
      g: 19,
      b: 90,
    });
  });

  it("should parse hex colors", () => {
    expect(extractColors("#2b135a")).toEqual({ r: 43, g: 19, b: 90 });
  });

  it("should return null for unsupported formats", () => {
    expect(extractColors("hsl(200, 50%, 50%)")).toBeNull();
  });
});

describe("createCssVariables", () => {
  it("should create --text-*, --bg-*, and --border variables", () => {
    const result = createCssVariables({
      text: { base: "rgb(43,19,90)", muted: "#999", accent: "#56d4f8" },
      bg: { base: "#111113", surface: "#1C1C1F", elevated: "#252529" },
      border: "rgba(255,255,255,0.12)",
    });

    // Text variables
    expect(result).toContain("--text-base: rgb(43,19,90);");
    expect(result).toContain("--text-muted: #999;");
    expect(result).toContain("--text-accent: #56d4f8;");
    expect(result).toContain("--text-base-rgb: 43, 19, 90;");
    expect(result).toContain("--text-accent-rgb: 86, 212, 248;");

    // Background variables
    expect(result).toContain("--bg-base: #111113;");
    expect(result).toContain("--bg-surface: #1C1C1F;");
    expect(result).toContain("--bg-elevated: #252529;");
    expect(result).toContain("--bg-base-rgb: 17, 17, 19;");

    // Border variable
    expect(result).toContain("--border: rgba(255,255,255,0.12);");
    expect(result).toContain("--border-rgb: 255, 255, 255;");
  });

  it("should handle unsupported color formats gracefully", () => {
    const result = createCssVariables({
      text: {
        base: "hsl(200, 50%, 50%)",
        muted: "#666",
        accent: "#0077b6",
      },
      bg: { base: "#f5f5f7", surface: "#eaeaee", elevated: "#e0e0e5" },
      border: "rgba(0,0,0,0.1)",
    });

    expect(result).toContain("--text-base: hsl(200, 50%, 50%);");
    expect(result).not.toContain("--text-base-rgb");
  });
});
