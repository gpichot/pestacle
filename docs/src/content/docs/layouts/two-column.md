---
title: twoColumn
description: Split content into two equal columns with an optional heading.
---

The `twoColumn` layout splits content into two side-by-side columns. Use the
`<Column>` component to designate which content goes into the second column.

## Usage

```mdx
---
layout: twoColumn
---

import { Column } from "@gpichot/spectacle-deck";

## Heading (spans full width)

Left column content goes here.

<Column>

Right column content goes here.

</Column>
```

## Behavior

- The **first heading** is extracted and placed as a full-width header above
  both columns
- Content wrapped in `<Column>` goes to the right column
- Everything else stays in the left column
- Both columns are equal width with a `2rem` gap
