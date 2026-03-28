---
title: side
description: Two-column layout with a main area and a sidebar panel.
---

The `side` layout splits the slide into a main content column and a sidebar. Use
the `<Side>` component to mark which content goes into the sidebar.

## Usage

```mdx
---
layout: side
---

import { Side } from "@gpichot/spectacle-deck";

## Main Content

This appears in the primary column.

<Side>

### Sidebar

Extra context, notes, or supplementary info.

</Side>
```

## Frontmatter Props

| Prop       | Type                  | Default   | Description                       |
| ---------- | --------------------- | --------- | --------------------------------- |
| `position` | `"left"` \| `"right"` | `"right"` | Which side the sidebar appears on |

## Behavior

- Content wrapped in `<Side>` is rendered in a darker sidebar panel
- Everything else stays in the main column
- Set `position: left` to flip the columns
