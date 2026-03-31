import { getOrCreateStyleElement } from "./dom-helpers";

/**
 * Injects global CSS (theme variables, base styles) into the document.
 * Replaces styled-components' createGlobalStyle.
 */
export function injectGlobalStyles(options: {
  cssVariables: string;
  fontFamily: string;
  fontSize: string;
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
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }
    body {
      background: ${options.backgroundColor};
      color: ${options.color};
      font-family: ${options.fontFamily};
      font-size: 24px;
    }
    .pestacle-slide-container > * {
      font-size: ${options.fontSize};
    }
    @media print {
      html, body, #root {
        overflow: visible;
        width: auto;
        height: auto;
      }
      body {
        background: #fff !important;
        color: #000 !important;
      }
      * {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  `;
}
