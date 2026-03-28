---
title: Timeline
description: A stepped horizontal timeline component.
---

`Timeline` displays a horizontal sequence of events that are revealed one at a
time as you step through the slide.

## Usage

```mdx
import { Timeline, TimelineItem } from "@gpichot/spectacle-deck";

<Timeline>
  <TimelineItem title="2019">React Hooks released.</TimelineItem>
  <TimelineItem title="2022">React 18 with Concurrent features.</TimelineItem>
  <TimelineItem title="2024">React Server Components mature.</TimelineItem>
</Timeline>
```

## How It Works

- Each `TimelineItem` is revealed one step at a time using the built-in
  `Stepper`
- Past items are shown at reduced opacity (0.5)
- The current item is fully opaque
- Future items are hidden
- A connecting line animates between items

Press the **right arrow** to advance through items, then to the next slide.

## Props

### `Timeline`

| Prop          | Type     | Default | Description                                              |
| ------------- | -------- | ------- | -------------------------------------------------------- |
| `activeIndex` | `number` | —       | Manually control which item is active (bypasses stepper) |

### `TimelineItem`

| Prop       | Type        | Required | Description                                        |
| ---------- | ----------- | -------- | -------------------------------------------------- |
| `title`    | `string`    | Yes      | Label shown above the timeline node (e.g., a year) |
| `children` | `ReactNode` | Yes      | Content shown below the timeline node              |
