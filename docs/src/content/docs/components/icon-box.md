---
title: IconBox
description: A content box with a large icon header.
---

`IconBox` displays a large icon above text content — useful for feature
highlights or category cards.

```
     ┌─────────────┐
     │              │
     │     📦       │
     │   (60px)     │
     │              │
     │   Package    │
     │  A box with  │
     │  an icon.    │
     └─────────────┘
```

## Usage

```mdx
import { IconBox } from "@gpichot/spectacle-deck";

<IconBox icon="📦">

#### Package

A box with an icon above text content.

</IconBox>
```

## Props

| Prop   | Type        | Description                                         |
| ------ | ----------- | --------------------------------------------------- |
| `icon` | `ReactNode` | The icon to display (emoji, SVG, or any React node) |
