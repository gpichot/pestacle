/**
 * CSS-based slide transition definitions for the View Transitions API.
 *
 * Each transition defines keyframes for `::view-transition-old(slide)`
 * and `::view-transition-new(slide)` pseudo-elements.
 *
 * The View Transitions API captures the old DOM as an image, updates
 * the DOM, then animates from old to new using these keyframes.
 */

import { getOrCreateStyleElement } from "./dom-helpers";

export interface SlideTransition {
  /** A unique name for this transition */
  name: string;
  /** Duration in ms */
  duration?: number;
  /** CSS easing function */
  easing?: string;
  /** CSS for the old slide (exiting) — a CSS keyframes body */
  oldKeyframes: Keyframe[];
  /** CSS for the new slide (entering) — a CSS keyframes body */
  newKeyframes: Keyframe[];
}

// --- Built-in transitions ---

export const fadeTransition: SlideTransition = {
  name: "fade",
  duration: 300,
  easing: "ease-in-out",
  oldKeyframes: [{ opacity: 1 }, { opacity: 0 }],
  newKeyframes: [{ opacity: 0 }, { opacity: 1 }],
};

export const slideTransition: SlideTransition = {
  name: "slide",
  duration: 400,
  easing: "ease-in-out",
  oldKeyframes: [
    { transform: "translateX(0%)", opacity: 1 },
    { transform: "translateX(-100%)", opacity: 0 },
  ],
  newKeyframes: [
    { transform: "translateX(100%)", opacity: 0 },
    { transform: "translateX(0%)", opacity: 1 },
  ],
};

const slideBackwardTransition: SlideTransition = {
  name: "slide-backward",
  duration: 400,
  easing: "ease-in-out",
  oldKeyframes: [
    { transform: "translateX(0%)", opacity: 1 },
    { transform: "translateX(100%)", opacity: 0 },
  ],
  newKeyframes: [
    { transform: "translateX(-100%)", opacity: 0 },
    { transform: "translateX(0%)", opacity: 1 },
  ],
};

export const dropTransition: SlideTransition = {
  name: "drop",
  duration: 500,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  oldKeyframes: [
    { transform: "translateY(0%)", opacity: 1 },
    { transform: "translateY(100%)", opacity: 0 },
  ],
  newKeyframes: [
    { transform: "translateY(-100%)", opacity: 0 },
    { transform: "translateY(0%)", opacity: 1 },
  ],
};

export const noneTransition: SlideTransition = {
  name: "none",
  duration: 0,
  easing: "linear",
  oldKeyframes: [{ opacity: 1 }, { opacity: 1 }],
  newKeyframes: [{ opacity: 1 }, { opacity: 1 }],
};

export const morphTransition: SlideTransition = {
  name: "morph",
  duration: 500,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  // For morph, the slide container uses a subtle fade while
  // individual elements with view-transition-name morph automatically
  oldKeyframes: [{ opacity: 1 }, { opacity: 0 }],
  newKeyframes: [{ opacity: 0 }, { opacity: 1 }],
};

const transitionMap: Record<string, SlideTransition> = {
  fade: fadeTransition,
  slide: slideTransition,
  "slide-backward": slideBackwardTransition,
  drop: dropTransition,
  none: noneTransition,
  morph: morphTransition,
};

/**
 * Resolve a transition name string to a SlideTransition object.
 */
export function resolveTransition(
  name: string | undefined,
): SlideTransition | undefined {
  if (!name) return undefined;
  return transitionMap[name];
}

/**
 * Inject a <style> element with view transition keyframes into the document.
 * Called once when the Deck mounts.
 */
export function injectTransitionStyles(
  transition: SlideTransition,
  direction: "forward" | "backward",
) {
  const t =
    direction === "backward" && transition.name === "slide"
      ? slideBackwardTransition
      : transition;

  const style = getOrCreateStyleElement("pestacle-view-transition-styles");

  style.textContent = `
    ::view-transition-old(slide-content) {
      animation: pestacle-old ${t.duration}ms ${t.easing} both;
    }
    ::view-transition-new(slide-content) {
      animation: pestacle-new ${t.duration}ms ${t.easing} both;
    }

    @keyframes pestacle-old {
      from { ${keyframeToCSS(t.oldKeyframes[0])} }
      to   { ${keyframeToCSS(t.oldKeyframes[1])} }
    }
    @keyframes pestacle-new {
      from { ${keyframeToCSS(t.newKeyframes[0])} }
      to   { ${keyframeToCSS(t.newKeyframes[1])} }
    }

    /* Allow morphable elements to transition independently */
    ::view-transition-group(*) {
      animation-duration: ${t.duration}ms;
      animation-timing-function: ${t.easing};
    }
  `;
}

function keyframeToCSS(kf: Keyframe): string {
  return Object.entries(kf)
    .map(([k, v]) => `${camelToKebab(k)}: ${v}`)
    .join("; ");
}

function camelToKebab(str: string): string {
  return str.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
}
