---
title: Getting Started
description: Set up Pestacle and create your first presentation deck.
---

Pestacle lets you build presentation slide decks from MDX files using React and
Vite. Write your slides in Markdown with JSX components, and Pestacle handles
rendering, navigation, theming, and animations.

## Prerequisites

- **Node.js** 18+
- **pnpm** (recommended) or npm/yarn

## Installation

Install both packages in your project:

```bash
pnpm add vite-plugin-react-deck @gpichot/spectacle-deck
pnpm add -D @vitejs/plugin-react vite
```

## Project Setup

### 1. Vite Configuration

Create a `vite.config.mts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import reactDeck from "vite-plugin-react-deck";

export default defineConfig({
  plugins: [
    react(),
    reactDeck({
      rehypePlugins: [],
      remarkPlugins: [],
      theme: "green",
    }),
  ],
});
```

### 2. Pestacle Configuration (optional)

Create a `pestacle.config.ts` at the project root to set defaults:

```ts
import { defineConfig } from "vite-plugin-react-deck";

export default defineConfig({
  theme: "purple",
});
```

### 3. Create Your First Deck

Create `src/my-talk/deck.mdx`:

```mdx
---
author: Your Name
---

# Welcome to Pestacle

Your first slide.

---

layout: centered

---

## Second Slide

Content goes here.
```

The plugin discovers any `src/**/deck.mdx` file automatically.

## Development

```bash
pnpm vite dev
```

The dev server starts with HMR. If you have multiple decks, a startup page lists
them all at the root URL.

## Production Build

```bash
pnpm vite build
```

This produces a static build with one HTML entry per deck.

## Multiple Decks

Place each deck in its own directory under `src/`:

```
src/
├── talk-1/deck.mdx
├── talk-2/deck.mdx
└── workshop/deck.mdx
```

Each deck gets its own route (e.g., `/talk-1/`, `/talk-2/`).

## Keyboard Navigation

During a presentation:

| Key                 | Action            |
| ------------------- | ----------------- |
| Right arrow / Space | Next slide        |
| Left arrow          | Previous slide    |
| F                   | Toggle fullscreen |

## Next Steps

- [Writing Slides](/guides/writing-slides/) — learn the MDX slide authoring
  syntax
- [Layouts](/layouts/centered/) — explore the built-in layouts
- [Configuration](/reference/configuration/) — all configuration options
