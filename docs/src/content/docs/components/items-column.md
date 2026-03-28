---
title: ItemsColumn
description: Vertical list of items revealed one at a time.
---

`ItemsColumn` stacks its children vertically and reveals them one by one as you
step through the slide. Uses React View Transitions for smooth appearance.

## Usage

```mdx
import { ItemsColumn } from "@gpichot/spectacle-deck";

<ItemsColumn>

**First point** - appears on first step

**Second point** - appears on second step

**Third point** - appears on third step

</ItemsColumn>
```

## Props

| Prop       | Type            | Description                                     |
| ---------- | --------------- | ----------------------------------------------- |
| `style`    | `CSSProperties` | Additional inline styles on the container       |
| `children` | `ReactNode`     | Items to reveal (each direct child is one step) |

## Behavior

- Each direct child is treated as a separate step
- Items transition from `opacity: 0` to `opacity: 1`
- All items remain visible once revealed (they don't fade back)
- Uses `alwaysVisible` stepper mode — items stay visible after stepping past
  them
