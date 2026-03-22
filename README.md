# Pestacle

A presentation framework for developers. Write slides in MDX (Markdown + JSX), render them as interactive React-based slide decks with code stepping, animations, and customizable layouts.

Built on top of [Spectacle](https://formidable.com/open-source/spectacle/) with a Vite plugin for seamless MDX integration.

## Features

- **MDX Slides** - Write presentations in Markdown with embedded JSX components
- **Multiple Layouts** - 9 built-in layouts (centered, side-by-side, quote, section headers, etc.)
- **Code Stepping** - Interactive code blocks with line highlighting and progressive reveal
- **Theming** - Green and purple themes with CSS variable customization
- **Animations** - Timeline, horizontal lists, and progressive reveal via react-spring
- **Math Support** - LaTeX equations via KaTeX
- **QR Codes** - Inline QR code generation via directive syntax
- **Hot Reload** - Full Vite HMR support for fast iteration

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Then open the URLs logged in the terminal to view your decks.

## Project Structure

This is a pnpm monorepo managed by Turbo:

```
pestacle/
├── packages/
│   ├── spectacle-deck/          # Core React components, layouts, and theming
│   └── vite-plugin-react-deck/  # Vite plugin for MDX slide processing
└── apps/
    └── talks/                   # Example presentation application
```

## Writing a Deck

Create an MDX file with slides separated by `---`:

```mdx
---
layout: mainSection
---

# My Talk Title

---

## Slide Two

Regular markdown content with **bold** and `code`.

- Bullet points
- Work as expected

---
layout: quote
---

> This is a styled quote slide

-- Author Name
```

### Available Layouts

| Layout | Description |
|---|---|
| `mainSection` | Title slide with background image |
| `centered` | Center-aligned content |
| `default3` | Content with decorative side elements |
| `quote` | Large styled quote with attribution |
| `section` | Horizontal layout with title |
| `sidedCode` | Code on one side, content on other |
| `sidedImage` | Image on one side, content on other |
| `side` | Generic two-column layout |

### Configuration

Create a `pestacle.config.ts` at your project root:

```ts
import { defineConfig } from "vite-plugin-react-deck";

export default defineConfig({
  theme: "purple", // "green" | "purple"
});
```

### Custom Layouts

Add custom layouts in `pestacle/layouts.ts`:

```ts
export { default as mainSection } from "./MyCustomMainSection";
```

### Code Stepping Directives

Use inline comments to control code stepping:

```js
// @step highlight(1-3) name("Function signature")
function greet(name) {
  return `Hello, ${name}!`;
}
// @step highlight(5) showLines(1-6)
greet("world");
```

### MDX Directives

- `:qrcode[https://example.com]` - Inline QR code
- `:::notes` - Speaker notes block

## Packages

### `@gpichot/spectacle-deck`

Core presentation components and layouts. Provides the `Deck` component, all built-in layouts, theming, and reusable slide components (Timeline, CodeStepper, QRCode, etc.).

### `vite-plugin-react-deck`

Vite plugin that transforms MDX files into React slide components. Handles frontmatter extraction, MDX compilation, code generation, and dev server integration.

## Development

```bash
pnpm install        # Install all dependencies
pnpm dev            # Start dev server (watches all packages)
pnpm build          # Build all packages
```

### Running Tests

```bash
# From the vite-plugin-react-deck package
cd packages/vite-plugin-react-deck
npx vitest

# From the spectacle-deck package
cd packages/spectacle-deck
npx vitest
```

## License

ISC
