import { getOrCreateStyleElement } from "./dom-helpers";

/**
 * Injects global CSS (theme variables, base styles) into the document.
 * Replaces styled-components' createGlobalStyle.
 */
export function injectGlobalStyles(options: {
  cssVariables: string;
  fontFamily: string;
  backgroundColor: string;
  color: string;
}) {
  const el = getOrCreateStyleElement("pestacle-global-styles");
  el.textContent = `
    :root {
      ${options.cssVariables}
      --font-family: ${options.fontFamily};
    }
    html, body, #root {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    body {
      background: ${options.backgroundColor};
      color: ${options.color};
      font-family: ${options.fontFamily};
    }
  `;
}
