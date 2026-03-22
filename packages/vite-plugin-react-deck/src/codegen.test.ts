import { compile } from "@mdx-js/mdx";
import { describe, expect, it } from "vitest";

import { extractMainCodeAsChildren } from "./codegen";

describe("extractMainCodeAsChildren", () => {
  it("should extract the main code from a function in build mode with one child", async () => {
    const input = await compile(`# Head 1`, { jsx: false });

    expect(
      extractMainCodeAsChildren(input.value.toString(), {
        isJsx: false,
      }),
    ).toMatchInlineSnapshot(`
        "const _components = {
            h1: "h1",
            ...props.components
          };
          const _content =    _jsx(_components.h1, {
            children: "Head 1"
          });;
          const {wrapper: MDXLayout} = _components;
           return MDXLayout ? _jsx(MDXLayout, {
            ...props,
            children: _content
          }) : _content;"
      `);
  });

  it("should extract the main code from a function in build mode with multiple children", async () => {
    const input = await compile(
      `# Head 1

content
`,
      {
        outputFormat: "program",
        jsx: false,
      },
    );

    expect(
      extractMainCodeAsChildren(input.value.toString(), {
        isJsx: false,
      }),
    ).toMatchInlineSnapshot(`
        "const _components = {
            h1: "h1",
            p: "p",
            ...props.components
          };
          const _content =   [_jsx(_components.h1, {
              children: "Head 1"
            }), "\\n", _jsx(_components.p, {
              children: "content"
            })] ;
          const {wrapper: MDXLayout} = _components;
           return MDXLayout ? _jsx(MDXLayout, {
            ...props,
            children: _content
          }) : _content;"
      `);
  });

  it("should extract the main code from a function in dev mode with one child", async () => {
    const input = await compile(`# Head 1`, { jsx: true });

    expect(
      extractMainCodeAsChildren(input.value.toString(), { isJsx: true }),
    ).toMatchInlineSnapshot(`
        "const _components = {
            h1: "h1",
            ...props.components
          };
          const {wrapper: MDXLayout} = _components;
          return <MDXLayout {...props}>   <_components.h1>{"Head 1"}</_components.h1></MDXLayout>;"
      `);
  });

  it("should extract the main code from a function in dev mode with multiple children", async () => {
    const input = await compile(
      `# Head 1

content
`,
      { jsx: true },
    );

    expect(
      extractMainCodeAsChildren(input.value.toString(), {
        isJsx: true,
      }),
    ).toMatchInlineSnapshot(`
        "const _components = {
            h1: "h1",
            p: "p",
            ...props.components
          };
          const {wrapper: MDXLayout} = _components;
          return <MDXLayout {...props}> <_components.h1>{"Head 1"}</_components.h1>{"\\n"}<_components.p>{"content"}</_components.p> </MDXLayout>;"
      `);
  });

  it("should preserve the last line of fenced code blocks", async () => {
    const input = await compile(
      `
\`\`\`ts
const isVisible = el.style.display !== "none";
const width = el.offsetWidth;
el.style.width = width + 10 + "px";
items.forEach((item) => {
  const h = item.offsetHeight;
  item.style.height = h + 5 + "px";
});
\`\`\`
`,
      {
        outputFormat: "program",
        jsx: false,
      },
    );

    const result = extractMainCodeAsChildren(input.value.toString(), {
      isJsx: false,
    });

    // The last line of the code block (});) must be preserved
    expect(result).toContain('});\\n"');
  });
});
