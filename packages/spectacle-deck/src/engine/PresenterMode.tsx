import { MDXProvider } from "@mdx-js/react";
import React from "react";

import customComponents from "../components/map";
import { SlideWrapper } from "../SlideWrapper";
import type { SlideType } from "./Deck";
import { DeckContext, useDeck } from "./DeckContext";
import { NotesContext } from "./NotesContext";

const componentsMap = {
  ...customComponents,
  wrapper: SlideWrapper,
};

/**
 * Renders a slide thumbnail for the presenter view.
 * Uses a mock DeckContext so Stepper components render correctly.
 */
function SlidePreview({
  slide,
  slideIndex,
  stepIndex,
  label,
  flex,
  onNotesCollected,
}: {
  slide: SlideType;
  slideIndex: number;
  stepIndex: number;
  label: string;
  flex: number;
  onNotesCollected?: (notes: React.ReactNode) => void;
}) {
  const deck = useDeck();
  const Component = slide.slideComponent;

  const previewContext = React.useMemo(
    () => ({
      ...deck,
      slideIndex,
      stepIndex,
      registerStepper: () => {},
      unregisterStepper: () => {},
    }),
    [deck, slideIndex, stepIndex],
  );

  const content = (
    <DeckContext.Provider value={previewContext}>
      <MDXProvider components={componentsMap}>
        <Component />
      </MDXProvider>
    </DeckContext.Provider>
  );

  return (
    <div
      style={{
        flex,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.5)",
          fontFamily: "system-ui, sans-serif",
          marginBottom: "0.5rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          border: "2px solid rgba(255,255,255,0.15)",
          background: "var(--bg-base, #1a1a2e)",
          minHeight: 0,
        }}
      >
        {/* Scaled-down slide */}
        <div
          style={{
            width: "1920px",
            height: "1080px",
            transform: "scale(var(--presenter-slide-scale, 0.3))",
            transformOrigin: "top left",
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 3rem",
            boxSizing: "border-box",
            overflow: "hidden",
            color: "var(--text-base, #fff)",
          }}
        >
          {onNotesCollected ? (
            <NotesContext.Provider value={onNotesCollected}>
              {content}
            </NotesContext.Provider>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Timer display for presenter mode.
 */
function PresenterTimer() {
  const [elapsed, setElapsed] = React.useState(0);
  const [running, setRunning] = React.useState(true);
  const startTimeRef = React.useRef(Date.now());
  const pausedAtRef = React.useRef(0);

  React.useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const toggle = () => {
    if (running) {
      pausedAtRef.current = elapsed;
      setRunning(false);
    } else {
      startTimeRef.current = Date.now() - pausedAtRef.current * 1000;
      setRunning(true);
    }
  };

  const reset = () => {
    startTimeRef.current = Date.now();
    pausedAtRef.current = 0;
    setElapsed(0);
    setRunning(true);
  };

  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;
  const timeStr =
    hours > 0
      ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const buttonStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "rgba(255,255,255,0.7)",
    borderRadius: "4px",
    padding: "0.25rem 0.5rem",
    cursor: "pointer",
    fontSize: "0.75rem",
    fontFamily: "system-ui, sans-serif",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        fontFamily: "'SF Mono', 'Fira Code', monospace",
      }}
    >
      <span
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: running ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
          minWidth: "5ch",
          textAlign: "center",
        }}
      >
        {timeStr}
      </span>
      <button type="button" onClick={toggle} style={buttonStyle}>
        {running ? "Pause" : "Resume"}
      </button>
      <button type="button" onClick={reset} style={buttonStyle}>
        Reset
      </button>
    </div>
  );
}

/**
 * Full-screen presenter mode overlay.
 * Shows current slide, next slide, speaker notes, and a timer.
 */
export function PresenterMode({
  slides,
  onClose,
}: {
  slides: SlideType[];
  onClose: () => void;
}) {
  const deck = useDeck();
  const currentSlide = slides[deck.slideIndex];
  const nextSlide = slides[deck.slideIndex + 1];
  const [notes, setNotes] = React.useState<React.ReactNode>(null);

  // Reset notes on slide change, then let the NotesContext collector repopulate
  const notesSlideRef = React.useRef(deck.slideIndex);
  if (notesSlideRef.current !== deck.slideIndex) {
    notesSlideRef.current = deck.slideIndex;
    // Will be set by the SlidePreview's onNotesCollected callback
  }

  const handleNotesCollected = React.useCallback((n: React.ReactNode) => {
    setNotes(n);
  }, []);

  // Clear notes when slide changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally re-run on slideIndex change
  React.useEffect(() => {
    setNotes(null);
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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "#111",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, sans-serif",
        color: "#fff",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Presenter Mode
          </span>
          <span
            style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 600,
            }}
          >
            Slide {deck.slideIndex + 1} / {deck.slideCount}
          </span>
        </div>

        <PresenterTimer />

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Press Esc or P to close
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              fontSize: "1.2rem",
              lineHeight: 1,
              padding: "0.25em",
            }}
            aria-label="Close presenter mode"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main content */}
      <div
        style={
          {
            flex: 1,
            display: "flex",
            gap: "1rem",
            padding: "1rem",
            minHeight: 0,
            "--presenter-slide-scale": "0.35",
          } as React.CSSProperties
        }
      >
        {/* Left: slides */}
        <div
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            minHeight: 0,
          }}
        >
          {/* Current slide */}
          {currentSlide && (
            <SlidePreview
              slide={currentSlide}
              slideIndex={deck.slideIndex}
              stepIndex={deck.stepIndex}
              label={`Current Slide (${deck.slideIndex + 1})`}
              flex={3}
              onNotesCollected={handleNotesCollected}
            />
          )}

          {/* Next slide */}
          {nextSlide ? (
            <SlidePreview
              slide={nextSlide}
              slideIndex={deck.slideIndex + 1}
              stepIndex={0}
              label={`Next Slide (${deck.slideIndex + 2})`}
              flex={2}
            />
          ) : (
            <div
              style={{
                flex: 2,
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "system-ui, sans-serif",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Next Slide
              </div>
              <div
                style={{
                  flex: 1,
                  borderRadius: "8px",
                  border: "2px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "1rem",
                }}
              >
                End of presentation
              </div>
            </div>
          )}
        </div>

        {/* Right: notes */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "system-ui, sans-serif",
              marginBottom: "0.5rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Speaker Notes
          </div>
          <div
            style={{
              flex: 1,
              borderRadius: "8px",
              border: "2px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
              padding: "1rem",
              overflow: "auto",
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.85)",
              minHeight: 0,
            }}
          >
            {notes || (
              <span
                style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}
              >
                No notes for this slide
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
