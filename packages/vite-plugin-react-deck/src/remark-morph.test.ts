import { describe, expect, it } from "vitest";

import { transformSlidesMdxToReact } from "./slides";

describe("remarkMorph", () => {
  async function compileSlide(mdx: string) {
    const source = `---\ntitle: Test\n---\n\n${mdx}`;
    const { code } = await transformSlidesMdxToReact(source, {
      production: false,
      remarkPlugins: [],
      rehypePlugins: [],
    });
    return code;
  }

  it("should extract morph attribute from heading", async () => {
    const code = await compileSlide('# My Title {morph="hero"}');

    expect(code).toContain('morph: "hero"');
    expect(code).toContain("My Title");
    // The {morph="hero"} expression should not appear in children
    expect(code).not.toContain("morph =");
  });

  it("should extract morph attribute from h2", async () => {
    const code = await compileSlide('## Subtitle {morph="sub"}');

    expect(code).toContain('morph: "sub"');
    expect(code).toContain("Subtitle");
  });

  it("should extract morph attribute from paragraph", async () => {
    const code = await compileSlide('Some content {morph="text-block"}');

    expect(code).toContain('morph: "text-block"');
    expect(code).toContain("Some content");
  });

  it("should not modify text without morph attribute", async () => {
    const code = await compileSlide("# Normal Heading");

    expect(code).not.toContain("morph");
    expect(code).toContain("Normal Heading");
  });

  it("should handle multiple morph elements on different slides", async () => {
    const source = `---
title: Test
---

# Title {morph="hero"}

---

# Title {morph="hero"}
`;
    const { code } = await transformSlidesMdxToReact(source, {
      production: false,
      remarkPlugins: [],
      rehypePlugins: [],
    });

    const matches = code.match(/morph: "hero"/g);
    expect(matches).toHaveLength(2);
  });
});
