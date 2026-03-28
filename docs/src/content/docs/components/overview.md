---
title: Components Overview
description: All built-in components available in Pestacle slides.
sidebar:
  order: 0
---

Pestacle provides a set of components you can import and use directly in your
MDX slides. All components are exported from `@gpichot/spectacle-deck`.

```mdx
import {
  Timeline,
  TimelineItem,
  HorizontalList,
} from "@gpichot/spectacle-deck";
```

## Presentation Components

| Component                                        | Description                               |
| ------------------------------------------------ | ----------------------------------------- |
| [`Timeline`](/components/timeline/)              | Stepped horizontal timeline               |
| [`HorizontalList`](/components/horizontal-list/) | Grid of items revealed step by step       |
| [`ItemsColumn`](/components/items-column/)       | Vertical list revealed one item at a time |
| [`IconBox`](/components/icon-box/)               | Content box with a large icon header      |
| [`FilePane`](/components/file-pane/)             | Named file container for code             |
| [`Doc` / `DocItem`](/components/doc/)            | Documentation links block                 |
| [`Mermaid`](/components/mermaid/)                | Render Mermaid diagrams                   |
| [`QRCode`](/components/qr-code/)                 | Generate QR codes                         |

## Animation Components

| Component                                    | Description                               |
| -------------------------------------------- | ----------------------------------------- |
| [`FadeIn`](/components/animations/)          | Fade + translate on enter                 |
| [`ScaleIn`](/components/animations/)         | Scale up on enter                         |
| [`StaggerChildren`](/components/animations/) | Sequentially animate children             |
| [`TypeWriter`](/components/animations/)      | Typewriter text effect                    |
| [`AnimatedCounter`](/components/animations/) | Animate a number from A to B              |
| [`ProgressRing`](/components/animations/)    | Animated circular progress bar            |
| [`Spotlight`](/components/animations/)       | Dim everything except the wrapped content |

## Morph Components

| Component                                         | Description                              |
| ------------------------------------------------- | ---------------------------------------- |
| [`Morph`](/reference/morph-and-transitions/)      | Mark an element for cross-slide morphing |
| [`MorphImage`](/reference/morph-and-transitions/) | Convenience wrapper for morphing images  |

## Layout Helpers

These components are used inside specific layouts to mark content regions:

| Component | Used With                                           |
| --------- | --------------------------------------------------- |
| `Side`    | [`side` layout](/reference/layouts/#side)           |
| `Column`  | [`twoColumn` layout](/reference/layouts/#twocolumn) |
