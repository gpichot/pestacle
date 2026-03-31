import React from "react";

import { toggleFullscreen } from "./dom-helpers";

/**
 * Slide template overlay: progress bar + fullscreen button + controls.
 * Pure HTML/CSS — no Spectacle dependency.
 */
export function Template({
  slideNumber,
  numberOfSlides,
  onToggleExport,
  onTogglePrint,
  onToggleCommandPalette,
}: {
  slideNumber: number;
  numberOfSlides: number;
  onToggleExport?: () => void;
  onTogglePrint?: () => void;
  onToggleCommandPalette?: () => void;
}) {
  const percentage = (slideNumber / numberOfSlides) * 100;
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    function onChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const buttonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "#ffffff77",
    cursor: "pointer",
    fontSize: "max(1.2cqw, 16px)",
    padding: "max(0.5cqw, 8px)",
    lineHeight: 1,
    // Ensure minimum 44px touch target
    minWidth: "44px",
    minHeight: "44px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div
      style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 }}
    >
      <div
        style={{
          padding: "0 0 0.5cqh 0.7cqw",
          display: "flex",
          alignItems: "center",
          gap: "0.3cqw",
        }}
      >
        <button
          type="button"
          onClick={toggleFullscreen}
          style={buttonStyle}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? "⊡" : "⛶"}
        </button>
        {onToggleExport && (
          <button
            type="button"
            onClick={onToggleExport}
            style={buttonStyle}
            title="Export as PDF (Ctrl+Shift+E)"
            aria-label="Export as PDF"
          >
            ⤓
          </button>
        )}
        {onTogglePrint && (
          <button
            type="button"
            onClick={onTogglePrint}
            style={buttonStyle}
            title="Print slides (Ctrl+Shift+P)"
            aria-label="Print slides"
          >
            ⎙
          </button>
        )}
        {onToggleCommandPalette && (
          <button
            type="button"
            onClick={onToggleCommandPalette}
            style={buttonStyle}
            title="Command palette (Ctrl+K)"
            aria-label="Command palette"
          >
            ⌘
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ width: "100%", height: "0.3cqh", background: "#ffffff11" }}>
        <div
          style={{
            width: `${percentage}%`,
            height: "0.15cqh",
            background: "#ffffff77",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
