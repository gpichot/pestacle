import { MDXProvider } from "@mdx-js/react";
import React, { ViewTransition } from "react";

import { createCssVariables } from "../colors";
import customComponents from "../components/map";
import { type LayoutComponent, PestacleProvider } from "../context";
import Layouts from "../layouts";
import { SlideWrapper } from "../SlideWrapper";
import baseTheme from "../theme";
import { DeckContext } from "./DeckContext";
import { toggleFullscreen } from "./dom-helpers";
import { injectGlobalStyles } from "./global.css";
import { OverviewMode } from "./OverviewMode";
import { Template } from "./Template";
import {
  fadeTransition,
  injectTransitionStyles,
  resolveTransition,
} from "./transitions";
import { useKeyboard } from "./useKeyboard";
import { useNavigation } from "./useNavigation";

export type SlideType = {
  metadata: Record<string, unknown> & { layout?: string; transition?: string };
  slideComponent: React.ElementType<unknown>;
};

export type DeckType = {
  metadata: Record<string, unknown>;
  slides: SlideType[];
};

interface ThemeOptions {
  themeTokens: {
    colors: Record<string, string>;
    fonts?: {
      header?: string;
      text?: string;
    };
  };
}

const componentsMap = {
  ...customComponents,
  wrapper: SlideWrapper,
};

export function Deck({
  deck,
  theme,
  layouts = Layouts,
  transition = "fade",
}: {
  deck: DeckType;
  theme: ThemeOptions;
  layouts?: Record<string, LayoutComponent>;
  /** Default slide transition name: "fade", "slide", "drop", "morph", "none" */
  transition?: string;
}) {
  const slideCount = deck.slides.length;

  // Resolve the default transition
  const defaultTransition = resolveTransition(transition) ?? fadeTransition;

  // Current slide transition is needed by onSlideChange, so we track it via ref
  const currentSlideTransitionRef = React.useRef(
    deck.slides[0]?.metadata?.transition
      ? resolveTransition(deck.slides[0].metadata.transition as string)
      : undefined,
  );

  const onSlideChange = React.useCallback(
    (_index: number, direction: "forward" | "backward") => {
      const slideT = currentSlideTransitionRef.current ?? defaultTransition;
      injectTransitionStyles(slideT, direction);
    },
    [defaultTransition],
  );

  const nav = useNavigation({
    slideCount,
    onSlideChange,
  });

  // Current slide's per-slide transition override
  const currentSlide = deck.slides[nav.slideIndex];
  const currentSlideTransition = currentSlide?.metadata?.transition
    ? resolveTransition(currentSlide.metadata.transition as string)
    : undefined;
  currentSlideTransitionRef.current = currentSlideTransition;

  // Inject initial transition styles
  React.useEffect(() => {
    injectTransitionStyles(
      currentSlideTransition ?? defaultTransition,
      "forward",
    );
  }, [currentSlideTransition, defaultTransition]);

  // Set document title
  React.useEffect(() => {
    document.title = (deck.metadata.title as string) || "Untitled";
  }, [deck.metadata.title]);

  // Merge theme
  const mergedTheme = React.useMemo(() => {
    const fonts = {
      ...baseTheme.fonts,
      ...(theme.themeTokens.fonts ?? {}),
    };
    return {
      ...baseTheme,
      ...theme.themeTokens,
      fonts,
    };
  }, [theme]);

  // Inject global CSS variables and base styles
  React.useEffect(() => {
    injectGlobalStyles({
      cssVariables: createCssVariables(theme.themeTokens.colors),
      fontFamily: mergedTheme.fonts.text ?? "",
      fontSize: mergedTheme.fontSizes?.text ?? "24px",
      backgroundColor: theme.themeTokens.colors.tertiary ?? "#1a1a2e",
      color: theme.themeTokens.colors.primary ?? "#ffffff",
    });
  }, [theme, mergedTheme]);

  // Overview mode
  const [overviewMode, setOverviewMode] = React.useState(false);
  const toggleOverview = React.useCallback(() => {
    setOverviewMode((v) => !v);
  }, []);

  const handleSelectSlide = React.useCallback(
    (index: number) => {
      nav.skipTo({ slideIndex: index, stepIndex: 0 });
      setOverviewMode(false);
    },
    [nav],
  );

  // Keyboard navigation
  useKeyboard({
    ArrowRight: nav.stepForward,
    ArrowDown: nav.stepForward,
    " ": nav.stepForward,
    ArrowLeft: nav.stepBackward,
    ArrowUp: nav.stepBackward,
    PageDown: nav.stepForward,
    PageUp: nav.stepBackward,
    // Shift+Arrow: skip steps, jump directly to next/prev slide
    "Shift+ArrowRight": () => {
      if (nav.slideIndex < slideCount - 1) {
        nav.skipTo({ slideIndex: nav.slideIndex + 1, stepIndex: 0 });
      }
    },
    "Shift+ArrowLeft": () => {
      if (nav.slideIndex > 0) {
        nav.skipTo({ slideIndex: nav.slideIndex - 1 });
      }
    },
    // Home/End
    Home: () => nav.skipTo({ slideIndex: 0 }),
    End: () => nav.skipTo({ slideIndex: slideCount - 1 }),
    // Fullscreen
    f: toggleFullscreen,
    // Overview mode: Cmd+Shift+O (Mac) / Ctrl+Shift+O (other)
    "Shift+Meta+O": toggleOverview,
    "Shift+Ctrl+O": toggleOverview,
    // Volume keys for remote controllers
    AudioVolumeUp: () => {
      if (nav.slideIndex < slideCount - 1) {
        nav.skipTo({ slideIndex: nav.slideIndex + 1, stepIndex: 0 });
      }
    },
    AudioVolumeDown: () => {
      if (nav.slideIndex > 0) {
        nav.skipTo({ slideIndex: nav.slideIndex - 1 });
      }
    },
  });

  // Build context value
  const contextValue = React.useMemo(
    () => ({
      slideIndex: nav.slideIndex,
      stepIndex: nav.stepIndex,
      slideCount,
      stepCount: nav.stepCount,
      stepForward: nav.stepForward,
      stepBackward: nav.stepBackward,
      skipTo: nav.skipTo,
      direction: nav.direction,
      theme: {
        colors: theme.themeTokens.colors,
        fonts: mergedTheme.fonts,
      },
      registerStepper: nav.registerStepper,
      unregisterStepper: nav.unregisterStepper,
    }),
    [nav, slideCount, theme.themeTokens.colors, mergedTheme.fonts],
  );

  const Component = currentSlide?.slideComponent;

  return (
    <React.StrictMode>
      <DeckContext.Provider value={contextValue}>
        <PestacleProvider layouts={layouts}>
          <MDXProvider components={componentsMap}>
            <div
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Slide content wrapped in ViewTransition for cross-slide morphing */}
              <ViewTransition name="slide-content">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem 3rem",
                    boxSizing: "border-box",
                  }}
                >
                  {Component && <Component />}
                </div>
              </ViewTransition>

              {/* Template overlay (progress bar, fullscreen) */}
              <Template
                slideNumber={nav.slideIndex + 1}
                numberOfSlides={slideCount}
              />

              {/* Overview mode */}
              {overviewMode && (
                <OverviewMode
                  slides={deck.slides}
                  onSelectSlide={handleSelectSlide}
                  onClose={toggleOverview}
                />
              )}
            </div>
          </MDXProvider>
        </PestacleProvider>
      </DeckContext.Provider>
    </React.StrictMode>
  );
}
