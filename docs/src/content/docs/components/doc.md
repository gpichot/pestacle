---
title: Doc & DocItem
description: Display documentation links in a styled block.
---

`Doc` and `DocItem` create a styled documentation links block — useful for
pointing audiences to resources.

```
 ┌──────────────────────────────┐
 │  ▸ React Docs                │
 │  ▸ MDX Docs                  │
 │                              │
 │  📄 Documentation ↗          │
 └──────────────────────────────┘
```

## Usage

```mdx
import { Doc, DocItem } from "@gpichot/spectacle-deck";

<Doc label="Documentation" link="https://example.com">
  <DocItem label="React Docs" link="https://react.dev" />
  <DocItem label="MDX Docs" link="https://mdxjs.com" />
</Doc>
```

All links open in a new tab.

## Props

### Doc

| Prop    | Type     | Description     |
| ------- | -------- | --------------- |
| `label` | `string` | Main link label |
| `link`  | `string` | Main link URL   |

### DocItem

| Prop    | Type     | Description |
| ------- | -------- | ----------- |
| `label` | `string` | Link text   |
| `link`  | `string` | Link URL    |
