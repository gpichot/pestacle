---
title: Configuration
description: All configuration options for Pestacle.
---

Pestacle is configured in two places: the **Vite plugin options** and the
optional **`pestacle.config.ts`** file.

## Vite Plugin Options

Pass options to the `reactDeck()` plugin in your `vite.config.mts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import reactDeck from "vite-plugin-react-deck";

export default defineConfig({
  plugins: [
    react(),
    reactDeck({
      theme: "purple",
      rehypePlugins: [],
      remarkPlugins: [],
      startupPage: true,
      transition: "fade",
    }),
  ],
});
```

### Options

| Option          | Type                                                                    | Default                              | Description                                 |
| --------------- | ----------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------- |
| `theme`         | `"green"` \| `"purple"` \| `"dark"` \| `"light"` \| `"solarized-light"` | `"green"`                            | Built-in theme                              |
| `rehypePlugins` | `any[]`                                                                 | `[]`                                 | Rehype plugins for the MDX pipeline         |
| `remarkPlugins` | `any[]`                                                                 | `[]`                                 | Remark plugins for the MDX pipeline         |
| `startupPage`   | `boolean`                                                               | `true` in dev, `false` in production | Show the decks listing page at the root URL |
| `transition`    | `"fade"` \| `"slide"` \| `"drop"` \| `"none"`                           | —                                    | Default slide transition                    |

## pestacle.config.ts

An optional config file at the project root. Validated with Zod.

```ts
import { defineConfig } from "vite-plugin-react-deck";

export default defineConfig({
  theme: "purple",
  transition: "fade",
});
```

The plugin looks for `pestacle.config.ts`, `pestacle.config.js`, or
`pestacle.config.mjs` in order.

### Schema

| Field         | Type                                                                    | Default   | Description                        |
| ------------- | ----------------------------------------------------------------------- | --------- | ---------------------------------- |
| `theme`       | `"green"` \| `"purple"` \| `"dark"` \| `"light"` \| `"solarized-light"` | `"green"` | Theme for all decks                |
| `startupPage` | `boolean`                                                               | —         | Override the startup page behavior |
| `transition`  | `"fade"` \| `"slide"` \| `"drop"` \| `"none"`                           | —         | Default slide transition           |

## Custom Layouts File

If `pestacle/layouts.ts` (or `.tsx`, `.js`, `.jsx`) exists at the project root,
it is automatically loaded and used as the layout map. See
[Custom Layouts](/guides/custom-layouts/).

## Per-Deck Overrides

Individual decks can override the theme via their top-level frontmatter:

```mdx
---
theme: dark
---
```

This takes precedence over both the plugin options and `pestacle.config.ts` for
that deck.

## Deck Discovery

The plugin automatically discovers decks by scanning for `src/**/deck.mdx`
files. Each deck gets:

- Its own HTML entry point at `/<deck-dir>/`
- Its own `__deck.tsx` virtual module
- An entry in the startup page (if enabled)

## Deck Metadata

The startup page extracts metadata from each deck's frontmatter:

| Field         | Description                              |
| ------------- | ---------------------------------------- |
| `title`       | Deck title (falls back to first heading) |
| `author`      | Author name                              |
| `date`        | Date string                              |
| `description` | Short description                        |

Slide count is computed automatically.
