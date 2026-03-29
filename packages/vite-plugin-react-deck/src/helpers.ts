import { dark, green, light, purple, solarizedLight } from "./themes";

const themes = {
  dark,
  green,
  light,
  purple,
  "solarized-light": solarizedLight,
} as const;

export interface DeckMeta {
  name: string;
  path: string;
  title?: string;
  author?: string;
  date?: string;
  description?: string;
  slideCount: number;
}

export function createDecksIndexFile() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Pestacle - Decks</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>* { margin: 0; padding: 0; box-sizing: border-box; }</style>
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
  decks: DeckMeta[];
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

function DeckCard({ deck }) {
  const [hovered, setHovered] = useState(false);
  const title = deck.title || deck.name;
  const hasMeta = deck.author || deck.slideCount > 0;

  return (
    <a
      href={deck.path}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        borderRadius: 16,
        backgroundColor: hovered ? "${secondary}18" : "${secondary}0a",
        border: hovered ? "1px solid ${secondary}88" : "1px solid ${secondary}22",
        color: "${primary}",
        textDecoration: "none",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.2)"
          : "0 2px 8px rgba(0,0,0,0.1)",
        minHeight: 140,
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          marginBottom: "0.5rem",
          lineHeight: 1.3,
          color: "${primary}",
        }}>
          {title}
        </div>
        {deck.description && (
          <div style={{
            fontSize: "0.875rem",
            opacity: 0.6,
            lineHeight: 1.5,
            marginBottom: "0.75rem",
          }}>
            {deck.description}
          </div>
        )}
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
        marginTop: "auto",
      }}>
        {deck.author && (
          <span style={{
            fontSize: "0.8rem",
            opacity: 0.5,
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {deck.author}
          </span>
        )}
        {deck.slideCount > 0 && (
          <span style={{
            fontSize: "0.8rem",
            opacity: 0.5,
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            {deck.slideCount} slide{deck.slideCount !== 1 ? "s" : ""}
          </span>
        )}
        {deck.date && (
          <span style={{
            fontSize: "0.8rem",
            opacity: 0.5,
          }}>
            {deck.date}
          </span>
        )}
      </div>
    </a>
  );
}

function DecksPage() {
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const filtered = decks.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      (d.title || "").toLowerCase().includes(q) ||
      (d.author || "").toLowerCase().includes(q) ||
      (d.description || "").toLowerCase().includes(q)
    );
  });

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "${tertiary}",
      color: "${primary}",
      fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      <div style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "4rem 2rem 3rem",
      }}>
        <div style={{ marginBottom: "3rem" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.75rem",
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="${secondary}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              margin: 0,
              background: "linear-gradient(135deg, ${secondary}, ${primary})",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Pestacle</h1>
          </div>
          <p style={{
            fontSize: "1rem",
            opacity: 0.5,
            margin: 0,
          }}>{decks.length} presentation{decks.length !== 1 ? "s" : ""} available</p>
        </div>

        <div style={{
          position: "relative",
          marginBottom: "2rem",
        }}>
          <svg
            width="18" height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="${primary}"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.4,
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search presentations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            autoFocus
            style={{
              width: "100%",
              padding: "0.875rem 1rem 0.875rem 2.75rem",
              fontSize: "1rem",
              borderRadius: 12,
              border: searchFocused ? "2px solid ${secondary}" : "2px solid ${secondary}33",
              backgroundColor: "${secondary}08",
              color: "${primary}",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s ease, background-color 0.2s ease",
            }}
          />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}>
          {filtered.map((deck) => (
            <DeckCard key={deck.path} deck={deck} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "4rem 2rem",
            opacity: 0.4,
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1rem" }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p style={{ fontSize: "1.1rem" }}>No presentations matching &ldquo;{search}&rdquo;</p>
          </div>
        )}
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
  deckTheme,
  config,
}: {
  slidePath: string;
  theme: keyof typeof themes;
  /** Theme override from the deck's frontmatter. Can be a built-in theme name or a custom module path. */
  deckTheme?: string;
  config: { layoutsFile: string | undefined; transition?: string };
}) {
  const resolvedThemeName = deckTheme ?? theme;
  const isBuiltinTheme = resolvedThemeName in themes;
  const isCustomThemePath =
    !isBuiltinTheme &&
    (resolvedThemeName.startsWith("./") ||
      resolvedThemeName.startsWith("../") ||
      resolvedThemeName.startsWith("/"));

  if (!isBuiltinTheme && !isCustomThemePath) {
    const available = Object.keys(themes).join(", ");
    throw new Error(
      `Theme "${resolvedThemeName}" not found. Available built-in themes: ${available}. ` +
        `For custom themes, use a relative path (e.g. "./pestacle/themes/my-theme").`,
    );
  }

  const layoutImport = config.layoutsFile
    ? `import layouts from "${config.layoutsFile}";`
    : "import { layouts } from '@gpichot/spectacle-deck';";

  const themeCode = isBuiltinTheme
    ? `const theme = ${JSON.stringify(themes[resolvedThemeName as keyof typeof themes])};`
    : `import { themeTokens as _customThemeTokens } from "${resolvedThemeName}";\nconst theme = { themeTokens: _customThemeTokens };`;

  return `import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { Deck } from '@gpichot/spectacle-deck';
import '@gpichot/spectacle-deck/index.css';
${layoutImport};

import deck from "${slidePath}";
${themeCode}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Deck deck={deck} theme={theme} layouts={layouts}${config.transition ? ` transition="${config.transition}"` : ""} />
  </StrictMode>
)

let link = document.createElement('link')
link.rel = 'stylesheet'
link.type = 'text/css'
link.href =  'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css'
document.head.appendChild(link)
`;
}
