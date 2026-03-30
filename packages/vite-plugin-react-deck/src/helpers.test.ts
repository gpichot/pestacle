import { describe, expect, it } from "vitest";

import { createAppDeckFile } from "./helpers";

describe("createAppDeckFile", () => {
  const baseArgs = {
    slidePath: "./src/deck1/deck.mdx",
    theme: "green" as const,
    config: { layoutsFile: undefined },
  };

  it("should use the config theme by default", () => {
    const result = createAppDeckFile(baseArgs);
    expect(result).toContain('"base":"#FFFFFF"');
    expect(result).toContain('"accent":"#F49676"');
  });

  it("should override with a built-in theme from deckTheme", () => {
    const result = createAppDeckFile({
      ...baseArgs,
      deckTheme: "purple",
    });
    expect(result).toContain('"accent":"#F530EC"');
    expect(result).not.toContain('"accent":"#F49676"');
  });

  it("should generate an import for a custom theme path", () => {
    const result = createAppDeckFile({
      ...baseArgs,
      deckTheme: "./pestacle/themes/my-theme",
    });
    expect(result).toContain(
      'import { themeTokens as _customThemeTokens } from "./pestacle/themes/my-theme"',
    );
    expect(result).toContain(
      "const theme = { themeTokens: _customThemeTokens }",
    );
  });

  it("should throw for an unknown theme name", () => {
    expect(() =>
      createAppDeckFile({
        ...baseArgs,
        deckTheme: "nonexistent",
      }),
    ).toThrow(/Theme "nonexistent" not found/);
  });
});
