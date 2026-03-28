---
title: Animations
description: Built-in animation components for slide content.
---

Pestacle includes animation components powered by `react-spring`. All animations
trigger when the element enters the viewport (i.e., when the slide is shown).

:::tip Set `transition: none` in the slide frontmatter when using animations to
avoid competing with slide-level transitions. :::

## FadeIn

Fades content in from a direction.

```mdx
import { FadeIn } from "@gpichot/spectacle-deck";

<FadeIn>Content fades in from below.</FadeIn>

<FadeIn direction="left" delay={300}>
  Fades in from the left after 300ms.
</FadeIn>
```

| Prop        | Type                                                    | Default | Description                  |
| ----------- | ------------------------------------------------------- | ------- | ---------------------------- |
| `direction` | `"up"` \| `"down"` \| `"left"` \| `"right"` \| `"none"` | `"up"`  | Direction to fade in from    |
| `distance`  | `number`                                                | `20`    | Translate distance in pixels |
| `delay`     | `number`                                                | `0`     | Delay in ms                  |
| `duration`  | `number`                                                | `400`   | Animation duration in ms     |

---

## ScaleIn

Scales content in from a starting scale value.

```mdx
import { ScaleIn } from "@gpichot/spectacle-deck";

<ScaleIn>Scales from 0 to full size.</ScaleIn>

<ScaleIn from={0.5} delay={400}>
  Scales from 50% with a delay.
</ScaleIn>
```

| Prop       | Type     | Default | Description                                    |
| ---------- | -------- | ------- | ---------------------------------------------- |
| `from`     | `number` | `0`     | Initial scale (0 = invisible, 0.5 = half size) |
| `delay`    | `number` | `0`     | Delay in ms                                    |
| `duration` | `number` | `400`   | Animation duration in ms                       |

---

## StaggerChildren

Animates each direct child sequentially with a stagger delay.

```mdx
import { StaggerChildren } from "@gpichot/spectacle-deck";

<StaggerChildren stagger={150} direction="up">

**First item**

**Second item**

**Third item**

</StaggerChildren>
```

| Prop        | Type                                                    | Default | Description                      |
| ----------- | ------------------------------------------------------- | ------- | -------------------------------- |
| `stagger`   | `number`                                                | `100`   | Delay between each child in ms   |
| `delay`     | `number`                                                | `0`     | Initial delay before first child |
| `duration`  | `number`                                                | `400`   | Duration per child in ms         |
| `direction` | `"up"` \| `"down"` \| `"left"` \| `"right"` \| `"none"` | `"up"`  | Direction to fade from           |
| `distance`  | `number`                                                | `20`    | Translate distance in pixels     |

---

## TypeWriter

Types out text character by character.

```mdx
import { TypeWriter } from "@gpichot/spectacle-deck";

<TypeWriter speed={40}>
  Hello, I am typing this out character by character!
</TypeWriter>
```

| Prop     | Type      | Default | Description                      |
| -------- | --------- | ------- | -------------------------------- |
| `speed`  | `number`  | `50`    | Milliseconds per character       |
| `delay`  | `number`  | `0`     | Delay before typing starts in ms |
| `cursor` | `boolean` | `true`  | Show a blinking cursor           |

---

## AnimatedCounter

Animates a number from one value to another.

```mdx
import { AnimatedCounter } from "@gpichot/spectacle-deck";

<AnimatedCounter to={42} duration={2000} />

<AnimatedCounter to={1500} prefix="+" suffix="ms" />
```

| Prop       | Type     | Default | Description                          |
| ---------- | -------- | ------- | ------------------------------------ |
| `to`       | `number` | —       | Target number                        |
| `from`     | `number` | `0`     | Starting number                      |
| `duration` | `number` | `1500`  | Animation duration in ms             |
| `delay`    | `number` | `0`     | Delay in ms                          |
| `decimals` | `number` | `0`     | Decimal places                       |
| `prefix`   | `string` | `""`    | Text before the number (e.g., `"$"`) |
| `suffix`   | `string` | `""`    | Text after the number (e.g., `"%"`)  |

---

## ProgressRing

An animated circular progress indicator.

```mdx
import { ProgressRing } from "@gpichot/spectacle-deck";

<ProgressRing value={87} size={140} strokeWidth={10}>
  <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>87%</div>
</ProgressRing>
```

| Prop          | Type        | Default                    | Description                       |
| ------------- | ----------- | -------------------------- | --------------------------------- |
| `value`       | `number`    | —                          | Progress from 0 to 100            |
| `size`        | `number`    | `120`                      | Ring size in pixels               |
| `strokeWidth` | `number`    | `8`                        | Stroke width in pixels            |
| `color`       | `string`    | `"var(--color-secondary)"` | Ring color                        |
| `trackColor`  | `string`    | `"rgba(255,255,255,0.1)"`  | Background track color            |
| `duration`    | `number`    | `1000`                     | Animation duration in ms          |
| `delay`       | `number`    | `0`                        | Delay in ms                       |
| `children`    | `ReactNode` | —                          | Content in the center of the ring |

---

## Spotlight

Dims the entire slide except for the wrapped content. Useful for drawing
attention to a specific element.

```mdx
import { Spotlight } from "@gpichot/spectacle-deck";

<Spotlight>
  This content is highlighted while the rest of the slide is dimmed.
</Spotlight>
```

| Prop         | Type      | Default | Description                          |
| ------------ | --------- | ------- | ------------------------------------ |
| `active`     | `boolean` | `true`  | Whether the spotlight effect is on   |
| `dimOpacity` | `number`  | `0.7`   | Opacity of the dimming overlay (0-1) |
