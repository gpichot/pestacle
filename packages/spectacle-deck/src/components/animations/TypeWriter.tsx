import React from "react";

import { useInView } from "./useInView";

interface TypeWriterProps {
  /** The text to type out. Accepts React children (text is extracted). */
  children: React.ReactNode;
  /** Typing speed in milliseconds per character. Default: 50 */
  speed?: number;
  /** Delay before typing starts in milliseconds. Default: 0 */
  delay?: number;
  /** Whether to show a blinking cursor. Default: true */
  cursor?: boolean;
}

/**
 * Recursively extract text content from React children.
 */
function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return extractText(props.children);
  }
  return "";
}

export function TypeWriter({
  children,
  speed = 50,
  delay = 0,
  cursor = true,
}: TypeWriterProps) {
  const text = extractText(children);
  const [ref, isInView] = useInView<HTMLSpanElement>();
  const [displayed, setDisplayed] = React.useState("");
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (!isInView) return;

    let index = 0;
    setDisplayed("");
    setDone(false);

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1));
          index++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, isInView]);

  return (
    <span ref={ref}>
      {displayed}
      {cursor && (
        <span
          style={{
            borderRight: "2px solid currentColor",
            marginLeft: 1,
            animation: done ? "pestacle-blink 1s step-end infinite" : "none",
          }}
        >
          <style>{`@keyframes pestacle-blink { 50% { opacity: 0; } }`}</style>
        </span>
      )}
    </span>
  );
}
