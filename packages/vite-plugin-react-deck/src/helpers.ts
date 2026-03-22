import * as themes from "./themes";

export function createDecksIndexFile() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Decks</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="__decks.tsx"></script>
  </body>
</html>
`;
}

export function createDecksPageFile({
  decks,
  theme,
}: {
  decks: { name: string; path: string }[];
  theme: string;
}) {
  const themeModule = themes[theme as keyof typeof themes];
  const colors = themeModule?.themeTokens?.colors;
  const primary = colors?.primary ?? "#ffffff";
  const secondary = colors?.secondary ?? "#F49676";
  const tertiary = colors?.tertiary ?? "#042F3B";

  return `import React, { StrictMode, useState } from "react";
import * as ReactDOM from "react-dom/client";

const decks = ${JSON.stringify(decks)};

function DecksPage() {
  const [search, setSearch] = useState("");
  const filtered = decks.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "${tertiary}",
      color: "${primary}",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      padding: "3rem 2rem",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "0.5rem",
          color: "${secondary}",
        }}>Decks</h1>
        <p style={{
          fontSize: "1rem",
          opacity: 0.7,
          marginBottom: "2rem",
        }}>{decks.length} deck{decks.length !== 1 ? "s" : ""} available</p>
        <input
          type="text"
          placeholder="Search decks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            fontSize: "1rem",
            borderRadius: 8,
            border: "2px solid ${secondary}44",
            backgroundColor: "${tertiary}",
            color: "${primary}",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: "1.5rem",
          }}
          onFocus={(e) => e.target.style.borderColor = "${secondary}"}
          onBlur={(e) => e.target.style.borderColor = "${secondary}44"}
        />
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {filtered.map((deck) => (
            <li key={deck.path}>
              <a
                href={deck.path}
                style={{
                  display: "block",
                  padding: "1rem 1.25rem",
                  marginBottom: "0.75rem",
                  borderRadius: 8,
                  backgroundColor: "${secondary}11",
                  border: "1px solid ${secondary}33",
                  color: "${primary}",
                  textDecoration: "none",
                  fontSize: "1.15rem",
                  fontWeight: 500,
                  transition: "background-color 0.15s, border-color 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "${secondary}22";
                  e.currentTarget.style.borderColor = "${secondary}";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "${secondary}11";
                  e.currentTarget.style.borderColor = "${secondary}33";
                }}
              >{deck.name}</a>
            </li>
          ))}
          {filtered.length === 0 && (
            <li style={{ opacity: 0.5, textAlign: "center", padding: "2rem" }}>
              No decks matching "{search}"
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <DecksPage />
  </StrictMode>
);
`;
}

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
  config: { layoutsFile: string | undefined };
}) {
  if (!themes[theme]) {
    throw new Error(`Theme ${theme} not found`);
  }
  const themeObject = themes[theme];

  const layoutImport = config.layoutsFile
    ? `import layouts from "${config.layoutsFile}";`
    : "import { layouts } from '@gpichot/spectacle-deck';";
  return `import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { Deck } from '@gpichot/spectacle-deck';
${layoutImport};

import deck from "${slidePath}";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Deck deck={deck} theme={${JSON.stringify(themeObject)}} layouts={layouts} />
  </StrictMode>
)

let link = document.createElement('link')
link.rel = 'stylesheet'
link.type = 'text/css'
link.href =  'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css'
document.head.appendChild(link)
`;
}
