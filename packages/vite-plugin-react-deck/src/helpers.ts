export function createIndexFile({ entrypoint }: { entrypoint: string }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Title</title>

    <style>
      html {
        --code-preview-background-color: #222;
      }
    </style>

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${entrypoint}"></script>
  </body>
</html>
`;
}

export function createAppDeckFile({ slidePath }: { slidePath: string }) {
  return `import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { Deck } from '@gpichot/spectacle-deck';

import deck from "${slidePath}";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Deck deck={deck} />
  </StrictMode>
)`;
}
