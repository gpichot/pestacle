import React from "react";

type KeyBindings = Record<string, () => void>;

/**
 * Simple keyboard shortcut hook. Replaces Spectacle's useMousetrap.
 * Supports key names like "ArrowRight", "Shift+ArrowRight", "PageUp", etc.
 */
export function useKeyboard(bindings: KeyBindings) {
  const bindingsRef = React.useRef(bindings);
  bindingsRef.current = bindings;

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const parts: string[] = [];
      if (e.shiftKey) parts.push("Shift");
      if (e.ctrlKey) parts.push("Ctrl");
      if (e.metaKey) parts.push("Meta");
      if (e.altKey) parts.push("Alt");
      parts.push(e.key);
      const combo = parts.join("+");

      // Try exact match first, then just the key
      const handler = bindingsRef.current[combo] ?? bindingsRef.current[e.key];
      if (handler) {
        e.preventDefault();
        handler();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
}
