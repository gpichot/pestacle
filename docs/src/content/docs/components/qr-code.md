---
title: QR Code
description: Generate QR codes in your slides.
---

There are two ways to add QR codes: via the directive syntax (simpler) or via
the `QRCode` component (more control).

## Directive Syntax

The easiest way — just use the `:qrcode` directive:

```mdx
:qrcode[https://example.com/feedback]
```

## Component Usage

For more control over size, import the component:

```mdx
import { QRCode } from "@gpichot/spectacle-deck";

<QRCode url="https://example.com/feedback" size="lg" />
```

## Props

| Prop   | Type                                 | Default | Description       |
| ------ | ------------------------------------ | ------- | ----------------- |
| `url`  | `string`                             | —       | The URL to encode |
| `size` | `"xs"` \| `"sm"` \| `"md"` \| `"lg"` | `"md"`  | QR code size      |

### Size Map

| Size | Pixels |
| ---- | ------ |
| `xs` | 64px   |
| `sm` | 128px  |
| `md` | 256px  |
| `lg` | 512px  |

## Theme Integration

The QR code uses your theme's `primary` color as the background and `secondary`
color as the foreground, keeping it visually consistent with your deck.
