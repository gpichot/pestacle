/**
 * Get or create a <style> element by ID in the document head.
 */
export function getOrCreateStyleElement(id: string): HTMLStyleElement {
  let el = document.getElementById(id) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = id;
    document.head.appendChild(el);
  }
  return el;
}

/**
 * Toggle fullscreen on the document element.
 */
export function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}
