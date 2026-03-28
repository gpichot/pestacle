---
title: Mermaid
description: Render Mermaid diagrams in your slides.
---

`Mermaid` renders [Mermaid](https://mermaid.js.org/) diagrams directly in your
slides. Rendered client-side with your theme colors.

```
 ┌─────────────────────────────────────┐
 │                                     │
 │  ┌──────────┐    ┌──────────────┐   │
 │  │ MDX File │───▶│ Vite Plugin  │   │
 │  └──────────┘    └──────┬───────┘   │
 │                         │           │
 │                         ▼           │
 │               ┌──────────────┐      │
 │               │ React Slides │      │
 │               └──────────────┘      │
 │                                     │
 └─────────────────────────────────────┘
```

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

Any Mermaid syntax works: flowcharts, sequence diagrams, class diagrams, Gantt
charts, etc.

## Props

| Prop    | Type     | Default  | Description                |
| ------- | -------- | -------- | -------------------------- |
| `chart` | `string` | —        | Mermaid diagram definition |
| `width` | `string` | `"100%"` | CSS width of the container |
