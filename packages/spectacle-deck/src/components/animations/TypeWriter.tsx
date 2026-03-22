import React from "react";

interface TypeWriterProps {
  /** The text to type out */
  children: string;
  /** Typing speed in milliseconds per character. Default: 50 */
  speed?: number;
  /** Delay before typing starts in milliseconds. Default: 0 */
  delay?: number;
  /** Whether to show a blinking cursor. Default: true */
  cursor?: boolean;
}

export function TypeWriter({
  children,
  speed = 50,
  delay = 0,
  cursor = true,
}: TypeWriterProps) {
  const text = typeof children === "string" ? children : String(children);
  const [displayed, setDisplayed] = React.useState("");
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    let index = 0;
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
  }, [text, speed, delay]);

  return (
    <span>
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
