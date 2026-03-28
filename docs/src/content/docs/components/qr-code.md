---
title: QR Code
description: Generate QR codes in your slides.
---

Two ways to add QR codes: the `:qrcode` directive (simpler) or the `QRCode`
component (more control).

```
          ┌─────────────────┐
          │ ▓▓▓░░▓▓▓░░▓▓▓  │
          │ ▓  ░▓▓░▓▓░  ▓  │
          │ ▓▓▓░▓░░▓░▓▓▓  │
          │ ░░░▓░▓▓░▓░░░  │
          │ ▓▓▓░░▓▓▓░░▓▓▓  │
          └─────────────────┘
            256px (default)
```

## Directive Syntax

The easiest way:

```mdx
:qrcode[https://example.com/feedback]
```

## Component Usage

For more control over size:

```mdx
import { QRCode } from "@gpichot/spectacle-deck";

<QRCode url="https://example.com/feedback" size="lg" />
```

## Props

| Prop   | Type                                 | Default | Description       |
| ------ | ------------------------------------ | ------- | ----------------- |
| `url`  | `string`                             | —       | The URL to encode |
| `size` | `"xs"` \| `"sm"` \| `"md"` \| `"lg"` | `"md"`  | QR code size      |

**Size map:** `xs` = 64px, `sm` = 128px, `md` = 256px, `lg` = 512px

The QR code uses your theme's `primary` color as background and `secondary` as
foreground.
