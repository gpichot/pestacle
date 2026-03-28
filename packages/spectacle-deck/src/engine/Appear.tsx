import React from "react";

import { useDeck } from "./DeckContext";

export interface AppearProps {
  children: React.ReactNode;
  /** Step index at which this element appears (1-based). Defaults to auto-assigned. */
  stepIndex?: number;
  /** Style applied when visible */
  activeStyle?: React.CSSProperties;
  /** Style applied when hidden */
  inactiveStyle?: React.CSSProperties;
}

const defaultActiveStyle: React.CSSProperties = {
  opacity: 1,
  transition: "opacity 0.3s ease-in-out",
};

const defaultInactiveStyle: React.CSSProperties = {
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
};

/**
 * Appear component — shows children at a given step.
 *
 * Registers one step with the deck. Children are hidden (opacity 0)
 * until the step is reached, then fade in.
 */
export function Appear({
  children,
  activeStyle = defaultActiveStyle,
  inactiveStyle = defaultInactiveStyle,
}: AppearProps) {
  const { stepIndex, registerStepper, unregisterStepper } = useDeck();
  const id = React.useId();

  React.useEffect(() => {
    registerStepper(id, 1);
    return () => unregisterStepper(id);
  }, [id, registerStepper, unregisterStepper]);

  // stepIndex >= 1 means this appear's step has been reached
  const isActive = stepIndex >= 1;
  const style = isActive ? activeStyle : inactiveStyle;

  return <div style={style}>{children}</div>;
}
