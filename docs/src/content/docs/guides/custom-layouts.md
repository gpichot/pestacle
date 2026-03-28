---
title: Custom Layouts
description: Override built-in layouts or create entirely new ones.
---

Layouts are React components that control how slide content is positioned.
Pestacle provides 11 built-in layouts, and you can override any of them or add
new ones.

## Overriding Layouts

Create a `pestacle/layouts.ts` file at the root of your project (next to
`vite.config.mts`):

```ts
import { layouts as baseLayouts } from "@gpichot/spectacle-deck";

const layouts = {
  ...baseLayouts,
  // Override mainSection to use the centered layout instead
  mainSection: baseLayouts.centered,
};

export default layouts;
```

The plugin detects `pestacle/layouts.ts` (or `.tsx`, `.js`, `.jsx`)
automatically. No extra configuration needed.

## Creating a Layout from Scratch

A layout is a React component that receives `children` (the slide content) and
any frontmatter fields as props:

```tsx
// pestacle/layouts.ts
import type React from "react";
import { layouts as baseLayouts } from "@gpichot/spectacle-deck";

function SplashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {children}
    </div>
  );
}

export default {
  ...baseLayouts,
  splash: SplashLayout,
};
```

Then use it in your MDX:

```mdx
---
layout: splash
---

# Big Announcement
```

## Layout Props from Frontmatter

Any key-value pair in the slide frontmatter is passed as a prop to the layout
component:

```mdx
---
layout: myLayout
color: red
count: 3
---

Content here.
```

```tsx
function MyLayout({
  children,
  color,
  count,
}: {
  children: React.ReactNode;
  color?: string;
  count?: number;
}) {
  return (
    <div style={{ borderColor: color }}>
      <span>Item {count}</span>
      {children}
    </div>
  );
}
```

## Default Layout

When no `layout` is specified in the frontmatter, the slide renders with the
default base layout — a vertically centered column with horizontal padding.
