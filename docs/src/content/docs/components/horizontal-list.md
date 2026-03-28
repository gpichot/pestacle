---
title: HorizontalList
description: A grid of items revealed step by step.
---

`HorizontalList` displays items in a responsive grid, revealing them one at a
time as you step through the slide.

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

### `HorizontalList`

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| `columns` | `number` | `3`     | Number of grid columns |

### `HorizontalListItem`

| Prop       | Type        | Required | Description                            |
| ---------- | ----------- | -------- | -------------------------------------- |
| `title`    | `string`    | Yes      | Title displayed at the top of the item |
| `children` | `ReactNode` | Yes      | Content of the item                    |

## Behavior

- Items appear one by one using the built-in `Stepper`
- The current item has full opacity; previously revealed items fade to 0.7
- Each item shows a numbered hexagon badge
