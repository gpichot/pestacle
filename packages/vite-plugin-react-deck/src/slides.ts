import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";

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
  }: {
    production: boolean;
  }
) {
  const { data: metadata, content } = matter(sourceContent);
  const slides = content.split("---");

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
      const result = await compile(slide.content, {
        outputFormat: "program",
        jsx: !isProd,
      });

      return {
        ...slide,
        mdxContent: result.value
          .toString()
          .replace('import {jsx as _jsx} from "react/jsx-runtime"', "")
          .replace("export default function MDXContent", "function MDXContent"),
      };
    })
  );

  return `
import React from 'react';
${isProd ? 'import {jsx as _jsx} from "react/jsx-runtime";' : ""}
  
export default {
    metadata: ${JSON.stringify(metadata)},
    slides: [${compiledSlides
      .map(
        (slide) => `{
        metadata: ${JSON.stringify(slide.metadata)},
        content: \`${slide.content}\`,
        slideComponent: () => {
          ${slide.mdxContent}
          return ${isProd ? "_jsx(MDXContent, {})" : "<MDXContent />"}
        }
      }`
      )
      .join(",")}
    ]
  };`;
}
