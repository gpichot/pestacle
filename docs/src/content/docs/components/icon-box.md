---
title: IconBox
description: A content box with a large icon header.
---

`IconBox` displays a large icon above text content. Useful for feature
highlights or category cards.

## Usage

```mdx
import { IconBox } from "@gpichot/spectacle-deck";

<IconBox icon="📦">

#### Package

A box with an icon above text content.

</IconBox>
```

## Props

| Prop       | Type        | Required | Description                                         |
| ---------- | ----------- | -------- | --------------------------------------------------- |
| `icon`     | `ReactNode` | Yes      | The icon to display (emoji, SVG, or any React node) |
| `children` | `ReactNode` | Yes      | Content below the icon                              |
