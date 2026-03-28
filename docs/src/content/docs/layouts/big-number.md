---
title: bigNumber
description: Highlight a key metric or statistic.
---

The `bigNumber` layout renders a large, prominent value with supporting text —
ideal for statistics, KPIs, or key metrics.

## Usage

```mdx
---
layout: bigNumber
value: "2.4M"
---

## Downloads

Weekly npm downloads across the React ecosystem.
```

## Frontmatter Props

| Prop    | Type     | Required | Description                                         |
| ------- | -------- | -------- | --------------------------------------------------- |
| `value` | `string` | Yes      | The big number to display (e.g., `"99%"`, `"2.4M"`) |

## Behavior

- The `value` is rendered in large, bold text at the center
- If a heading is present, it appears at the top of the slide at reduced opacity
- Remaining content appears as a caption below the value
