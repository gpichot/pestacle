---
title: fullImage
description: Full-bleed background image with text overlay.
---

The `fullImage` layout displays an image as a full-bleed background with
optional text overlay and dimming.

## Usage

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

## Frontmatter Props

| Prop              | Type                                | Default    | Description                                     |
| ----------------- | ----------------------------------- | ---------- | ----------------------------------------------- |
| `image`           | `string`                            | —          | Background image URL                            |
| `dim`             | `number`                            | `0`        | Overlay darkness from `0` (none) to `1` (black) |
| `position`        | `"top"` \| `"center"` \| `"bottom"` | `"bottom"` | Vertical alignment of the text overlay          |
| `fit`             | `"cover"` \| `"contain"`            | `"cover"`  | CSS `background-size` behavior                  |
| `backgroundColor` | `string`                            | —          | Fallback or accent background color             |
| `margin`          | `string`                            | —          | CSS margin around the background                |
| `padding`         | `string`                            | —          | CSS padding around the background               |

## Behavior

- The image fills the entire slide as a CSS background
- When `dim > 0`, a semi-transparent black overlay is placed between the image
  and text
- Text floats over the background, positioned according to `position`
- If no `image` prop is set, the layout extracts the first `<Image>` component
  from the content
