---
title: Writing Slides
description:
  Learn how to author slides with MDX, frontmatter, directives, and imports.
---

Pestacle slides are written in `.mdx` files — Markdown with JSX support. Each
deck is a single `deck.mdx` file where slides are separated by `---`.

## Slide Separation

Use `---` on its own line to separate slides:

```mdx
# Slide 1

Some content.

---

# Slide 2

More content.
```

## Deck Frontmatter

The top of the file can have YAML frontmatter for deck-level metadata:

```mdx
---
author: Jane Doe
title: My Talk
description: A brief description
theme: purple
---

# First Slide
```

The `theme` field in deck frontmatter overrides the global theme for that deck
only.

## Slide Frontmatter (Layouts)

To apply a layout to a slide, add a frontmatter block **before** the slide
content. This block sits between two `---` separators and contains only
key-value pairs:

```mdx
---
layout: centered
---

## This slide uses the centered layout
```

Available frontmatter fields depend on the layout. Common ones:

| Field        | Description                                            |
| ------------ | ------------------------------------------------------ |
| `layout`     | Layout name (e.g., `centered`, `quote`, `side`)        |
| `position`   | Position hint (`left`, `right`, `top`, `bottom`)       |
| `image`      | Image URL (for `sidedImage` and `fullImage`)           |
| `author`     | Quote attribution (for `quote`)                        |
| `sourceUrl`  | Source link (for `quote`)                              |
| `value`      | Display value (for `bigNumber`)                        |
| `dim`        | Background dim factor 0-1 (for `fullImage`)            |
| `transition` | Per-slide transition (`fade`, `slide`, `drop`, `none`) |

## Importing Components

Import React components directly in your MDX. Imports are hoisted and shared
across all slides in the file:

```mdx
import { Timeline, TimelineItem } from "@gpichot/spectacle-deck";

<Timeline>
  <TimelineItem title="2023">Something happened.</TimelineItem>
  <TimelineItem title="2024">Something else happened.</TimelineItem>
</Timeline>
```

## Morph Directive

Add `{morph="name"}` to any inline element to animate it between slides.
Elements with the same morph name smoothly transition position and style:

```mdx
# **My Title** {morph="heading"}

---

## **My Title** {morph="heading"}
```

The heading animates from `h1` to `h2` size when navigating forward. See
[Morph & Transitions](/reference/morph-and-transitions/) for details.

## QR Code Directive

Generate a QR code inline with the `:qrcode` directive:

```mdx
:qrcode[https://example.com]
```

This renders a QR code pointing to the URL.

## Speaker Notes

Add speaker notes with the `:::notes` container directive:

```mdx
## Visible Slide Content

:::notes{size=0.8em}

These notes are only visible in presenter mode.

:::
```

## Include Directive

Split large decks across files with `::include`:

```mdx
::include{file=./intro-slides.mdx}

---

## A regular slide here

---

::include{file=./conclusion-slides.mdx}
```

Included files have their top-level frontmatter stripped. Nested includes are
supported (up to 10 levels deep).

## Remark/Rehype Plugins

Extend the MDX pipeline with custom remark and rehype plugins in your Vite
config:

```ts
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

reactDeck({
  rehypePlugins: [rehypeKatex],
  remarkPlugins: [remarkMath],
  theme: "green",
});
```

This example adds LaTeX math support. Use `$$ E = mc^2 $$` for block math or
`$x^2$` for inline.

## Tables

Standard GFM tables are supported out of the box (via `remark-gfm`):

```mdx
| Column A | Column B |
| -------- | -------- |
| foo      | bar      |
```

## Code Blocks

Fenced code blocks get syntax highlighting automatically:

````mdx
```tsx
function App() {
  return <h1>Hello</h1>;
}
```
````
