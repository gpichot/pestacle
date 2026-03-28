---
title: centered
description:
  Vertically and horizontally centered content with heading at the bottom.
---

The `centered` layout places all content in the center of the slide. If there is
a heading (h1-h3), it is moved to the bottom of the slide at reduced opacity,
letting the main content take center stage.

## Usage

```mdx
---
layout: centered
---

### Section Title

Main content appears centered.

Any components or text here.
```

## Behavior

- The **first heading** is extracted and displayed at the bottom of the slide
  with `opacity: 0.8`
- All other content is centered vertically and horizontally
- Good for: key points, component showcases, diagrams
