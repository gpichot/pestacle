import React from "react";

import { useDeck } from "./DeckContext";

export interface StepperProps<T = unknown> {
  /** Array of values to step through */
  values: T[];
  /** Render function: (currentValue, stepIndex, isActive) => ReactNode */
  children: (
    value: T | null,
    step: number,
    isActive: boolean,
  ) => React.ReactNode;
  /** If true, render even when no step is active (step = -1) */
  alwaysVisible?: boolean;
  /** Priority for ordering multiple steppers (not yet used, reserved) */
  priority?: number;
  /** Style applied when the stepper is active (compat with Spectacle API) */
  activeStyle?: React.CSSProperties;
  /** Style applied when the stepper is inactive (compat with Spectacle API) */
  inactiveStyle?: React.CSSProperties;
  /** Additional props spread onto the wrapper (e.g. from Timeline) */
  [key: string]: unknown;
}

/**
 * Stepper component — replaces Spectacle's Stepper.
 *
 * Registers its step count with the deck and renders children
 * based on the current step index. Steps are 0-indexed in the deck,
 * but the stepper maps them to values.
 *
 * Step 0 in the deck = "no step active" (renders with alwaysVisible).
 * Step 1..N = values[0]..values[N-1].
 */
export function Stepper<T>({
  values,
  children,
  alwaysVisible = false,
  priority: _priority,
  activeStyle,
  inactiveStyle,
  ...rest
}: StepperProps<T>) {
  const { stepIndex, registerStepper, unregisterStepper } = useDeck();

  const id = React.useId();

  // Register this stepper's step count (number of values = number of steps)
  React.useEffect(() => {
    registerStepper(id, values.length);
    return () => unregisterStepper(id);
  }, [id, values.length, registerStepper, unregisterStepper]);

  // stepIndex 0 = initial state (no step active)
  // stepIndex 1 = values[0], stepIndex 2 = values[1], etc.
  const activeValueIndex = stepIndex - 1;
  const isActive = activeValueIndex >= 0 && activeValueIndex < values.length;
  const currentValue = isActive ? values[activeValueIndex] : null;

  // The "step" passed to the render function is the 0-based index into values
  const step = Math.max(0, Math.min(activeValueIndex, values.length - 1));

  if (!isActive && !alwaysVisible) {
    return null;
  }

  const style = isActive ? activeStyle : inactiveStyle;
  const content = children(currentValue, step, isActive);

  // If activeStyle/inactiveStyle are provided, wrap in a div
  if (style) {
    return <div style={style}>{content}</div>;
  }

  return <>{content}</>;
}
