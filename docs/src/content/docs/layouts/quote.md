---
title: quote
description: Display a blockquote with attribution.
---

The `quote` layout styles a blockquote prominently with an author attribution
and optional source link.

## Usage

```mdx
---
layout: quote
author: React Team
sourceUrl: https://react.dev
---

> React is a JavaScript library for building user interfaces.
```

## Frontmatter Props

| Prop        | Type     | Required | Description                  |
| ----------- | -------- | -------- | ---------------------------- |
| `author`    | `string` | Yes      | The attribution name         |
| `sourceUrl` | `string` | No       | URL for the attribution link |

## Behavior

- The `> blockquote` is extracted and displayed prominently
- The author/source renders as a clickable link below the quote
- The slide must contain exactly one blockquote
