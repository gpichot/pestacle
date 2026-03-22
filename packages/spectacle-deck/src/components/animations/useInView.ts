import React from "react";

/**
 * Hook that detects when an element becomes visible in the viewport.
 * Used to defer animations until the slide is actually shown
 * (Spectacle pre-mounts all slides in the DOM).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(): [
  React.RefObject<T | null>,
  boolean,
] {
  const ref = React.useRef<T | null>(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}
