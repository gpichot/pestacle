import React from "react";
import { Stepper } from "spectacle";

/**
 * InlineText displays text that progressively builds up on each step.
 *
 * Usage in MDX:
 *   <InlineText>
 *     Can we do it faster?
 *     <step> Without bugs?</step>
 *     <step> Or even both?</step>
 *   </InlineText>
 *
 * Step 0: "Can we do it faster?"
 * Step 1: "Can we do it faster? Without bugs?"
 * Step 2: "Can we do it faster? Without bugs? Or even both?"
 */
export function InlineText({
  children,
  priority,
}: {
  children: React.ReactNode;
  priority?: number;
}) {
  const parts: React.ReactNode[] = [];
  const childArray = React.Children.toArray(children);

  for (const child of childArray) {
    if (
      React.isValidElement<{ children: React.ReactNode }>(child) &&
      child.type === "step"
    ) {
      parts.push(child.props.children);
    } else {
      // Non-step children are part of the initial (always-visible) content
      if (parts.length === 0) {
        parts.push(child);
      } else {
        // Append to the last part
        parts[parts.length - 1] = (
          <>
            {parts[parts.length - 1]}
            {child}
          </>
        );
      }
    }
  }

  if (parts.length <= 1) {
    return <span>{parts[0]}</span>;
  }

  const stepValues = parts.slice(1).map((_, i) => i + 1);

  return (
    <Stepper values={stepValues} priority={priority}>
      {(currentStep, _, isActive) => {
        const visibleCount = isActive ? (currentStep as number) + 1 : 1;
        return (
          <span style={{ transition: "all 0.3s ease" }}>
            {parts.slice(0, visibleCount)}
          </span>
        );
      }}
    </Stepper>
  );
}
