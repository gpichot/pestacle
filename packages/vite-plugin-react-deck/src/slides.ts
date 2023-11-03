import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";

import { ReactDeckOptions } from "./types";

type CompileOptions = Pick<ReactDeckOptions, "rehypePlugins">;

/**
 * Slides are separated by "---" in the markdown file.
 *
 * A file can use frontmatter to specify the title of the slide and internal
 * frontmatter to specify layout like this :
 *
 * ---
 *
 * layout: main
 *
 * ---
 *
 * # Slide 1
 *
 * ---
 *
 * layout: slide2
 *
 * ---
 *
 * # Slide 2
 *
 */
export async function transformSlidesMdxToReact(
  sourceContent: string,
  {
    production: isProd,
    ...options
  }: {
    production: boolean;
  } & CompileOptions
) {
  const { data: metadata, content } = matter(sourceContent);
  const { content: finalContent, inlineModules } = extractInlineModules(
    normalizeNewline(content)
  );
  const slides = finalContent.split("---");

  const enrichedSlides = [] as {
    metadata: Record<string, unknown> | null;
    content: string;
  }[];
  const LAYOUT_REGEX = /\S*\nlayout: (.*)/g;

  let frontmatterForNextSlide: Record<string, unknown> | null = null;
  for (const slide of slides) {
    if (LAYOUT_REGEX.test(slide)) {
      frontmatterForNextSlide = matter(`---\n${slide}\n---`).data;
      continue;
    }

    enrichedSlides.push({
      metadata: frontmatterForNextSlide,
      content: slide,
    });
    frontmatterForNextSlide = null;
  }

  const compiledSlides = await Promise.all(
    enrichedSlides.map(async (slide) => {
      const code = addInlineModules(slide.content, inlineModules);
      // For vite seee https://vitejs.dev/guide/env-and-mode.html#production-replacement
      const normalizedCode = code.replace("process.env", "process\u200b.env");
      const result = await compile(normalizedCode, {
        outputFormat: "program",
        jsx: !isProd,
        providerImportSource: "@mdx-js/react",
        ...options,
      });
      const mainCode = extractMainCodeAsChildren(result.value.toString());

      return {
        ...slide,
        mdxContent: mainCode,
      };
    })
  );

  return addInlineModules(
    `
import React from 'react';
${
  isProd
    ? 'import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";import {useMDXComponents as _provideComponents} from "@mdx-js/react" '
    : "import {useMDXComponents as _provideComponents} from '@mdx-js/react';"
}
  
export default {
    metadata: ${JSON.stringify(metadata)},
    slides: [${compiledSlides
      .map(
        (slide) => `{
        metadata: ${JSON.stringify(slide.metadata)},
        slideComponent: (baseProps) => {
          const props = {...baseProps, frontmatter: ${JSON.stringify(
            slide.metadata
          )} };
          ${slide.mdxContent}
        }
      }`
      )
      .join(",")}
    ]
  };`,
    inlineModules
  );
}

/*
 * See this link for an explanation of the regex solution:
 * https://stackoverflow.com/questions/6462578/regex-to-match-all-instances-not-inside-quotes/23667311#23667311
 * Note that the regex isn't concerned about code blocks (```).
 * Tracking pairs of ` should be sufficient to capture code blocks, too.
 */
const EX_REG = /\\`|`(?:\\`|[^`])*`|(^(?:export\sdefault\s)(.*)$)/gm;
const MOD_REG = /\\`|`(?:\\`|[^`])*`|(^(?:import|export).*$)/gm;

export function extractInlineModules(
  source: string,
  {
    inlineModules = new Set(),
  }: {
    inlineModules?: Set<string>;
  } = {}
) {
  /*
   * Set aside all inline JSX import and export statements from the MDX file.
   * When mdx.sync() compiles MDX into JSX, it will stub any component that doesn't
   * have a corresponding import. Therefore, we will re-add all of the imports/exports
   * to each slide before compiling the MDX via mdx.sync().
   */
  const finalContent = source.replace(MOD_REG, (value, group1) => {
    if (!group1) {
      // group1 is empty, so this is not the import/export case we're looking for
      return value;
    }
    // found an inline export or import statement
    inlineModules.add(value);
    return "";
  });

  return { content: finalContent, inlineModules };
}

function addInlineModules(source: string, inlineModules: Set<string>) {
  return `
${[...inlineModules.keys()].join("\n")}

${source}
  `;
}

const CRLF = "\r\n";
function normalizeNewline(input: string) {
  return input.replace(new RegExp(CRLF, "g"), "\n");
}

function extractMainCodeAsChildren(source: string) {
  // Retrieve `const _components = {` line
  // up to return statement
  const start = source.indexOf("const _components = {");
  const endReturn = source.indexOf("return ", start);
  const end = source.indexOf("\n", endReturn);
  const components = source.slice(start, end);

  if (!components) {
    return "";
  }
  const withWrapper = components.replace(
    /return\s*</gm,
    "const {wrapper: MDXLayout} = _components;\nreturn <"
  );

  const hasLayout = withWrapper.match(/\n\s*return <>/gm);
  if (hasLayout) {
    return withWrapper
      .replace(/\n\s*return <>/gm, "\nreturn <MDXLayout {...props}>")
      .replace(/<\/>;\s*$/gm, "</MDXLayout>;\n");
  }

  const result = withWrapper
    .replace(/\n\s*return\s*</gm, "\nreturn <MDXLayout {...props}><")
    .replace(/>;\s*$/gm, "></MDXLayout>;\n");

  return result;
}
