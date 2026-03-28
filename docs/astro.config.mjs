import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "Pestacle",
      description:
        "Build presentation slide decks from MDX files with React and Vite.",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/gpichot/pestacle",
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [{ label: "Introduction", slug: "guides/getting-started" }],
        },
        {
          label: "Guides",
          items: [
            { label: "Writing Slides", slug: "guides/writing-slides" },
            { label: "Theming", slug: "guides/theming" },
            { label: "Custom Layouts", slug: "guides/custom-layouts" },
          ],
        },
        {
          label: "Layouts",
          autogenerate: { directory: "layouts" },
        },
        {
          label: "Components",
          autogenerate: { directory: "components" },
        },
        {
          label: "Reference",
          items: [
            { label: "Configuration", slug: "reference/configuration" },
            {
              label: "Morph & Transitions",
              slug: "reference/morph-and-transitions",
            },
          ],
        },
      ],
    }),
  ],
});
