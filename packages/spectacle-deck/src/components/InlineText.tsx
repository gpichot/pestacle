import React from "react";
import { Stepper } from "spectacle";

/**
 * InlineText renders children as inline segments that appear one by one
 * on each step (arrow key press). All segments stay on the same line.
 *
 * Usage in MDX:
 *   <InlineText>
 *     <span>Can we do it faster? </span>
 *     <span>(Without bugs?)</span>
 *   </InlineText>
 */
export function InlineText({
  children,
  priority,
}: {
  children: React.ReactNode;
  priority?: number;
}) {
  const segments = React.Children.toArray(children);

  // Create step values: [0, 1, 2, ...] — one per segment after the first
  // The first segment is always visible, subsequent ones appear on each step
  const stepValues = segments.slice(1).map((_, i) => i + 1);

  if (segments.length <= 1) {
    return (
      <span style={{ display: "inline", whiteSpace: "pre-wrap" }}>
        {children}
      </span>
    );
  }

  return (
    <Stepper values={stepValues} priority={priority}>
      {(currentStep, _, isActive) => {
        const visibleCount = isActive ? (currentStep as number) + 1 : 1;
        return (
          <span style={{ display: "inline", whiteSpace: "pre-wrap" }}>
            {segments.map((segment, i) => (
              <span
                key={i}
                style={{
                  opacity: i < visibleCount ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  visibility: i < visibleCount ? "visible" : "hidden",
                }}
              >
                {segment}
              </span>
            ))}
          </span>
        );
      }}
    </Stepper>
  );
}
