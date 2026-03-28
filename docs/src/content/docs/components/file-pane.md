---
title: FilePane
description: A named file container for displaying code.
---

`FilePane` wraps content (typically a code block) and labels it with a filename.

```
 ┌─ example.tsx ──────────────┐
 │                             │
 │  const App = () => (        │
 │    <h1>Hello</h1>           │
 │  );                         │
 │  export default App;        │
 │                             │
 └─────────────────────────────┘
```

## Usage

```mdx
import { FilePane } from "@gpichot/spectacle-deck";

<FilePane name="example.tsx">

\`\`\`tsx const App = () => <h1>Hello</h1>; export default App; \`\`\`

</FilePane>
```

## Props

| Prop       | Type     | Description                            |
| ---------- | -------- | -------------------------------------- |
| `name`     | `string` | Filename displayed as a label          |
| `minWidth` | `string` | Minimum width for the pane (CSS value) |
