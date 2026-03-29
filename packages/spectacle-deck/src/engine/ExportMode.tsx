import { MDXProvider } from "@mdx-js/react";
import React from "react";

import customComponents from "../components/map";
import { SlideWrapper } from "../SlideWrapper";
import type { SlideType } from "./Deck";
import { DeckContext, useDeck } from "./DeckContext";
import { getOrCreateStyleElement } from "./dom-helpers";

const componentsMap = {
  ...customComponents,
  wrapper: SlideWrapper,
};

const PRINT_STYLES_ID = "pestacle-print-styles";

function injectPrintStyles() {
  const el = getOrCreateStyleElement(PRINT_STYLES_ID);
  el.textContent = `
    @media print {
      body { margin: 0; padding: 0; background: white !important; }
      .pestacle-export-slide {
        break-inside: avoid;
        page-break-inside: avoid;
        break-after: page;
        page-break-after: always;
      }
      .pestacle-export-slide:last-child {
        break-after: auto;
        page-break-after: auto;
      }
      .pestacle-export-header,
      .pestacle-export-actions { display: none !important; }
    }
    @page {
      size: landscape;
      margin: 0;
    }
  `;
}

function removePrintStyles() {
  document.getElementById(PRINT_STYLES_ID)?.remove();
}

function ExportSlide({ slide, index }: { slide: SlideType; index: number }) {
  const deck = useDeck();
  const Component = slide.slideComponent;

  const thumbnailContext = React.useMemo(
    () => ({
      ...deck,
      slideIndex: index,
      stepIndex: Number.MAX_SAFE_INTEGER,
      stepCount: Number.MAX_SAFE_INTEGER,
      registerStepper: () => {},
      unregisterStepper: () => {},
    }),
    [deck, index],
  );

  return (
    <div
      className="pestacle-export-slide pestacle-slide-container"
      style={{
        width: "100vw",
        height: "56.25vw", // 16:9 aspect ratio
        maxHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "var(--color-tertiary, #1a1a2e)",
        color: "var(--color-primary, #fff)",
        flexShrink: 0,
        containerType: "size",
        containerName: "slide",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2cqh 3cqw",
          boxSizing: "border-box",
        }}
      >
        <DeckContext.Provider value={thumbnailContext}>
          <MDXProvider components={componentsMap}>
            <Component />
          </MDXProvider>
        </DeckContext.Provider>
      </div>

      {/* Slide number */}
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          right: "16px",
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.85rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {index + 1}
      </div>
    </div>
  );
}

export type ExportModeVariant = "export" | "print";

export function ExportMode({
  slides,
  variant,
  onClose,
}: {
  slides: SlideType[];
  variant: ExportModeVariant;
  onClose: () => void;
}) {
  // Inject print styles
  React.useEffect(() => {
    injectPrintStyles();
    return () => removePrintStyles();
  }, []);

  // Close on Escape
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () =>
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [onClose]);

  // Auto-trigger print dialog for print mode
  React.useEffect(() => {
    if (variant === "print") {
      const timer = setTimeout(() => window.print(), 300);
      return () => clearTimeout(timer);
    }
  }, [variant]);

  const title = variant === "print" ? "Print Mode" : "Export Mode";
  const description =
    variant === "print"
      ? "Print dialog will open automatically. Press Esc to go back."
      : "Use your browser's Print (Ctrl+P / Cmd+P) to save as PDF. Press Esc to go back.";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1500,
        background: "#111",
        overflow: "auto",
      }}
    >
      {/* Header */}
      <div
        className="pestacle-export-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          background: "rgba(17, 17, 17, 0.95)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div>
          <span style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>
            {title}
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "13px",
              marginLeft: "16px",
            }}
          >
            {description}
          </span>
        </div>
        <div
          className="pestacle-export-actions"
          style={{ display: "flex", gap: "8px" }}
        >
          {variant === "export" && (
            <button
              type="button"
              onClick={() => window.print()}
              style={{
                background: "var(--color-primary, #6366f1)",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "6px 16px",
                fontSize: "13px",
                fontFamily: "inherit",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Save as PDF
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "6px 16px",
              fontSize: "13px",
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>

      {/* All slides */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {slides.map((slide, index) => (
          <ExportSlide key={index} slide={slide} index={index} />
        ))}
      </div>
    </div>
  );
}
