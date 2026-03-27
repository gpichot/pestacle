import React from "react";

import { startViewTransition } from "./dom-helpers";

interface NavigationOptions {
  slideCount: number;
  onSlideChange?: (index: number, direction: "forward" | "backward") => void;
}

/**
 * Core navigation state machine for the deck.
 * Manages slide index, step index, and step registration.
 * Integrates with the View Transitions API for animated slide changes.
 */
export function useNavigation({
  slideCount,
  onSlideChange,
}: NavigationOptions) {
  const [slideIndex, setSlideIndex] = React.useState(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const match = hash.match(/^#(\d+)$/);
    return match
      ? Math.min(parseInt(match[1], 10), Math.max(0, slideCount - 1))
      : 0;
  });
  const [stepIndex, setStepIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<"forward" | "backward">(
    "forward",
  );

  // Step registration: each Stepper within a slide registers its step count
  const steppersRef = React.useRef<Map<string, number>>(new Map());
  const [stepCount, setStepCount] = React.useState(0);

  const registerStepper = React.useCallback((id: string, count: number) => {
    steppersRef.current.set(id, count);
    // Total step count = max across all steppers (they advance in parallel)
    const max = Math.max(0, ...steppersRef.current.values());
    setStepCount(max);
  }, []);

  const unregisterStepper = React.useCallback((id: string) => {
    steppersRef.current.delete(id);
    const max =
      steppersRef.current.size > 0
        ? Math.max(0, ...steppersRef.current.values())
        : 0;
    setStepCount(max);
  }, []);

  // Reset steps when slide changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally re-run on slideIndex change
  React.useEffect(() => {
    steppersRef.current.clear();
    setStepCount(0);
  }, [slideIndex]);

  // Sync hash with slide index
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${slideIndex}`);
    }
  }, [slideIndex]);

  const navigateToSlide = React.useCallback(
    (newIndex: number, dir: "forward" | "backward") => {
      if (newIndex < 0 || newIndex >= slideCount) return;

      setDirection(dir);
      onSlideChange?.(newIndex, dir);

      startViewTransition(() => {
        setSlideIndex(newIndex);
        setStepIndex(0);
      });
    },
    [slideCount, onSlideChange],
  );

  const stepForward = React.useCallback(() => {
    if (stepIndex < stepCount) {
      // Advance within current slide's steps
      setStepIndex((s) => s + 1);
      setDirection("forward");
    } else {
      // Move to next slide
      navigateToSlide(slideIndex + 1, "forward");
    }
  }, [stepIndex, stepCount, slideIndex, navigateToSlide]);

  const stepBackward = React.useCallback(() => {
    if (stepIndex > 0) {
      // Go back within current slide's steps
      setStepIndex((s) => s - 1);
      setDirection("backward");
    } else {
      // Move to previous slide
      navigateToSlide(slideIndex - 1, "backward");
    }
  }, [stepIndex, slideIndex, navigateToSlide]);

  const skipTo = React.useCallback(
    (target: { slideIndex: number; stepIndex?: number }) => {
      const dir = target.slideIndex >= slideIndex ? "forward" : "backward";
      setDirection(dir);

      if (target.slideIndex !== slideIndex) {
        startViewTransition(() => {
          setSlideIndex(target.slideIndex);
          setStepIndex(target.stepIndex ?? 0);
        });
      } else {
        setStepIndex(target.stepIndex ?? 0);
      }
    },
    [slideIndex],
  );

  return {
    slideIndex,
    stepIndex,
    stepCount,
    direction,
    stepForward,
    stepBackward,
    skipTo,
    registerStepper,
    unregisterStepper,
  };
}
