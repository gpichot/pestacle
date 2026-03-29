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
  it("should create --color-* variables from color map", () => {
    const result = createCssVariables({
      primary: "rgb(43,19,90)",
      secondary: "#56d4f8",
    });

    expect(result).toContain("--color-primary: rgb(43,19,90);");
    expect(result).toContain("--color-secondary: #56d4f8;");
    expect(result).toContain("--color-primary-rgb: 43, 19, 90;");
    expect(result).toContain("--color-secondary-rgb: 86, 212, 248;");
  });

  it("should handle unsupported color formats gracefully", () => {
    const result = createCssVariables({
      primary: "hsl(200, 50%, 50%)",
    });

    expect(result).toContain("--color-primary: hsl(200, 50%, 50%);");
    expect(result).not.toContain("--color-primary-rgb");
  });

  it("should create --bg-* variables when backgrounds are provided", () => {
    const result = createCssVariables(
      { primary: "#ffffff" },
      { primary: "#111113", secondary: "#1C1C1F" },
    );

    expect(result).toContain("--color-primary: #ffffff;");
    expect(result).toContain("--bg-primary: #111113;");
    expect(result).toContain("--bg-secondary: #1C1C1F;");
    expect(result).toContain("--bg-primary-rgb: 17, 17, 19;");
    expect(result).toContain("--bg-secondary-rgb: 28, 28, 31;");
  });
});
