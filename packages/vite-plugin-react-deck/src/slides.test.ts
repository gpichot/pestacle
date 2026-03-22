import { describe, expect, it } from "vitest";
import { extractInlineModules } from "./slides";

describe("extractInlineModules", () => {
  it("should extract import statements", () => {
    const source = `import Foo from './Foo'\n\n# Hello`;
    const result = extractInlineModules(source);

    expect(result.inlineModules.has("import Foo from './Foo'")).toBe(true);
    expect(result.content).not.toContain("import Foo from './Foo'");
    expect(result.content).toContain("# Hello");
  });

  it("should extract export statements", () => {
    const source = `export const x = 1\n\n# Hello`;
    const result = extractInlineModules(source);

    expect(result.inlineModules.has("export const x = 1")).toBe(true);
    expect(result.content).toContain("# Hello");
  });

  it("should not extract import/export inside backticks", () => {
    const source = "`import foo from 'bar'`\n\n# Hello";
    const result = extractInlineModules(source);

    expect(result.inlineModules.size).toBe(0);
    expect(result.content).toContain("`import foo from 'bar'`");
  });

  it("should accumulate into existing inlineModules set", () => {
    const existing = new Set(["import A from 'a'"]);
    const source = `import B from 'b'\n\n# Hello`;
    const result = extractInlineModules(source, {
      inlineModules: existing,
    });

    expect(result.inlineModules.has("import A from 'a'")).toBe(true);
    expect(result.inlineModules.has("import B from 'b'")).toBe(true);
  });

  it("should return empty set when no modules found", () => {
    const source = "# Just a heading\n\nSome content";
    const result = extractInlineModules(source);

    expect(result.inlineModules.size).toBe(0);
    expect(result.content).toContain("# Just a heading");
  });
});
