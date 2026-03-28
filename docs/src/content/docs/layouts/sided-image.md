---
title: sidedImage
description: Image on one side, text content on the other.
---

The `sidedImage` layout displays an image alongside text content in a
split-column arrangement.

## Usage

```mdx
---
layout: sidedImage
image: https://picsum.photos/800/600
---

## About This Image

Description text on the other side of the image.
```

## Frontmatter Props

| Prop       | Type                  | Default   | Description                                    |
| ---------- | --------------------- | --------- | ---------------------------------------------- |
| `image`    | `string`              | —         | URL of the image to display                    |
| `position` | `"left"` \| `"right"` | `"right"` | Which side the image appears on                |
| `ratio`    | `string`              | `"6/4"`   | Column ratio as `"left/right"` (e.g., `"7/3"`) |

## Behavior

- If no `image` frontmatter is provided, the layout looks for an `<Image>`
  component in the slide content
- The `ratio` prop controls how space is divided between text and image columns
- The image column has a white background
