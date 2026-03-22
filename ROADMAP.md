# Pestacle Roadmap

## Priority 1: Foundation Improvements ✅

All priority 1 items have been addressed.

### ✅ Remove Debug Console Logs

- Removed `console.log` from `SlideWrapper.tsx`, `CodeStepper.tsx`, `config.ts`,
  and `index.ts`
- Replaced Vite plugin info logging with `server.config.logger.info`
- Used Vite's `this.warn()` for plugin-level warnings

### ✅ Improve Test Coverage

- Added `colors.test.ts` — 7 tests for `extractColors` and `createCssVariables`
- Added `slides.test.ts` — 5 tests for `extractInlineModules`
- Added `config.test.ts` — 2 tests for `createDefaultConfig` and `defineConfig`
- Fixed missing vitest imports in existing `code-directives.test.ts`
- Updated stale codegen snapshots
- Total: 22 tests across 5 test files

### ✅ Fix Root-Level Test Script

- Root `package.json` now runs `turbo test`
- Both packages use `vitest run` for their test scripts
- Added `test` pipeline to `turbo.json`

### ✅ Add TypeScript Strict Mode / Type Checking

- Added root `tsconfig.json` with project references
- Added `type-check` script to root `package.json` via Turbo
- Added `type-check` scripts to both packages
- Both packages already had strict mode enabled

### ✅ Improve Error Handling

- `SlideWrapper` now throws with available layout names when a layout is not
  found
- Config loading throws descriptive errors with Zod issue details on validation
  failure
- Removed `process.exit(1)` in config — errors now propagate naturally

### ✅ Add Linting & Formatting

- Added Biome for TypeScript/JSX linting and formatting
- Added Prettier for Markdown formatting (with prose wrap)
- Added Husky with pre-commit hook running Biome check and Prettier
- Added `lint`, `format`, and `format:check` scripts to root and packages
- Added lint/format pipelines to `turbo.json`

---

## Priority 2: Developer Experience

### Documentation

- Add JSDoc comments to public APIs (`Deck` component props, layout props,
  plugin options)
- Document available MDX directive syntax comprehensively
- Add a "creating a new deck" step-by-step guide

### Easier Project Scaffolding

- Add a `create-pestacle` CLI or template for bootstrapping new presentation
  projects
- Currently requires manually setting up Vite config, pestacle config, and
  directory structure

### Improve Plugin Configuration

- Allow theme customization beyond just "green" or "purple" (custom color
  objects)
- Support configuring fonts, sizes, and other theme tokens from
  `pestacle.config.ts`
- Add plugin options for controlling output paths and entry points

### Hot Module Replacement

- HMR works but requires explicit Vite watch config for packages in
  `node_modules`
- Investigate smoother HMR without requiring manual watch configuration

### Better Dev Server Output

- Show deck URLs more prominently when dev server starts
- Add a deck index page listing all available presentations

---

## Priority 3: New Features

### Export & Distribution

- PDF export of presentations
- Static HTML export (no JS required for viewing)
- Export as self-contained single-file HTML

### Presenter Mode

- Speaker notes view (data already supported via `:::notes` directive)
- Timer and clock display
- Next slide preview
- Separate presenter window

### More Themes

- Add additional built-in themes beyond green and purple
- Support dark/light mode variants
- Allow theme hot-switching during presentation

### Additional Layouts

- Grid layout (2x2, 3x3 content areas)
- Comparison layout (side-by-side with headers)
- Full-bleed image/video background layout
- Agenda/table of contents layout

### Enhanced Code Features

- Live code editing in slides (sandboxed execution)
- Diff view between code steps (show what changed)
- Language-specific syntax support improvements
- Terminal/console output simulation

### Media & Interactivity

- Video embedding with playback controls
- Embedded iframes for live demos
- Interactive polls or quizzes
- Slide transitions and animations between slides

### Collaboration

- Real-time collaborative editing
- Shared presentation viewing (audience follows presenter)
- Audience Q&A integration

### Accessibility

- Keyboard navigation improvements
- Screen reader support for slide content
- High contrast mode
- Reduced motion mode for animations

### Build & Performance

- Optimize bundle size (tree-shake unused layouts and components)
- Pre-render slides for faster initial load
- Image optimization pipeline (resize, compress, convert to webp)
- Lazy load heavy components (QR code, syntax highlighter)
