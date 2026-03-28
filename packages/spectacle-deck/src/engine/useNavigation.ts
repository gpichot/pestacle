import React from "react";

interface NavigationOptions {
  slideCount: number;
  onSlideChange?: (index: number, direction: "forward" | "backward") => void;
}

/**
 * Core navigation state machine for the deck.
 * Manages slide index, step index, and step registration.
 * Uses React.startTransition so that <ViewTransition> components
 * automatically animate during slide and step changes.
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

  // Cache step counts per slide so we can restore position when navigating back
  const slideStepCountsRef = React.useRef<Map<number, number>>(new Map());

  const updateStepCount = React.useCallback(
    (newCount: number) => {
      setStepCount(newCount);
      slideStepCountsRef.current.set(slideIndex, newCount);
    },
    [slideIndex],
  );

  const registerStepper = React.useCallback(
    (id: string, count: number) => {
      steppersRef.current.set(id, count);
      // Total step count = max across all steppers (they advance in parallel)
      const max = Math.max(0, ...steppersRef.current.values());
      updateStepCount(max);
    },
    [updateStepCount],
  );

  const unregisterStepper = React.useCallback(
    (id: string) => {
      steppersRef.current.delete(id);
      const max =
        steppersRef.current.size > 0
          ? Math.max(0, ...steppersRef.current.values())
          : 0;
      updateStepCount(max);
    },
    [updateStepCount],
  );

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

      onSlideChange?.(newIndex, dir);

      // Wrap in startTransition so React's <ViewTransition> components
      // automatically trigger the browser View Transitions API
      // When going backward, restore to the slide's final step so the user
      // sees the fully-revealed state instead of the initial one.
      const cachedSteps =
        dir === "backward"
          ? (slideStepCountsRef.current.get(newIndex) ?? 0)
          : 0;

      React.startTransition(() => {
        setDirection(dir);
        setSlideIndex(newIndex);
        setStepIndex(cachedSteps);
      });
    },
    [slideCount, onSlideChange],
  );

  const stepForward = React.useCallback(() => {
    if (stepIndex < stepCount) {
      // Advance within current slide's steps — also use startTransition
      // so that appearing elements wrapped in <ViewTransition> animate
      React.startTransition(() => {
        setStepIndex((s) => s + 1);
        setDirection("forward");
      });
    } else {
      // Move to next slide
      navigateToSlide(slideIndex + 1, "forward");
    }
  }, [stepIndex, stepCount, slideIndex, navigateToSlide]);

  const stepBackward = React.useCallback(() => {
    if (stepIndex > 0) {
      // Go back within current slide's steps
      React.startTransition(() => {
        setStepIndex((s) => s - 1);
        setDirection("backward");
      });
    } else {
      // Move to previous slide
      navigateToSlide(slideIndex - 1, "backward");
    }
  }, [stepIndex, slideIndex, navigateToSlide]);

  const skipTo = React.useCallback(
    (target: { slideIndex: number; stepIndex?: number }) => {
      const dir = target.slideIndex >= slideIndex ? "forward" : "backward";

      if (target.slideIndex !== slideIndex) {
        onSlideChange?.(target.slideIndex, dir);
      }

      React.startTransition(() => {
        setDirection(dir);
        if (target.slideIndex !== slideIndex) {
          setSlideIndex(target.slideIndex);
        }
        setStepIndex(target.stepIndex ?? 0);
      });
    },
    [slideIndex, onSlideChange],
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
