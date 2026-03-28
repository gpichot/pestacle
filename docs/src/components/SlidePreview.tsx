import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackLayout,
} from "@codesandbox/sandpack-react";

const DECK_ENTRY = `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Deck, layouts } from "@gpichot/spectacle-deck";
import "@fontsource/bitter/400.css";

// Import your slides
import { slides, metadata } from "./slides";

const theme = {
  themeTokens: {
    colors: {
      primary: "#ffffff",
      secondary: "#F530EC",
      tertiary: "#2B135A",
    },
  },
};

const deck = { metadata, slides };

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Deck deck={deck} theme={theme} layouts={layouts} transition="fade" />
  </StrictMode>
);
`;

const INDEX_HTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

const DEFAULT_SLIDES = `import React from "react";

// Each slide is a React component + optional metadata
function Slide0() {
  return (
    <>
      <h1>Welcome to Pestacle</h1>
      <p>Edit this code to see changes live.</p>
    </>
  );
}

function Slide1() {
  return (
    <>
      <h2>Second Slide</h2>
      <p>Use arrow keys to navigate between slides.</p>
      <ul>
        <li>Supports all React components</li>
        <li>Keyboard navigation built-in</li>
        <li>Try editing the code on the left</li>
      </ul>
    </>
  );
}

function Slide2() {
  return (
    <>
      <h2>Layouts</h2>
      <p>
        Set the <code>layout</code> in metadata to change how content is
        positioned.
      </p>
    </>
  );
}

export const metadata = { title: "My Deck" };
export const slides = [
  { metadata: { layout: "centered" }, slideComponent: Slide0 },
  { metadata: {}, slideComponent: Slide1 },
  { metadata: { layout: "centered" }, slideComponent: Slide2 },
];
`;

interface SlidePreviewProps {
  code?: string;
  title?: string;
}

export default function SlidePreview({
  code,
  title = "Slide Preview",
}: SlidePreviewProps) {
  return (
    <div className="sandpack-container">
      {title && <div className="sandpack-title">{title}</div>}
      <SandpackProvider
        template="react"
        theme="dark"
        files={{
          "/App.js": { code: DECK_ENTRY, hidden: true },
          "/slides.js": { code: code || DEFAULT_SLIDES, active: true },
          "/public/index.html": { code: INDEX_HTML, hidden: true },
        }}
        customSetup={{
          dependencies: {
            "@gpichot/spectacle-deck": "1.13.0",
            "@mdx-js/react": "^3.1.1",
            "@fontsource/bitter": "^5.2.10",
            "react-syntax-highlighter": "^15.6.1",
            "@react-spring/web": "^9.7.5",
            "react-is": "^19.0.0",
          },
        }}
        options={{
          externalResources: [
            "https://fonts.googleapis.com/css2?family=Bitter:wght@300;400;500;700&display=swap",
          ],
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor
            showLineNumbers
            showTabs={false}
            style={{ minHeight: "400px" }}
          />
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton
            style={{ minHeight: "400px" }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
