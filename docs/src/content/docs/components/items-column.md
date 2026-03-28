---
title: ItemsColumn
description: Vertical list of items revealed one at a time.
---

`ItemsColumn` stacks its children vertically and reveals them one by one as you
step through the slide.

```
 Step 1:          Step 2:          Step 3:
 ┌──────────┐     ┌──────────┐     ┌──────────┐
 │ ■ First  │     │ ■ First  │     │ ■ First  │
 │          │     │ ■ Second │     │ ■ Second │
 │          │     │          │     │ ■ Third  │
 └──────────┘     └──────────┘     └──────────┘
```

## Usage

```mdx
import { ItemsColumn } from "@gpichot/spectacle-deck";

<ItemsColumn>

**First point** — appears on first step

**Second point** — appears on second step

**Third point** — appears on third step

</ItemsColumn>
```

Each direct child is treated as a separate step. Items stay visible once
revealed.
