---
title: mainSection
description: Opening title slide with a decorative side image.
---

The `mainSection` layout is intended for the opening slide of a deck. It
displays content on the left with a decorative image on the right.

## Usage

```mdx
---
layout: mainSection
---

# **Talk Title** {morph="title"}

_Subtitle or tagline_ {morph="subtitle"}
```

## Behavior

- Content is padded on the left side
- A built-in decorative image fills the right side
- Suitable for the very first slide of a presentation

:::note This layout uses a bundled image. To customize it,
[override the layout](/guides/custom-layouts/) with your own component. :::
