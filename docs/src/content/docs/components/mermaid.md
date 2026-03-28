---
title: Mermaid
description: Render Mermaid diagrams in your slides.
---

`Mermaid` renders [Mermaid](https://mermaid.js.org/) diagrams directly in your
slides. The diagram is rendered client-side and automatically uses your theme
colors.

## Usage

```mdx
import { Mermaid } from "@gpichot/spectacle-deck";

<Mermaid
  chart={`graph LR
  A[MDX File] --> B[Vite Plugin]
  B --> C[Remark/Rehype]
  C --> D[React Components]
  D --> E[Spectacle Deck]
`}
/>
```

## Props

| Prop    | Type     | Default  | Description                        |
| ------- | -------- | -------- | ---------------------------------- |
| `chart` | `string` | —        | Mermaid diagram definition string  |
| `width` | `string` | `"100%"` | CSS width of the diagram container |

## Supported Diagram Types

Any Mermaid diagram syntax works: flowcharts, sequence diagrams, class diagrams,
state diagrams, Gantt charts, pie charts, etc.

## Theme Integration

The Mermaid renderer reads your CSS variables (`--color-primary`,
`--color-secondary`, `--color-tertiary`) and maps them to the Mermaid dark theme
for consistent visuals.
