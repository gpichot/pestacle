---
title: FilePane
description: A named file container for displaying code.
---

`FilePane` wraps content (typically a code block) and labels it with a filename.

## Usage

```mdx
import { FilePane } from "@gpichot/spectacle-deck";

<FilePane name="example.tsx">

\`\`\`tsx const App = () => <h1>Hello</h1>; export default App; \`\`\`

</FilePane>
```

## Props

| Prop       | Type     | Required | Description                            |
| ---------- | -------- | -------- | -------------------------------------- |
| `name`     | `string` | Yes      | Filename displayed as a label          |
| `minWidth` | `string` | No       | Minimum width for the pane (CSS value) |
