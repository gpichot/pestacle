---
title: Doc & DocItem
description: Display documentation links in a styled block.
---

`Doc` and `DocItem` create a styled documentation links block — useful for
pointing audiences to resources.

## Usage

```mdx
import { Doc, DocItem } from "@gpichot/spectacle-deck";

<Doc label="Documentation" link="https://example.com">
  <DocItem label="React Docs" link="https://react.dev" />
  <DocItem label="MDX Docs" link="https://mdxjs.com" />
</Doc>
```

## Props

### `Doc`

| Prop       | Type        | Required | Description        |
| ---------- | ----------- | -------- | ------------------ |
| `label`    | `string`    | Yes      | Main link label    |
| `link`     | `string`    | Yes      | Main link URL      |
| `children` | `ReactNode` | No       | `DocItem` children |

### `DocItem`

| Prop    | Type     | Required | Description |
| ------- | -------- | -------- | ----------- |
| `label` | `string` | Yes      | Link text   |
| `link`  | `string` | Yes      | Link URL    |

All links open in a new tab.
