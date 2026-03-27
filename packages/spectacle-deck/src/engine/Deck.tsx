import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { createGlobalStyle } from "styled-components";

import { createCssVariables } from "../colors";
import customComponents from "../components/map";
import { type LayoutComponent, PestacleProvider } from "../context";
import Layouts from "../layouts";
import { SlideWrapper } from "../SlideWrapper";
import baseTheme from "../theme";
import { DeckContext } from "./DeckContext";
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

  const nav = useNavigation({
    slideCount,
    onSlideChange: (_index, direction) => {
      // Get per-slide transition or use default
      const slideT = currentSlideTransition ?? defaultTransition;
      injectTransitionStyles(slideT, direction);
    },
  });

  // Current slide's per-slide transition override
  const currentSlide = deck.slides[nav.slideIndex];
  const currentSlideTransition = currentSlide?.metadata?.transition
    ? resolveTransition(currentSlide.metadata.transition as string)
    : undefined;

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

  // CSS variables
  const GlobalStyle = React.useMemo(() => {
    const cssVariables = createCssVariables(theme.themeTokens.colors);
    return createGlobalStyle`
      :root {
        ${cssVariables}
        --font-family: ${mergedTheme.fonts.text};
      }

      /* Base slide styles */
      html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      body {
        background: ${theme.themeTokens.colors.tertiary ?? "#1a1a2e"};
        color: ${theme.themeTokens.colors.primary ?? "#ffffff"};
        font-family: ${mergedTheme.fonts.text};
      }
    `;
  }, [theme, mergedTheme]);

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
    f: () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    },
  });

  // Volume keys for remote controllers
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "AudioVolumeUp") {
        e.preventDefault();
        if (nav.slideIndex < slideCount - 1) {
          nav.skipTo({ slideIndex: nav.slideIndex + 1, stepIndex: 0 });
        }
      } else if (e.key === "AudioVolumeDown") {
        e.preventDefault();
        if (nav.slideIndex > 0) {
          nav.skipTo({ slideIndex: nav.slideIndex - 1 });
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nav.slideIndex, nav.skipTo, slideCount]);

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
            <GlobalStyle />
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
              {/* Slide content — this element has a view-transition-name so
                  the View Transitions API can capture and animate it */}
              <div
                style={{
                  viewTransitionName: "slide-content",
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

              {/* Template overlay (progress bar, fullscreen) */}
              <Template
                slideNumber={nav.slideIndex + 1}
                numberOfSlides={slideCount}
              />
            </div>
          </MDXProvider>
        </PestacleProvider>
      </DeckContext.Provider>
    </React.StrictMode>
  );
}
