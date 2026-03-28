---
title: Built-in Layouts
description: All 11 built-in layouts with visual previews and usage examples.
---

Pestacle provides 11 built-in layouts you can select via the `layout`
frontmatter field. When no layout is specified, slides use a default
vertically-centered column.

## centered

Content centered vertically and horizontally. The first heading moves to the
bottom at reduced opacity.

```
┌──────────────────────────────────┐
│                                  │
│                                  │
│         Main content here        │
│        (components, text)        │
│                                  │
│                                  │
│   ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─    │
│        Heading (faded, bottom)   │
└──────────────────────────────────┘
```

```mdx
---
layout: centered
---

### Section Title

Main content appears centered.
```

---

## section

A title-card layout for introducing new sections. Content is centered and styled
prominently.

```
┌──────────────────────────────────┐
│                                  │
│                                  │
│        # Section Title           │
│                                  │
│     A brief description line     │
│                                  │
│                                  │
└──────────────────────────────────┘
```

```mdx
---
layout: section
---

# **New Topic** {morph="section-title"}

Introducing the next part of the talk. {morph="section-desc"}
```

---

## mainSection

Opening title slide with a decorative image on the right side.

```
┌──────────────────────────────────┐
│                        │ ░░░░░░░ │
│  # Talk Title          │ ░░░░░░░ │
│                        │ ░image░ │
│  _Subtitle here_       │ ░░░░░░░ │
│                        │ ░░░░░░░ │
└──────────────────────────────────┘
```

```mdx
---
layout: mainSection
---

# **Talk Title** {morph="title"}

_Subtitle or tagline_ {morph="subtitle"}
```

:::note This layout uses a bundled decorative image. To customize it,
[override the layout](/guides/custom-layouts/). :::

---

## quote

A blockquote displayed prominently with author attribution and optional source
link.

```
┌──────────────────────────────────┐
│                                  │
│    ❝                             │
│    React is a JavaScript         │
│    library for building          │
│    user interfaces.              │
│                           ❞      │
│              — React Team        │
│                                  │
└──────────────────────────────────┘
```

```mdx
---
layout: quote
author: React Team
sourceUrl: https://react.dev
---

> React is a JavaScript library for building user interfaces.
```

| Prop        | Type     | Required | Description                  |
| ----------- | -------- | -------- | ---------------------------- |
| `author`    | `string` | Yes      | Attribution name             |
| `sourceUrl` | `string` | No       | URL for the attribution link |

---

## side

Two-column layout with a main area and a darker sidebar panel. Use the `<Side>`
component to mark sidebar content.

```
┌──────────────────────────────────┐
│                    │ ▓▓▓▓▓▓▓▓▓▓ │
│  Main content      │ ▓ Sidebar ▓ │
│  goes here         │ ▓ content ▓ │
│                    │ ▓▓▓▓▓▓▓▓▓▓ │
└──────────────────────────────────┘
     position: right (default)

┌──────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓ │                    │
│ ▓ Sidebar ▓ │  Main content      │
│ ▓ content ▓ │  goes here         │
│ ▓▓▓▓▓▓▓▓▓▓ │                    │
└──────────────────────────────────┘
     position: left
```

```mdx
---
layout: side
---

import { Side } from "@gpichot/spectacle-deck";

## Main Content

This appears in the primary column.

<Side>

### Sidebar

Extra context or supplementary info.

</Side>
```

| Prop       | Type                  | Default   | Description                       |
| ---------- | --------------------- | --------- | --------------------------------- |
| `position` | `"left"` \| `"right"` | `"right"` | Which side the sidebar appears on |

---

## sidedCode

Automatically splits code blocks to one side and text to the other.

```
┌──────────────────────────────────┐
│                    │ ████████████ │
│  ## Explanation    │ █ const x  █ │
│                    │ █ = 42;    █ │
│  Description of    │ █          █ │
│  the code here.    │ █ fn(x);  █ │
│                    │ ████████████ │
└──────────────────────────────────┘
       text            dark bg code
```

````mdx
---
layout: sidedCode
---

## Explaining the Code

Here's what this does.

```tsx
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}
```
````

| Prop       | Type                  | Default   | Description                    |
| ---------- | --------------------- | --------- | ------------------------------ |
| `position` | `"left"` \| `"right"` | `"right"` | Which side the code appears on |

---

## sidedImage

Image on one side, text content on the other.

```
┌──────────────────────────────────┐
│                       │ ░░░░░░░░ │
│  ## About This        │ ░░░░░░░░ │
│                       │ ░ image ░ │
│  Description text     │ ░░░░░░░░ │
│  on this side.        │ ░░░░░░░░ │
│                       │ ░░░░░░░░ │
└──────────────────────────────────┘
       6/4 ratio (default)
```

```mdx
---
layout: sidedImage
image: https://picsum.photos/800/600
---

## About This Image

Description text on the other side.
```

| Prop       | Type                  | Default   | Description                                    |
| ---------- | --------------------- | --------- | ---------------------------------------------- |
| `image`    | `string`              | —         | Image URL                                      |
| `position` | `"left"` \| `"right"` | `"right"` | Which side the image appears on                |
| `ratio`    | `string`              | `"6/4"`   | Column ratio as `"left/right"` (e.g., `"7/3"`) |

---

## fullImage

Full-bleed background image with text overlay and optional dimming.

```
┌──────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░  image  ░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░ ┌──────────────┐ ░░░░░░░ │
│ ░░░░░░ │ Text overlay  │ ░░░░░░░ │
│ ░░░░░░ └──────────────┘ ░░░░░░░ │
└──────────────────────────────────┘
     dim: 0.5, position: bottom
```

```mdx
---
layout: fullImage
image: https://picsum.photos/1920/1080
dim: 0.5
position: bottom
---

## Dramatic Visual Slide

Text appears over the dimmed background.
```

| Prop              | Type                                | Default    | Description                       |
| ----------------- | ----------------------------------- | ---------- | --------------------------------- |
| `image`           | `string`                            | —          | Background image URL              |
| `dim`             | `number`                            | `0`        | Overlay darkness from `0` to `1`  |
| `position`        | `"top"` \| `"center"` \| `"bottom"` | `"bottom"` | Vertical alignment of the text    |
| `fit`             | `"cover"` \| `"contain"`            | `"cover"`  | CSS `background-size` behavior    |
| `backgroundColor` | `string`                            | —          | Fallback background color         |
| `padding`         | `string`                            | —          | CSS padding around the background |

---

## bigNumber

Highlight a key metric or statistic with a large prominent value.

```
┌──────────────────────────────────┐
│          Downloads (faded)       │
│                                  │
│                                  │
│            2.4M                  │
│                                  │
│     Weekly npm downloads across  │
│     the React ecosystem.         │
└──────────────────────────────────┘
```

```mdx
---
layout: bigNumber
value: "2.4M"
---

## Downloads

Weekly npm downloads across the React ecosystem.
```

| Prop    | Type     | Required | Description                                         |
| ------- | -------- | -------- | --------------------------------------------------- |
| `value` | `string` | Yes      | The big number to display (e.g., `"99%"`, `"2.4M"`) |

---

## default3

Content with decorative hexagonal patterns on one side.

```
┌──────────────────────────────────┐
│                        │ ⬡  ⬡  ⬡ │
│  # Layout Title        │  ⬡  ⬡   │
│                        │ ⬡  ⬡  ⬡ │
│  Content here.         │  ⬡  ⬡   │
│                        │ ⬡  ⬡  ⬡ │
└──────────────────────────────────┘
      position: right
```

```mdx
---
layout: default3
position: right
---

# Layout Title

Content with decorative hexagons on the side.
```

| Prop       | Type                  | Default | Description                       |
| ---------- | --------------------- | ------- | --------------------------------- |
| `position` | `"left"` \| `"right"` | —       | Which side the hexagons appear on |

---

## twoColumn

Two equal columns with an optional full-width heading. Use the `<Column>`
component to mark right-column content.

```
┌──────────────────────────────────┐
│  ## Heading (full width)         │
│ ─────────────────────────────── │
│                │                 │
│  Left column   │  Right column   │
│  content       │  content        │
│                │                 │
└──────────────────────────────────┘
```

```mdx
---
layout: twoColumn
---

import { Column } from "@gpichot/spectacle-deck";

## Heading (spans full width)

Left column content goes here.

<Column>

Right column content goes here.

</Column>
```
