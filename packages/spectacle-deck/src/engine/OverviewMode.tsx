import { MDXProvider } from "@mdx-js/react";
import React from "react";

import customComponents from "../components/map";
import { SlideWrapper } from "../SlideWrapper";
import type { SlideType } from "./Deck";
import { DeckContext, useDeck } from "./DeckContext";

const componentsMap = {
  ...customComponents,
  wrapper: SlideWrapper,
};

function SlideThumbnail({
  slide,
  index,
  isActive,
  onClick,
}: {
  slide: SlideType;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const deck = useDeck();
  const Component = slide.slideComponent;

  // Create a mock context for the thumbnail:
  // - stepIndex set high so all Stepper content is fully revealed
  // - registerStepper/unregisterStepper are no-ops to avoid interfering with the real deck
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
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "relative",
        border: isActive
          ? "3px solid var(--color-primary, #fff)"
          : "3px solid transparent",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        padding: 0,
        background: "var(--color-tertiary, #1a1a2e)",
        aspectRatio: "16 / 9",
        width: "100%",
        outline: "none",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        boxShadow: isActive
          ? "0 0 0 2px var(--color-primary, #fff)"
          : "0 2px 8px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = "var(--color-secondary, #888)";
          e.currentTarget.style.transform = "scale(1.03)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = "transparent";
          e.currentTarget.style.transform = "scale(1)";
        }
      }}
    >
      {/* Scaled-down slide content — inherits theme colors via CSS variables */}
      <div
        className="pestacle-slide-container"
        style={{
          width: "100vw",
          height: "calc(100vw * 9 / 16)",
          transform: "scale(var(--thumbnail-scale, 0.2))",
          transformOrigin: "top left",
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2cqh 3cqw",
          boxSizing: "border-box",
          overflow: "hidden",
          background: "var(--color-tertiary, #1a1a2e)",
          color: "var(--color-primary, #fff)",
          containerType: "size",
          containerName: "slide",
        }}
      >
        <DeckContext.Provider value={thumbnailContext}>
          <MDXProvider components={componentsMap}>
            <Component />
          </MDXProvider>
        </DeckContext.Provider>
      </div>

      {/* Slide number label */}
      <div
        style={{
          position: "absolute",
          bottom: "4px",
          right: "8px",
          color: "rgba(255,255,255,0.7)",
          fontSize: "0.75rem",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 600,
          zIndex: 1,
        }}
      >
        {index + 1}
      </div>
    </button>
  );
}

export function OverviewMode({
  slides,
  onSelectSlide,
  onClose,
}: {
  slides: SlideType[];
  onSelectSlide: (index: number) => void;
  onClose: () => void;
}) {
  const deck = useDeck();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Calculate thumbnail scale based on grid columns
  const columns = Math.min(4, Math.ceil(Math.sqrt(slides.length)));

  // Focus the active slide thumbnail on open
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeButton = container.querySelector<HTMLElement>(
      `[data-slide-index="${deck.slideIndex}"]`,
    );
    activeButton?.scrollIntoView({ block: "center", behavior: "instant" });
  }, [deck.slideIndex]);

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

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.92)",
        backdropFilter: "blur(8px)",
        overflow: "auto",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          position: "sticky",
          top: 0,
          zIndex: 1,
          padding: "0.5rem 0",
          background: "rgba(0, 0, 0, 0.92)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.85rem",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Overview — {slides.length} slides (press Esc or O to close)
        </span>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            fontSize: "1.5rem",
            lineHeight: 1,
            padding: "0.25em",
          }}
          aria-label="Close overview"
        >
          ✕
        </button>
      </div>

      {/* Slide grid */}
      <div
        style={
          {
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "1.5rem",
            "--thumbnail-scale": `${1 / (columns * 1.15)}`,
          } as React.CSSProperties
        }
      >
        {slides.map((slide, index) => (
          <div key={index} data-slide-index={index}>
            <SlideThumbnail
              slide={slide}
              index={index}
              isActive={index === deck.slideIndex}
              onClick={() => onSelectSlide(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
