import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { Slide, Deck as SpectacleDeck } from "spectacle";
import { createGlobalStyle } from "styled-components";

import { createCssVariables } from "./colors";
import customComponents from "./components/map";
import { type LayoutComponent, PestacleProvider } from "./context";
import Layouts from "./layouts";
import { SkipStepsShortcut } from "./SkipStepsShortcut";
import { SlideWrapper } from "./SlideWrapper";
import { template } from "./template";
import { default as baseTheme } from "./theme";
import { resolveTransition } from "./transitions";

export * from "spectacle";

export {
  AnimatedCounter,
  FadeIn,
  ProgressRing,
  ScaleIn,
  Spotlight,
  StaggerChildren,
  TypeWriter,
} from "./components/animations";
export { Doc, DocItem } from "./components/DocumentationItem";
export { default as FilePane } from "./components/FilePane";
export {
  default as HorizontalList,
  HorizontalListItem,
} from "./components/HorizontalList";
export { IconBox } from "./components/IconBox";
export { Image } from "./components/Image";
export { ItemsColumn } from "./components/ItemsColumn";
export { Mermaid } from "./components/Mermaid";
export { default as Timeline, TimelineItem } from "./components/Timeline";
export {
  dropTransition,
  noneTransition,
  resolveTransition,
} from "./transitions";

export type SlideType = {
  metadata: Record<string, unknown> & { layout?: string };
  slideComponent: React.ElementType<unknown>;
};

export type DeckType = {
  metadata: Record<string, unknown>;
  slides: SlideType[];
};

export function PassThrough({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export const layouts = Layouts;

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
  transition,
}: {
  deck: DeckType;
  theme: ThemeOptions;
  layouts?: Record<string, LayoutComponent>;
  /** Default slide transition. Can be a name ("fade", "slide", "drop", "none") or a SlideTransition object. */
  transition?: string;
}) {
  React.useEffect(() => {
    document.title = (deck.metadata.title as string) || "Untitled";
  }, [deck.metadata.title]);

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

  const GlobalStyle = React.useMemo(() => {
    const cssVariables = createCssVariables(theme.themeTokens.colors);
    return createGlobalStyle`
      :root {
        ${cssVariables}
        --font-family: ${mergedTheme.fonts.text}
      }
    `;
  }, [theme, mergedTheme]);

  return (
    <React.StrictMode>
      <PestacleProvider layouts={layouts}>
        <MDXProvider components={componentsMap}>
          <GlobalStyle />
          <SpectacleDeck
            theme={mergedTheme}
            template={template}
            transition={resolveTransition(transition)}
          >
            <SkipStepsShortcut />
            {deck.slides.map((slide, i) => {
              const Component = slide.slideComponent;
              const slideTransitionName = slide.metadata?.transition as
                | string
                | undefined;
              const slideTransition = resolveTransition(slideTransitionName);
              return (
                <Slide key={i} transition={slideTransition}>
                  <Component />
                </Slide>
              );
            })}
          </SpectacleDeck>
        </MDXProvider>
      </PestacleProvider>
    </React.StrictMode>
  );
}

export function Danger({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "red" }}>{children}</div>;
}

export function Information({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "orange" }}>{children}</div>;
}

export function Success({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "green" }}>{children}</div>;
}
export function Warning({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "yellow" }}>{children}</div>;
}

export function Side({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

Side.mdxType = "Side";

export function Column({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

Column.mdxType = "Column";

export function Documentation({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function Box({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
