---
title: Timeline
description: A stepped horizontal timeline component.
---

`Timeline` displays a horizontal sequence of events revealed one at a time as
you step through the slide.

```
 Step 1:
 ┌─────────┐
 │  2019   │
 │ ⬡───────┤ (line animating...)
 │ Hooks!  │
 └─────────┘

 Step 2:
 ┌─────────┐         ┌─────────┐
 │  2019   │ (faded) │  2022   │
 │ ⬡───────┼─────────┤ ⬡       │
 │ Hooks!  │         │ React18 │
 └─────────┘         └─────────┘

 Step 3: (all visible, past items faded)
 ┌─────────┐         ┌─────────┐         ┌─────────┐
 │  2019   │ (faded) │  2022   │ (faded) │  2024   │
 │ ⬡───────┼─────────┤ ⬡───────┼─────────┤ ⬡       │
 │ Hooks!  │         │ React18 │         │  RSC    │
 └─────────┘         └─────────┘         └─────────┘
```

## Usage

```mdx
import { Timeline, TimelineItem } from "@gpichot/spectacle-deck";

<Timeline>
  <TimelineItem title="2019">React Hooks released.</TimelineItem>
  <TimelineItem title="2022">React 18 with Concurrent features.</TimelineItem>
  <TimelineItem title="2024">React Server Components mature.</TimelineItem>
</Timeline>
```

Press **right arrow** to reveal each item, then to advance to the next slide.

## Props

### Timeline

| Prop          | Type     | Default | Description                                              |
| ------------- | -------- | ------- | -------------------------------------------------------- |
| `activeIndex` | `number` | —       | Manually control which item is active (bypasses stepper) |

### TimelineItem

| Prop    | Type     | Description                                        |
| ------- | -------- | -------------------------------------------------- |
| `title` | `string` | Label shown above the timeline node (e.g., a year) |
