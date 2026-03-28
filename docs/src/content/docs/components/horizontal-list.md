---
title: HorizontalList
description: A grid of items revealed step by step.
---

`HorizontalList` displays items in a responsive grid, revealing them one at a
time.

```
 Step 1:                     Step 2:                     Step 3:
 ┌────────┐                  ┌────────┐ ┌────────┐      ┌────────┐ ┌────────┐ ┌────────┐
 │  ⬡ 1   │                  │  ⬡ 1   │ │  ⬡ 2   │      │  ⬡ 1   │ │  ⬡ 2   │ │  ⬡ 3   │
 │ Step 1  │                  │ Step 1  │ │ Step 2  │      │ Step 1  │ │ Step 2  │ │ Step 3  │
 │ Define  │                  │ Define  │ │ Add     │      │ Define  │ │ Add     │ │Present │
 │ slides  │                  │ slides  │ │ layouts │      │ slides  │ │ layouts │ │  it!   │
 └────────┘                  └────────┘ └────────┘      └────────┘ └────────┘ └────────┘
                              (faded)                     (faded)    (faded)
```

## Usage

```mdx
import { HorizontalList, HorizontalListItem } from "@gpichot/spectacle-deck";

<HorizontalList columns={3}>
  <HorizontalListItem title="Step 1">
    Define your slides in MDX.
  </HorizontalListItem>
  <HorizontalListItem title="Step 2">
    Add layouts and components.
  </HorizontalListItem>
  <HorizontalListItem title="Step 3">
    Present with keyboard navigation.
  </HorizontalListItem>
</HorizontalList>
```

## Props

### HorizontalList

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| `columns` | `number` | `3`     | Number of grid columns |

### HorizontalListItem

| Prop    | Type     | Description                            |
| ------- | -------- | -------------------------------------- |
| `title` | `string` | Title displayed at the top of the item |
