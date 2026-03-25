import { useContext, useEffect } from "react";
import { DeckContext, useMousetrap } from "spectacle";

/**
 * Registers keyboard shortcuts for presentation remote controllers:
 * - PageDown / PageUp: next / previous (standard step-by-step navigation)
 * - VolumeUp / VolumeDown: next / previous slide (skipping steps)
 */
export function RemoteControllerShortcut() {
  const {
    skipTo,
    stepForward,
    stepBackward,
    activeView: { slideIndex },
    slideCount,
  } = useContext(DeckContext);

  // PageDown → next, PageUp → previous (step-by-step, same as arrow keys)
  useMousetrap(
    {
      pagedown: () => {
        stepForward();
      },
      pageup: () => {
        stepBackward();
      },
    },
    [stepForward, stepBackward],
  );

  // VolumeUp / VolumeDown → skip steps navigation
  // These keys are not recognized by Mousetrap, so we use native listeners.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "AudioVolumeUp") {
        e.preventDefault();
        if (slideIndex < slideCount - 1) {
          skipTo({ slideIndex: slideIndex + 1, stepIndex: 0 });
        }
      } else if (e.key === "AudioVolumeDown") {
        e.preventDefault();
        if (slideIndex > 0) {
          skipTo({
            slideIndex: slideIndex - 1,
            stepIndex: null as unknown as number,
          });
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [slideIndex, slideCount, skipTo]);

  return null;
}
