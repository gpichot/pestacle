---
title: sidedCode
description: Code block on one side, text content on the other.
---

The `sidedCode` layout automatically splits your slide into a text column and a
code column. Any fenced code block is placed on one side with a dark background,
while text content stays on the other.

## Usage

```mdx
---
layout: sidedCode
---

## Explaining the Code

Here's what this component does:

- It accepts a `name` prop
- It renders a greeting

\`\`\`tsx function Greeting({ name }: { name: string }) { return <h1>Hello,
{name}!</h1>; } \`\`\`
```

## Frontmatter Props

| Prop       | Type                  | Default   | Description                    |
| ---------- | --------------------- | --------- | ------------------------------ |
| `position` | `"left"` \| `"right"` | `"right"` | Which side the code appears on |

## Behavior

- Code blocks (`pre > code`) are extracted and rendered on the code side with a
  dark `#1d2021` background
- Text content stays on the opposite side
- Works with any language-highlighted code block
