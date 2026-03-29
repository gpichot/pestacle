import React from "react";

export interface DeckState {
  /** Current slide index (0-based) */
  slideIndex: number;
  /** Current step index within the slide (0-based, 0 = no steps revealed) */
  stepIndex: number;
  /** Total number of slides */
  slideCount: number;
  /** Total steps for the current slide (registered by Stepper components) */
  stepCount: number;
  /** Navigate to the next step or slide */
  stepForward: () => void;
  /** Navigate to the previous step or slide */
  stepBackward: () => void;
  /** Jump to a specific slide (optionally a specific step) */
  skipTo: (target: { slideIndex: number; stepIndex?: number }) => void;
  /** Direction of the last navigation ("forward" | "backward") */
  direction: "forward" | "backward";
  /** Theme colors, backgrounds, and fonts */
  theme: {
    colors: Record<string, string>;
    backgrounds: Record<string, string>;
    fonts?: { header?: string; text?: string };
  };
  /** Register steps for a Stepper component within the current slide */
  registerStepper: (id: string, count: number) => void;
  /** Unregister a Stepper (on unmount) */
  unregisterStepper: (id: string) => void;
}

export const DeckContext = React.createContext<DeckState>({
  slideIndex: 0,
  stepIndex: 0,
  slideCount: 0,
  stepCount: 0,
  stepForward: () => {},
  stepBackward: () => {},
  skipTo: () => {},
  direction: "forward",
  theme: { colors: {}, backgrounds: {} },
  registerStepper: () => {},
  unregisterStepper: () => {},
});

export function useDeck() {
  return React.useContext(DeckContext);
}
