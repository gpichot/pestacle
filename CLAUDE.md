# CLAUDE.md - Pestacle

## What is this?

Pestacle is a monorepo for building presentation slide decks from MDX files. It combines Spectacle (a React presentation library) with a custom Vite plugin to provide a seamless authoring experience.

## Repository Organization

```
pestacle/
├── packages/
│   ├── spectacle-deck/          # Core UI package
│   │   ├── src/
│   │   │   ├── index.tsx        # Main Deck component + re-exports
│   │   │   ├── context.tsx      # PestacleContext (layout provider)
│   │   │   ├── SlideWrapper.tsx  # Applies layout from frontmatter
│   │   │   ├── theme.ts         # Base theme (fonts, sizes, colors)
│   │   │   ├── colors.ts        # CSS variable generation for themes
│   │   │   ├── template.tsx     # Slide footer (progress bar, fullscreen)
│   │   │   ├── layouts/         # 9 built-in layouts (centered, quote, side, etc.)
│   │   │   └── components/      # Reusable components (CodeStepper, Timeline, QRCode, etc.)
│   │   └── scripts/bundle.ts    # esbuild bundling script
│   │
│   └── vite-plugin-react-deck/  # Vite plugin package
│       ├── src/
│       │   ├── index.ts         # Main Vite plugin hooks (load, config, transform)
│       │   ├── slides.ts        # MDX → React slide transformation pipeline
│       │   ├── codegen.ts       # JSX extraction from compiled MDX output
│       │   ├── config.ts        # Config loading (pestacle.config.ts) with Zod validation
│       │   ├── helpers.ts       # Generated file templates (index.html, __deck.tsx)
│       │   ├── types.ts         # TypeScript type definitions
│       │   └── themes/          # Theme definitions (green, purple)
│       └── scripts/bundle.ts    # esbuild bundling script
│
└── apps/
    └── talks/                   # Example app using both packages
        ├── src/deck1/deck.mdx   # Full-featured example presentation
        ├── src/deck2/deck.mdx   # Simple example presentation
        ├── pestacle.config.ts   # Theme config (purple)
        ├── pestacle/layouts.ts  # Custom layout overrides
        └── vite.config.mts      # Vite config with plugin setup
```

## Key Concepts

### Data Flow: MDX to Rendered Slides

1. User writes `deck.mdx` with slides separated by `---`
2. Vite plugin intercepts the `.mdx` file load
3. gray-matter extracts frontmatter per slide (layout, position, etc.)
4. Custom remark plugin converts directive syntax (`:qrcode[...]`, `:::notes`)
5. `@mdx-js/mdx` compiles each slide to JSX
6. codegen wraps output with MDXLayout component
7. Generated module exports `Slide0`, `Slide1`, etc. + deck metadata
8. `__deck.tsx` template imports slides and theme, renders `<Deck>`
9. `SlideWrapper` applies the correct layout based on frontmatter
10. Spectacle handles rendering, navigation, and keyboard controls

### Layout System

Layouts are React components selected via frontmatter `layout` field. They receive slide children and optional `position` prop. Custom layouts can override built-in ones via `pestacle/layouts.ts`.

### Theming

Two built-in themes (green/purple) define primary, secondary, tertiary colors. Colors are injected as CSS variables (`--color-primary`, `--color-secondary-rgb`, etc.) for use in styled-components.

### Component Mapping

MDX elements are mapped to custom components via `components/map.tsx`. This maps standard markdown elements (h1, pre, code, etc.) to styled Pestacle components.

## Build & Dev Commands

```bash
# Development (starts all packages + app with HMR)
pnpm dev

# Build all packages
pnpm build

# Type-check
pnpm turbo type-check
```

## Testing

Tests use Vitest. There are currently two test files:

```bash
# Run tests for the vite plugin (codegen tests)
cd packages/vite-plugin-react-deck && npx vitest run

# Run tests for spectacle-deck (code directive parsing tests)
cd packages/spectacle-deck && npx vitest run
```

Test files:
- `packages/vite-plugin-react-deck/src/codegen.test.ts` - Tests MDX code extraction (4 snapshot tests)
- `packages/spectacle-deck/src/components/CodeStepper/code-directives.test.ts` - Tests directive parsing (4 tests)

## Package Build

Both packages use esbuild (`scripts/bundle.ts`) to produce:
- `.cjs` (CommonJS) and `.mjs` (ESM) bundles
- TypeScript declarations via `tsc`
- PNG files handled as data URLs (spectacle-deck)

## Key Dependencies

- **React 18** + React-DOM
- **Spectacle 10** - Base presentation framework
- **@mdx-js/mdx 3** - MDX compiler
- **Vite 5** - Dev server and build tool
- **styled-components 6** - CSS-in-JS styling
- **react-spring 9** - Animations
- **react-syntax-highlighter** - Code block syntax highlighting
- **gray-matter** - Frontmatter parsing
- **Zod** - Config schema validation
- **Turbo** - Monorepo task runner
- **pnpm** - Package manager

## Conventions

- Package names are scoped under `@gpichot/`
- Layouts are exported as a named map from `layouts/index.tsx`
- Each slide component receives `children` and optional `frontmatter`
- Styled-components use CSS variables from the theme for colors
- The Vite plugin generates virtual files (`__deck.tsx`, `index.html`) at dev/build time
