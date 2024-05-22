import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Deck as SpectacleDeck, Slide } from "spectacle";

import Layouts from "./layouts";
import { default as baseTheme } from "./theme";
import { template } from "./template";
import customComponents from "./components/map";
import { createGlobalStyle } from "styled-components";
import { SlideWrapper } from "./SlideWrapper";
import { LayoutComponent, PestacleProvider } from "./context";
import { createCssVariables } from "./colors";

export * from "spectacle";

export { default as FilePane } from "./components/FilePane";
export { ItemsColumn } from "./components/ItemsColumn";
export { Doc, DocItem } from "./components/DocumentationItem";
export { Image } from "./components/Image";
export {
  default as HorizontalList,
  HorizontalListItem,
} from "./components/HorizontalList";
export { default as Timeline, TimelineItem } from "./components/Timeline";
export { IconBox } from "./components/IconBox";

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
}: {
  deck: DeckType;
  theme: ThemeOptions;
  layouts?: Record<string, LayoutComponent>;
}) {
  React.useEffect(() => {
    document.title = (deck.metadata.title as string) || "Untitled";
  }, [deck.metadata.title]);

  const GlobalStyle = React.useMemo(() => {
    const cssVariables = createCssVariables(theme.themeTokens.colors);
    return createGlobalStyle`
      :root {
        ${cssVariables}
      }
    `;
  }, [theme]);

  return (
    <React.StrictMode>
      <PestacleProvider layouts={layouts}>
        <MDXProvider components={componentsMap}>
          <GlobalStyle />
          <SpectacleDeck
            theme={{ ...baseTheme, ...theme.themeTokens }}
            template={template}
          >
            {deck.slides.map((slide, i) => {
              const Component = slide.slideComponent;
              return (
                <Slide key={i}>
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

export function Documentation({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function Box({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
