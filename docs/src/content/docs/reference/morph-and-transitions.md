---
title: Morph & Transitions
description: Animate elements between slides and control slide transitions.
---

Pestacle supports two kinds of animation between slides: **slide transitions**
(how the whole slide enters/exits) and **morph** (how individual elements
animate across slides).

## Slide Transitions

Set a default transition globally in your config or per-slide in frontmatter.

### Global Default

```ts
// pestacle.config.ts
import { defineConfig } from "vite-plugin-react-deck";

export default defineConfig({
  theme: "purple",
  transition: "fade",
});
```

Or in the Vite plugin options:

```ts
reactDeck({
  theme: "purple",
  transition: "slide",
  // ...
});
```

### Per-Slide Override

```mdx
---
layout: centered
transition: none
---

## This slide has no transition
```

### Available Transitions

| Name    | Description                                          |
| ------- | ---------------------------------------------------- |
| `fade`  | Cross-fade (300ms)                                   |
| `slide` | Horizontal slide left/right (400ms, direction-aware) |
| `drop`  | Vertical drop in/out (500ms)                         |
| `none`  | Instant switch                                       |

All transitions use the browser's View Transitions API.

---

## Morph Directive

The morph directive lets you animate inline elements between slides. Add
`{morph="name"}` to any markdown element:

```mdx
# **Big Title** {morph="title"}

---

## **Big Title** {morph="title"}
```

The heading smoothly animates from `h1` size to `h2` size. Any element with the
same `morph` name across consecutive slides will morph its position, size, and
style.

### Works On

- Headings: `# Text {morph="name"}`
- Paragraphs: `Some text {morph="name"}`
- Emphasis/bold: `**bold** {morph="name"}`

---

## Morph Component

For more complex morphing (boxes, cards, arbitrary elements), use the `<Morph>`
component:

```mdx
import { Morph } from "@gpichot/spectacle-deck";

<Morph
  name="demo-box"
  style={{
    width: 200,
    height: 200,
    borderRadius: 16,
    background: "#F530EC",
  }}
>
  Hello
</Morph>
```

On the next slide, use the same `name` with different styles:

```mdx
<Morph
  name="demo-box"
  style={{
    width: 200,
    height: 200,
    borderRadius: 100,
    background: "#22d3ee",
  }}
>
  Hello
</Morph>
```

The element smoothly morphs its shape, color, and position.

### Morph Props

| Prop        | Type                          | Default | Description                                  |
| ----------- | ----------------------------- | ------- | -------------------------------------------- |
| `name`      | `string`                      | —       | Unique identifier (must match across slides) |
| `as`        | `keyof JSX.IntrinsicElements` | `"div"` | HTML tag to render                           |
| `style`     | `CSSProperties`               | —       | Inline styles                                |
| `className` | `string`                      | —       | CSS class                                    |
| `children`  | `ReactNode`                   | —       | Content                                      |

---

## MorphImage

A convenience wrapper for morphing images:

```mdx
import { MorphImage } from "@gpichot/spectacle-deck";

<MorphImage
  name="photo-1"
  src="https://picsum.photos/seed/morph1/300/200"
  style={{ borderRadius: 12, width: 280 }}
/>
```

### MorphImage Props

| Prop        | Type            | Default | Description       |
| ----------- | --------------- | ------- | ----------------- |
| `name`      | `string`        | —       | Unique identifier |
| `src`       | `string`        | —       | Image URL         |
| `alt`       | `string`        | `""`    | Alt text          |
| `style`     | `CSSProperties` | —       | Inline styles     |
| `className` | `string`        | —       | CSS class         |

---

## Tips

- Morph names must be **unique within a single slide** — don't reuse a name
  twice on the same slide
- You can morph multiple elements simultaneously by using different names
- Combine morph with `transition: none` on the slide for the cleanest look (the
  morph provides its own animation)
- Works with cards, shapes, images, headings — any visual element
