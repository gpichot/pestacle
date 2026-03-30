import { MDXProvider } from "@mdx-js/react";
import React, { ViewTransition } from "react";

import { createCssVariables, type ThemeTokens } from "../colors";
import customComponents from "../components/map";
import { type LayoutComponent, PestacleProvider } from "../context";
import Layouts from "../layouts";
import { SlideWrapper } from "../SlideWrapper";
import baseTheme from "../theme";
import { type Command, CommandPalette } from "./CommandPalette";
import { DeckContext } from "./DeckContext";
import { toggleFullscreen } from "./dom-helpers";
import { ExportMode, type ExportModeVariant } from "./ExportMode";
import { injectGlobalStyles } from "./global.css";
import { OverviewMode } from "./OverviewMode";
import { PresenterMode } from "./PresenterMode";
import { getCurrentSection, SectionTitle } from "./SectionTitle";
import { Template } from "./Template";
import {
  fadeTransition,
  injectTransitionStyles,
  resolveTransition,
} from "./transitions";
import { type SyncMessage, useBroadcastSync } from "./useBroadcastSync";
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
  themeTokens: ThemeTokens;
}

const defaultTheme: ThemeOptions = {
  themeTokens: {
    text: baseTheme.text,
    bg: baseTheme.bg,
    border: baseTheme.border,
    fonts: baseTheme.fonts,
  },
};

const componentsMap = {
  ...customComponents,
  wrapper: SlideWrapper,
};

export function Deck({
  deck,
  theme = defaultTheme,
  layouts = Layouts,
  transition = "fade",
}: {
  deck: DeckType;
  theme?: ThemeOptions;
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
      cssVariables: createCssVariables(theme.themeTokens),
      fontFamily: mergedTheme.fonts.text ?? "",
      fontSize: mergedTheme.fontSizes?.text ?? "24px",
      backgroundColor: theme.themeTokens.bg.base,
      color: theme.themeTokens.text.base,
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

  // Export / Print mode
  const [exportMode, setExportMode] = React.useState<ExportModeVariant | null>(
    null,
  );
  const openExportMode = React.useCallback(() => setExportMode("export"), []);
  const openPrintMode = React.useCallback(() => setExportMode("print"), []);
  const closeExportMode = React.useCallback(() => setExportMode(null), []);

  // Command palette
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);
  const toggleCommandPalette = React.useCallback(() => {
    setCommandPaletteOpen((v) => !v);
  }, []);
  const closeCommandPalette = React.useCallback(() => {
    setCommandPaletteOpen(false);
  }, []);

  // Presenter mode
  const [presenterMode, setPresenterMode] = React.useState(false);
  const togglePresenter = React.useCallback(() => {
    setPresenterMode((v) => !v);
  }, []);
  const closePresenter = React.useCallback(() => {
    setPresenterMode(false);
  }, []);

  // BroadcastChannel sync — active when presenter mode is on
  // Also listen for sync messages when NOT in presenter mode (audience tab)
  const syncEnabledRef = React.useRef(false);
  // We always keep sync enabled so audience tabs can receive navigation
  const { broadcast } = useBroadcastSync({
    enabled: true,
    onReceive: React.useCallback(
      (msg: SyncMessage) => {
        if (msg.type === "navigate") {
          nav.skipTo({ slideIndex: msg.slideIndex, stepIndex: msg.stepIndex });
        }
      },
      [nav],
    ),
  });

  // Broadcast navigation changes when in presenter mode
  const prevNavRef = React.useRef({
    slideIndex: nav.slideIndex,
    stepIndex: nav.stepIndex,
  });
  React.useEffect(() => {
    const prev = prevNavRef.current;
    if (
      presenterMode &&
      (prev.slideIndex !== nav.slideIndex || prev.stepIndex !== nav.stepIndex)
    ) {
      broadcast({
        type: "navigate",
        slideIndex: nav.slideIndex,
        stepIndex: nav.stepIndex,
      });
    }
    prevNavRef.current = {
      slideIndex: nav.slideIndex,
      stepIndex: nav.stepIndex,
    };
  }, [presenterMode, nav.slideIndex, nav.stepIndex, broadcast]);

  // Broadcast presenter open/close
  React.useEffect(() => {
    if (presenterMode) {
      broadcast({ type: "presenter-opened" });
    } else if (syncEnabledRef.current) {
      broadcast({ type: "presenter-closed" });
    }
    syncEnabledRef.current = presenterMode;
  }, [presenterMode, broadcast]);

  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad/.test(navigator.userAgent);

  const commands: Command[] = React.useMemo(
    () => [
      {
        id: "next-slide",
        label: "Next Slide",
        shortcut: "→",
        action: nav.stepForward,
      },
      {
        id: "prev-slide",
        label: "Previous Slide",
        shortcut: "←",
        action: nav.stepBackward,
      },
      {
        id: "first-slide",
        label: "Go to First Slide",
        shortcut: "Home",
        action: () => nav.skipTo({ slideIndex: 0 }),
      },
      {
        id: "last-slide",
        label: "Go to Last Slide",
        shortcut: "End",
        action: () => nav.skipTo({ slideIndex: slideCount - 1 }),
      },
      {
        id: "overview",
        label: "Toggle Overview",
        shortcut: "O",
        action: toggleOverview,
      },
      {
        id: "fullscreen",
        label: "Toggle Fullscreen",
        shortcut: "F",
        action: toggleFullscreen,
      },
      {
        id: "export",
        label: "Export as PDF",
        shortcut: isMac ? "⌘⇧E" : "Ctrl+Shift+E",
        action: openExportMode,
      },
      {
        id: "print",
        label: "Print Slides",
        shortcut: isMac ? "⌘⇧P" : "Ctrl+Shift+P",
        action: openPrintMode,
      },
      {
        id: "presenter",
        label: "Toggle Presenter Mode",
        shortcut: "P",
        action: togglePresenter,
      },
    ],
    [
      nav,
      slideCount,
      toggleOverview,
      openExportMode,
      openPrintMode,
      togglePresenter,
      isMac,
    ],
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
    // Overview mode
    o: toggleOverview,
    // Presenter mode
    p: togglePresenter,
    // Export mode: Cmd+Shift+E (Mac) / Ctrl+Shift+E (other)
    "Shift+Meta+E": openExportMode,
    "Shift+Ctrl+E": openExportMode,
    // Print mode: Cmd+Shift+P (Mac) / Ctrl+Shift+P (other)
    "Shift+Meta+P": openPrintMode,
    "Shift+Ctrl+P": openPrintMode,
    // Command palette: Cmd+K (Mac) / Ctrl+K (other)
    "Meta+k": toggleCommandPalette,
    "Ctrl+k": toggleCommandPalette,
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
        ...theme.themeTokens,
        fonts: mergedTheme.fonts,
      },
      registerStepper: nav.registerStepper,
      unregisterStepper: nav.unregisterStepper,
    }),
    [nav, slideCount, theme.themeTokens, mergedTheme.fonts],
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
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                background: "#000",
              }}
            >
              {/* 16:9 constrained slide area — container query anchor */}
              <div
                className="pestacle-slide-container"
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "calc(100vh * 16 / 9)",
                  maxHeight: "calc(100vw * 9 / 16)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  background: presenterMode
                    ? "#000"
                    : theme.themeTokens.bg.base,
                  containerType: "size",
                  containerName: "slide",
                }}
              >
                {!presenterMode && (
                  <>
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
                          padding: "2cqh 3cqw",
                          boxSizing: "border-box",
                        }}
                      >
                        {Component && <Component />}
                      </div>
                    </ViewTransition>

                    {/* Section title overlay */}
                    <SectionTitle
                      title={getCurrentSection(deck.slides, nav.slideIndex)}
                    />

                    {/* Template overlay (progress bar, fullscreen) */}
                    <Template
                      slideNumber={nav.slideIndex + 1}
                      numberOfSlides={slideCount}
                      onToggleExport={openExportMode}
                      onTogglePrint={openPrintMode}
                      onToggleCommandPalette={toggleCommandPalette}
                    />

                    {/* Overview mode */}
                    {overviewMode && (
                      <OverviewMode
                        slides={deck.slides}
                        onSelectSlide={handleSelectSlide}
                        onClose={toggleOverview}
                      />
                    )}

                    {/* Export / Print mode */}
                    {exportMode && (
                      <ExportMode
                        slides={deck.slides}
                        variant={exportMode}
                        onClose={closeExportMode}
                      />
                    )}

                    {/* Command palette */}
                    {commandPaletteOpen && (
                      <CommandPalette
                        commands={commands}
                        onClose={closeCommandPalette}
                      />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Presenter mode — rendered outside the slide container so
                position:fixed is relative to the viewport, not the container
                (containerType:"size" creates a new containing block). */}
            {presenterMode && (
              <PresenterMode slides={deck.slides} onClose={closePresenter} />
            )}
          </MDXProvider>
        </PestacleProvider>
      </DeckContext.Provider>
    </React.StrictMode>
  );
}
