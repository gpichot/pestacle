import { useContext } from "react";
import { DeckContext, useMousetrap } from "spectacle";

/**
 * Registers Shift+ArrowRight / Shift+ArrowLeft keyboard shortcuts
 * to skip all steps within a slide and jump directly to the next/previous slide.
 */
export function SkipStepsShortcut() {
  const {
    skipTo,
    activeView: { slideIndex },
    slideCount,
  } = useContext(DeckContext);

  useMousetrap(
    {
      "shift+right": () => {
        if (slideIndex < slideCount - 1) {
          skipTo({ slideIndex: slideIndex + 1, stepIndex: 0 });
        }
      },
      "shift+left": () => {
        if (slideIndex > 0) {
          // stepIndex: null is Spectacle's GOTO_FINAL_STEP sentinel,
          // which resolves to the last step of the target slide.
          skipTo({
            slideIndex: slideIndex - 1,
            stepIndex: null as unknown as number,
          });
        }
      },
    },
    [slideIndex, slideCount, skipTo],
  );

  return null;
}
