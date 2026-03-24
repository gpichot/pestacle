import fs from "node:fs";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { extractInlineModules, resolveIncludes } from "./slides";

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

describe("resolveIncludes", () => {
  const tmpDir = path.join(__dirname, "__test_tmp__");

  beforeEach(() => {
    fs.mkdirSync(tmpDir, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  function writeFile(name: string, content: string) {
    const filePath = path.join(tmpDir, name);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
    return filePath;
  }

  it("should replace include directive with file content", () => {
    writeFile("intro.mdx", "# Intro Slide\n\nWelcome!\n");
    const mainPath = writeFile("deck.mdx", "");

    const result = resolveIncludes(
      "# Main\n\n::include{file=./intro.mdx}\n\n# End\n",
      mainPath,
    );

    expect(result.content).toContain("# Intro Slide");
    expect(result.content).toContain("Welcome!");
    expect(result.content).toContain("# Main");
    expect(result.content).toContain("# End");
    expect(result.content).not.toContain("::include");
  });

  it("should strip frontmatter from included files", () => {
    writeFile("intro.mdx", "---\nauthor: Someone\n---\n\n# Intro Slide\n");
    const mainPath = writeFile("deck.mdx", "");

    const result = resolveIncludes("::include{file=./intro.mdx}", mainPath);

    expect(result.content).toContain("# Intro Slide");
    expect(result.content).not.toContain("author:");
  });

  it("should return included file paths for HMR watching", () => {
    const introPath = writeFile("intro.mdx", "# Intro\n");
    const mainPath = writeFile("deck.mdx", "");

    const result = resolveIncludes("::include{file=./intro.mdx}", mainPath);

    expect(result.includedFiles).toContain(introPath);
  });

  it("should resolve nested includes", () => {
    writeFile("deep.mdx", "# Deep Slide\n");
    writeFile("mid.mdx", "# Mid\n\n::include{file=./deep.mdx}\n");
    const mainPath = writeFile("deck.mdx", "");

    const result = resolveIncludes("::include{file=./mid.mdx}", mainPath);

    expect(result.content).toContain("# Mid");
    expect(result.content).toContain("# Deep Slide");
    expect(result.includedFiles).toHaveLength(2);
  });

  it("should throw on circular includes", () => {
    writeFile("a.mdx", "::include{file=./b.mdx}\n");
    writeFile("b.mdx", "::include{file=./a.mdx}\n");
    const mainPath = writeFile("deck.mdx", "");

    expect(() => resolveIncludes("::include{file=./a.mdx}", mainPath)).toThrow(
      /depth limit/,
    );
  });

  it("should throw on missing included file", () => {
    const mainPath = writeFile("deck.mdx", "");

    expect(() =>
      resolveIncludes("::include{file=./nonexistent.mdx}", mainPath),
    ).toThrow(/Could not read/);
  });

  it("should handle multiple includes in one file", () => {
    writeFile("part1.mdx", "# Part 1\n");
    writeFile("part2.mdx", "# Part 2\n");
    const mainPath = writeFile("deck.mdx", "");

    const result = resolveIncludes(
      "::include{file=./part1.mdx}\n\n---\n\n::include{file=./part2.mdx}",
      mainPath,
    );

    expect(result.content).toContain("# Part 1");
    expect(result.content).toContain("# Part 2");
    expect(result.includedFiles).toHaveLength(2);
  });

  it("should pass through content without includes unchanged", () => {
    const mainPath = writeFile("deck.mdx", "");
    const content = "# Hello\n\nSome content\n";

    const result = resolveIncludes(content, mainPath);

    expect(result.content).toBe(content);
    expect(result.includedFiles).toHaveLength(0);
  });
});
