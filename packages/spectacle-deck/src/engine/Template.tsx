import React from "react";

import { toggleFullscreen } from "./dom-helpers";

/**
 * Slide template overlay: progress bar + fullscreen button.
 * Pure HTML/CSS — no Spectacle dependency.
 */
export function Template({
  slideNumber,
  numberOfSlides,
}: {
  slideNumber: number;
  numberOfSlides: number;
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

  return (
    <div
      style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 }}
    >
      <div style={{ padding: "0 0 0.5em 0.7em" }}>
        <button
          type="button"
          onClick={toggleFullscreen}
          style={{
            background: "none",
            border: "none",
            color: "#ffffff77",
            cursor: "pointer",
            fontSize: "1.2rem",
            padding: "0.25em",
            lineHeight: 1,
          }}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? "⊡" : "⛶"}
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ width: "100%", height: "4px", background: "#ffffff11" }}>
        <div
          style={{
            width: `${percentage}%`,
            height: "2px",
            background: "#ffffff77",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
