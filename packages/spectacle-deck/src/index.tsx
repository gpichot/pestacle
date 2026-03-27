import type React from "react";

// Animations (react-spring based, independent of Spectacle)
export {
  AnimatedCounter,
  FadeIn,
  ProgressRing,
  ScaleIn,
  Spotlight,
  StaggerChildren,
  TypeWriter,
} from "./components/animations";
// Custom components
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
export type {
  DeckState,
  DeckType,
  MorphProps,
  SlideTransition,
  SlideType,
  StepperProps,
} from "./engine";
// Re-export the new engine as the public API
// View Transitions & Morph
// Stepper
// Transitions
// Navigation hooks
export {
  Deck,
  DeckContext,
  dropTransition,
  fadeTransition,
  Morph,
  MorphImage,
  morphTransition,
  noneTransition,
  resolveTransition,
  Stepper,
  slideTransition,
  useDeck,
  useKeyboard,
} from "./engine";
// Layouts
export { default as layouts } from "./layouts";

// --- Simple utility components ---

export function PassThrough({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
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
