import {
  fadeTransition,
  type SlideTransition,
  slideTransition,
} from "spectacle";

/**
 * Drop transition: slide drops in from above, exits downward.
 */
export const dropTransition: SlideTransition = {
  from: { transform: "translateY(-100%)", opacity: 0 },
  enter: { transform: "translateY(0%)", opacity: 1 },
  leave: { transform: "translateY(100%)", opacity: 0 },
};

/**
 * None transition: instant swap with no animation.
 */
export const noneTransition: SlideTransition = {
  from: { opacity: 1 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
};

const transitionMap: Record<string, SlideTransition> = {
  fade: fadeTransition,
  slide: slideTransition,
  drop: dropTransition,
  none: noneTransition,
};

/**
 * Resolve a transition name string to a SlideTransition object.
 * Returns undefined if the name is not recognized.
 */
export function resolveTransition(
  name: string | undefined,
): SlideTransition | undefined {
  if (!name) return undefined;
  return transitionMap[name];
}
