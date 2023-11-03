import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Deck as SpectacleDeck, Slide } from "spectacle";

import Layouts from "./layouts";
import theme from "./theme";
import { template } from "./template";
import customComponents from "./components/map";

export { default as FilePane } from "./components/FilePane";

export type SlideType = {
  metadata: Record<string, unknown> & { layout?: string };
  slideComponent: React.ElementType<unknown>;
};

export type DeckType = {
  metadata: Record<string, unknown>;
  slides: SlideType[];
};

export function PassThrough({ children }: { children: React.ReactNode }) {
  console.log("PassThrough", children);
  return <>{children}</>;
}

const componentsMap = {
  ...customComponents,
  wrapper: Layout,
};

export function Layout({
  children,
  frontmatter,
}: {
  children: React.ReactNode;
  frontmatter: { layout?: string };
}) {
  const layout = frontmatter?.layout || "default";
  const Layout = layout in Layouts ? Layouts[layout] : null;

  if (layout && !Layout) {
    console.warn(`Layout ${layout} not found`);
  }

  if (Layout) {
    return <Layout {...frontmatter}>{children}</Layout>;
  }

  return <>{children}</>;
}
export function Deck({ deck }: { deck: DeckType }) {
  React.useEffect(() => {
    document.title = (deck.metadata.title as string) || "Untitled";
  }, [deck.metadata.title]);
  return (
    <React.StrictMode>
      <MDXProvider components={componentsMap}>
        <SpectacleDeck theme={theme} template={template}>
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
    </React.StrictMode>
  );
}

export function Danger({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "red" }}>{children}</div>;
}

export function Doc({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "blue" }}>{children}</div>;
}

export function Information({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "orange" }}>{children}</div>;
}

export function ItemsColumn({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "items" }}>{children}</div>;
}

export function Success({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "green" }}>{children}</div>;
}

export function Side({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
