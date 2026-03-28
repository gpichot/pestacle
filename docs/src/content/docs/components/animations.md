---
title: Animations
description: Built-in animation components for slide content.
---

Animation components powered by `react-spring`. All trigger when the element
enters the viewport (when the slide is shown).

:::tip Set `transition: none` in the slide frontmatter when using animations to
avoid competing with slide-level transitions. :::

## FadeIn

Fades content in from a direction.

```
 Before:              After:
 ┌──────────┐         ┌──────────┐
 │           │   →     │  Hello!  │
 │    ↑      │         │          │
 │  (below)  │         │          │
 └──────────┘         └──────────┘
   opacity: 0           opacity: 1
```

```mdx
import { FadeIn } from "@gpichot/spectacle-deck";

<FadeIn>Content fades in from below.</FadeIn>

<FadeIn direction="left" delay={300}>
  Fades in from the left after 300ms.
</FadeIn>
```

| Prop        | Type                                                    | Default | Description              |
| ----------- | ------------------------------------------------------- | ------- | ------------------------ |
| `direction` | `"up"` \| `"down"` \| `"left"` \| `"right"` \| `"none"` | `"up"`  | Direction to fade from   |
| `distance`  | `number`                                                | `20`    | Translate distance in px |
| `delay`     | `number`                                                | `0`     | Delay in ms              |
| `duration`  | `number`                                                | `400`   | Duration in ms           |

---

## ScaleIn

Scales content in from a starting scale value.

```
 Before:              After:
 ┌──────────┐         ┌──────────┐
 │           │   →     │ ┌──────┐ │
 │    · ·    │         │ │ Hello│ │
 │           │         │ └──────┘ │
 └──────────┘         └──────────┘
   scale: 0             scale: 1
```

```mdx
import { ScaleIn } from "@gpichot/spectacle-deck";

<ScaleIn>Scales from 0 to full size.</ScaleIn>

<ScaleIn from={0.5} delay={400}>
  Scales from 50% with a delay.
</ScaleIn>
```

| Prop       | Type     | Default | Description                               |
| ---------- | -------- | ------- | ----------------------------------------- |
| `from`     | `number` | `0`     | Initial scale (0 = invisible, 0.5 = half) |
| `delay`    | `number` | `0`     | Delay in ms                               |
| `duration` | `number` | `400`   | Duration in ms                            |

---

## StaggerChildren

Animates each direct child sequentially with a stagger delay.

```
 t=0ms    t=150ms   t=300ms   t=450ms
 ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
 │ A   │  │ A   │  │ A   │  │ A   │
 │     │  │ B   │  │ B   │  │ B   │
 │     │  │     │  │ C   │  │ C   │
 │     │  │     │  │     │  │ D   │
 └─────┘  └─────┘  └─────┘  └─────┘
```

```mdx
import { StaggerChildren } from "@gpichot/spectacle-deck";

<StaggerChildren stagger={150} direction="up">

**First item**

**Second item**

**Third item**

</StaggerChildren>
```

| Prop        | Type                                                    | Default | Description                  |
| ----------- | ------------------------------------------------------- | ------- | ---------------------------- |
| `stagger`   | `number`                                                | `100`   | Delay between children in ms |
| `delay`     | `number`                                                | `0`     | Initial delay before first   |
| `duration`  | `number`                                                | `400`   | Duration per child in ms     |
| `direction` | `"up"` \| `"down"` \| `"left"` \| `"right"` \| `"none"` | `"up"`  | Direction to fade from       |
| `distance`  | `number`                                                | `20`    | Translate distance in px     |

---

## TypeWriter

Types out text character by character with a blinking cursor.

```
 t=0ms:    |
 t=200ms:  Hell|
 t=400ms:  Hello, wo|
 t=600ms:  Hello, world!█  (cursor blinks)
```

```mdx
import { TypeWriter } from "@gpichot/spectacle-deck";

<TypeWriter speed={40}>
  Hello, I am typing this out character by character!
</TypeWriter>
```

| Prop     | Type      | Default | Description                |
| -------- | --------- | ------- | -------------------------- |
| `speed`  | `number`  | `50`    | Milliseconds per character |
| `delay`  | `number`  | `0`     | Delay before typing starts |
| `cursor` | `boolean` | `true`  | Show a blinking cursor     |

---

## AnimatedCounter

Animates a number from one value to another.

```
 t=0ms:     0        t=500ms:   21        t=1500ms:  42
 ┌───────┐           ┌───────┐            ┌───────┐
 │   0   │    →      │  21   │    →       │  42   │
 └───────┘           └───────┘            └───────┘
```

```mdx
import { AnimatedCounter } from "@gpichot/spectacle-deck";

<AnimatedCounter to={42} duration={2000} />

<AnimatedCounter to={1500} prefix="+" suffix="ms" />
```

| Prop       | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| `to`       | `number` | —       | Target number             |
| `from`     | `number` | `0`     | Starting number           |
| `duration` | `number` | `1500`  | Duration in ms            |
| `delay`    | `number` | `0`     | Delay in ms               |
| `decimals` | `number` | `0`     | Decimal places            |
| `prefix`   | `string` | `""`    | Text before (e.g., `"$"`) |
| `suffix`   | `string` | `""`    | Text after (e.g., `"%"`)  |

---

## ProgressRing

An animated circular progress indicator with optional center content.

```
       ╭───╮
      ╱ 87% ╲
     │       │  ← animated stroke
      ╲     ╱
       ╰───╯
```

```mdx
import { ProgressRing } from "@gpichot/spectacle-deck";

<ProgressRing value={87} size={140} strokeWidth={10}>
  <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>87%</div>
</ProgressRing>
```

| Prop          | Type     | Default                    | Description            |
| ------------- | -------- | -------------------------- | ---------------------- |
| `value`       | `number` | —                          | Progress from 0 to 100 |
| `size`        | `number` | `120`                      | Ring size in pixels    |
| `strokeWidth` | `number` | `8`                        | Stroke width in pixels |
| `color`       | `string` | `"var(--color-secondary)"` | Ring color             |
| `trackColor`  | `string` | `"rgba(255,255,255,0.1)"`  | Background track color |
| `duration`    | `number` | `1000`                     | Duration in ms         |
| `delay`       | `number` | `0`                        | Delay in ms            |

---

## Spotlight

Dims the entire slide except for the wrapped content. Draws attention to a
specific element.

```
 ┌──────────────────────────────────┐
 │ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │
 │ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │
 │ ▒▒▒▒▒ ┌─────────────┐ ▒▒▒▒▒▒▒▒ │
 │ ▒▒▒▒▒ │  SPOTLIGHT   │ ▒▒▒▒▒▒▒▒ │
 │ ▒▒▒▒▒ │  content     │ ▒▒▒▒▒▒▒▒ │
 │ ▒▒▒▒▒ └─────────────┘ ▒▒▒▒▒▒▒▒ │
 │ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │
 └──────────────────────────────────┘
   dimmed overlay (opacity: 0.7)
```

```mdx
import { Spotlight } from "@gpichot/spectacle-deck";

<Spotlight>This content is highlighted while the rest is dimmed.</Spotlight>
```

| Prop         | Type      | Default | Description                          |
| ------------ | --------- | ------- | ------------------------------------ |
| `active`     | `boolean` | `true`  | Whether the spotlight effect is on   |
| `dimOpacity` | `number`  | `0.7`   | Opacity of the dimming overlay (0-1) |
