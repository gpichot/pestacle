import React from "react";
import { Stepper } from "spectacle";

/**
 * InlineText displays text that progressively builds up on each step.
 *
 * Each value in the array is the full text shown at that step.
 *
 * Usage in MDX:
 *   <InlineText values={['Can we do it faster?', 'Can we do it faster? Without bugs?']} />
 */
export function InlineText({
  values,
  priority,
}: {
  values: string[];
  priority?: number;
}) {
  // Steps after the first value
  const stepValues = values.slice(1).map((_, i) => i + 1);

  if (values.length <= 1) {
    return <span>{values[0]}</span>;
  }

  return (
    <Stepper values={stepValues} priority={priority}>
      {(currentStep, _, isActive) => {
        const index = isActive ? (currentStep as number) : 0;
        return <span style={{ transition: "all 0.3s ease" }}>{values[index]}</span>;
      }}
    </Stepper>
  );
}
