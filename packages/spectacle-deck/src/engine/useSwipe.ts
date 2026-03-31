import React from "react";

/**
 * Hook that adds touch swipe navigation to the slide deck.
 * Swipe left → next slide, swipe right → previous slide.
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  /** Minimum swipe distance in px to trigger navigation */
  threshold?: number;
}) {
  const touchRef = React.useRef<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    function handleTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      touchRef.current = { x: touch.clientX, y: touch.clientY };
    }

    function handleTouchEnd(e: TouchEvent) {
      if (!touchRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchRef.current.x;
      const dy = touch.clientY - touchRef.current.y;
      touchRef.current = null;

      // Only trigger if horizontal swipe is dominant
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy)) return;

      if (dx < 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, threshold]);
}
