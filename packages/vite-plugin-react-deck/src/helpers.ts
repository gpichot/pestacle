import * as themes from "./themes";

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

export function createAppDeckFile({
  slidePath,
  theme,
  config,
}: {
  slidePath: string;
  theme: string;
  config: { layoutsFile: string };
}) {
  if (!themes[theme]) {
    throw new Error(`Theme ${theme} not found`);
  }
  const themeObject = themes[theme];
  return `import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { Deck } from '@gpichot/spectacle-deck';
import layouts from "${config.layoutsFile}";

import deck from "${slidePath}";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Deck deck={deck} theme={${JSON.stringify(themeObject)}} layouts={layouts} />
  </StrictMode>
)`;
}
