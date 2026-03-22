import fs from "node:fs";

import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

import { extractMainCodeAsChildren } from "./codegen";
import type { ReactDeckOptions } from "./types";

type CompileOptions = Pick<ReactDeckOptions, "rehypePlugins" | "remarkPlugins">;

function myRemarkPlugin() {
  /**
   * @param {import('mdast').Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (!node.data) {
          node.data = {};
        }
        const data = node.data;

        data.hName = "directive";
        data.hProperties = node.attributes;
        data.hProperties._name = node.name;
        data.hProperties._kind = node.type;
      }
    });
  };
}

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
 t
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
  } & CompileOptions,
) {
  const { data: metadata, content } = matter(sourceContent);
  const { content: finalContent, inlineModules } = extractInlineModules(
    normalizeNewline(content),
  );
  const slides = finalContent.split("---\n");

  const enrichedSlides = [] as {
    metadata: Record<string, unknown> | null;
    content: string;
  }[];
  let frontmatterForNextSlide: Record<string, unknown> | null = null;
  for (const slide of slides) {
    if (isFrontmatterBlock(slide)) {
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
    enrichedSlides.map(async (slide, _index) => {
      const code = addInlineModules(slide.content, inlineModules);
      // For vite seee https://vitejs.dev/guide/env-and-mode.html#production-replacement
      const normalizedCode = code.replace("process.env", "process\u200b.env");
      const result = await compile(normalizedCode, {
        outputFormat: "program",
        jsx: false,
        providerImportSource: "@mdx-js/react",
        ...options,
        remarkPlugins: [
          remarkGfm,
          remarkDirective,
          myRemarkPlugin,
          ...options.remarkPlugins,
        ],
      });
      const mainCode = extractMainCodeAsChildren(result.value.toString(), {
        isJsx: false,
      });

      return {
        ...slide,
        mdxContent: mainCode,
      };
    }),
  );

  const output = addInlineModules(
    `
import React from 'react';
import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";
import {useMDXComponents as _provideComponents} from "@mdx-js/react";

${compiledSlides
  .map(
    (slide, index) => ` 
export function Slide${index}(baseProps) {
  const props = {...baseProps, frontmatter: ${JSON.stringify(slide.metadata)} };
  ${slide.mdxContent}
}
`,
  )
  .join("\n")}
  
export default function Deck() {
  };
Deck.metadata = ${JSON.stringify(metadata)};
Deck.slides = [
  ${compiledSlides
    .map(
      (slide, index) => `{
      metadata: ${JSON.stringify(slide.metadata)},
      slideComponent: Slide${index}
    }`,
    )
    .join(",")}
]
  `,
    inlineModules,
  );

  fs.writeFileSync("slides.js", output);

  return output;
}

/*
 * See this link for an explanation of the regex solution:
 * https://stackoverflow.com/questions/6462578/regex-to-match-all-instances-not-inside-quotes/23667311#23667311
 * Note that the regex isn't concerned about code blocks (```).
 * Tracking pairs of ` should be sufficient to capture code blocks, too.
 */
const MOD_REG = /\\`|`(?:\\`|[^`])*`|(^(?:import|export).*$)/gm;

export function extractInlineModules(
  source: string,
  {
    inlineModules = new Set(),
  }: {
    inlineModules?: Set<string>;
  } = {},
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

/**
 * Check if a block between --- separators is a frontmatter block
 * (all non-empty lines are YAML key-value pairs).
 */
function isFrontmatterBlock(text: string): boolean {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  return lines.length > 0 && lines.every((l) => /^[\w][\w-]*\s*:/.test(l));
}

const CRLF = "\r\n";
function normalizeNewline(input: string) {
  return input.replace(new RegExp(CRLF, "g"), "\n");
}
