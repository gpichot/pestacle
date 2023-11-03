import { describe, it, expect } from "vitest";
import { extractMainCodeAsChildren } from "./codegen";
import { compile } from "@mdx-js/mdx";

describe("extractMainCodeAsChildren", () => {
  it("should extract the main code from a function in build mode with one child", async () => {
    const input = await compile(`# Head 1`, { jsx: false });

    expect(extractMainCodeAsChildren(input.value.toString()))
      .toMatchInlineSnapshot(`
        "const _components = {
            h1: \\"h1\\",
            ...props.components
          };
          const {wrapper: MDXLayout} = _components;
          return _jsx(MDXLayout, {...props, children: _jsx(_components.h1, {
            children: \\"Head 1\\"
          })});"
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
      }
    );

    expect(extractMainCodeAsChildren(input.value.toString()))
      .toMatchInlineSnapshot(`
      "const _components = {
          h1: \\"h1\\",
          p: \\"p\\",
          ...props.components
        };
        const {wrapper: MDXLayout} = _components;
        return _jsx(MDXLayout, {...props,
          children: [_jsx(_components.h1, {
            children: \\"Head 1\\"
          }), \\"\\\\n\\", _jsx(_components.p, {
            children: \\"content\\"
          })]
        });"
    `);
  });

  it("should extract the main code from a function in dev mode with one child", async () => {
    const input = await compile(`# Head 1`, { jsx: true });

    expect(extractMainCodeAsChildren(input.value.toString()))
      .toMatchInlineSnapshot(`
      "const _components = {
          h1: \\"h1\\",
          ...props.components
        };
        const {wrapper: MDXLayout} = _components;
      return <MDXLayout {...props}><_components.h1>{\\"Head 1\\"}</_components.h1></MDXLayout>;
      "
    `);
  });

  it("should extract the main code from a function in dev mode with multiple children", async () => {
    const input = await compile(
      `# Head 1

content
`,
      { jsx: true }
    );

    expect(extractMainCodeAsChildren(input.value.toString()))
      .toMatchInlineSnapshot(`
      "const _components = {
          h1: \\"h1\\",
          p: \\"p\\",
          ...props.components
        };
        const {wrapper: MDXLayout} = _components;
      return <MDXLayout {...props}><_components.h1>{\\"Head 1\\"}</_components.h1>{\\"\\\\n\\"}<_components.p>{\\"content\\"}</_components.p></MDXLayout>;
      "
    `);
  });
});
