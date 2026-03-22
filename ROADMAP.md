# Pestacle Roadmap

## Priority 1: Foundation Improvements

These should be addressed first to improve reliability, developer experience, and maintainability.

### Remove Debug Console Logs
- `SlideWrapper.tsx` logs layout lookups on every render
- `CodeStepper.tsx` logs step information during presentation
- Replace with a debug mode flag or remove entirely

### Improve Test Coverage
- Current coverage: 2 test files (8 tests total) covering only directive parsing and codegen extraction
- Add tests for:
  - Slide splitting and frontmatter extraction (`slides.ts`)
  - Config loading and validation (`config.ts`)
  - Theme application and CSS variable generation (`colors.ts`, `theme.ts`)
  - SlideWrapper layout resolution
  - Component rendering (Timeline, QRCode, HorizontalList, etc.)

### Fix Root-Level Test Script
- `package.json` has `"test": "echo \"Error: no test specified\" && exit 1"`
- Should run tests across all packages via Turbo

### Add TypeScript Strict Mode / Type Checking
- No root-level `tsconfig.json`
- Add `type-check` script to root `package.json` that runs via Turbo
- Ensure all packages pass strict type-checking

### Improve Error Handling
- `SlideWrapper` silently falls back when a layout is not found (only logs a warning)
- Config loading has no clear error messages for invalid configs
- MDX compilation errors could surface more clearly in dev

### Add Linting & Formatting
- No ESLint or Prettier configuration exists
- Add consistent code style enforcement across the monorepo

---

## Priority 2: Developer Experience

### Documentation
- Add JSDoc comments to public APIs (`Deck` component props, layout props, plugin options)
- Document available MDX directive syntax comprehensively
- Add a "creating a new deck" step-by-step guide

### Easier Project Scaffolding
- Add a `create-pestacle` CLI or template for bootstrapping new presentation projects
- Currently requires manually setting up Vite config, pestacle config, and directory structure

### Improve Plugin Configuration
- Allow theme customization beyond just "green" or "purple" (custom color objects)
- Support configuring fonts, sizes, and other theme tokens from `pestacle.config.ts`
- Add plugin options for controlling output paths and entry points

### Hot Module Replacement
- HMR works but requires explicit Vite watch config for packages in `node_modules`
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
