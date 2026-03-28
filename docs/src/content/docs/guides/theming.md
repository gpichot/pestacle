---
title: Theming
description: Configure and customize the visual appearance of your decks.
---

Pestacle ships with five built-in themes and supports fully custom themes.

## Built-in Themes

Set the theme in your Vite plugin options or `pestacle.config.ts`:

```ts
reactDeck({
  theme: "purple", // or "green", "dark", "light", "solarized-light"
  // ...
});
```

### Theme Colors

Each theme defines three colors: **primary** (text), **secondary** (accent), and
**tertiary** (background).

| Theme             | Primary                | Secondary                  | Tertiary                |
| ----------------- | ---------------------- | -------------------------- | ----------------------- |
| `green`           | `#FFFFFF`              | `#F49676` (coral)          | `#042F3B` (dark teal)   |
| `purple`          | `#FFFFFF`              | `#F530EC` (magenta)        | `#2B135A` (deep purple) |
| `dark`            | `#E8E8ED` (soft white) | `#6E56CF` (vibrant purple) | `#111113` (near-black)  |
| `light`           | `#1a1a2e` (dark navy)  | `#0077b6` (vivid blue)     | `#f5f5f7` (off-white)   |
| `solarized-light` | `#073642` (base02)     | `#268bd2` (blue)           | `#fdf6e3` (base3)       |

### Theme Fonts

The `dark` and `light` themes use **Inter**. The `solarized-light` theme uses
**Source Sans Pro**. The `green` and `purple` themes use **Bitter**.

## Per-Deck Theme Override

Override the theme for a specific deck via its frontmatter:

```mdx
---
theme: dark
---

# This deck uses the dark theme
```

## CSS Variables

Theme colors are injected as CSS variables, available in any styled component or
inline style:

| Variable                | Description                                |
| ----------------------- | ------------------------------------------ |
| `--color-primary`       | Primary color value                        |
| `--color-secondary`     | Secondary color value                      |
| `--color-tertiary`      | Tertiary (background) color value          |
| `--color-primary-rgb`   | Primary as `r, g, b` for use with `rgba()` |
| `--color-secondary-rgb` | Secondary as `r, g, b`                     |
| `--color-tertiary-rgb`  | Tertiary as `r, g, b`                      |

Use them in your slides:

```mdx
<div style={{ color: "var(--color-secondary)" }}>Accent text</div>
<div style={{ background: "rgba(var(--color-secondary-rgb), 0.2)" }}>
  Semi-transparent background
</div>
```

## Custom Themes

Create a custom theme by exporting a `themeTokens` object from any file:

```ts
// pestacle/themes/my-theme.ts
const colors = {
  primary: "#ffffff",
  secondary: "#ff6b6b",
  tertiary: "#1a1a2e",
};

const fonts = {
  header: '"Fira Sans", sans-serif',
  text: '"Fira Sans", sans-serif',
};

export const themeTokens = {
  colors,
  fonts,
};
```

Reference it as a relative path in the deck frontmatter:

```mdx
---
theme: ./pestacle/themes/my-theme
---
```

Or pass the path in the plugin options for all decks.
