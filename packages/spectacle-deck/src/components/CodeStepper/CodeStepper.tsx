import React from "react";
import ReactIs from "react-is";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Stepper } from "../../engine/Stepper";
import styles from "./CodeStepper.module.css";
import { parseStepDirectives, type Step } from "./code-directives";

const Highlighter = SyntaxHighlighter as unknown as React.ElementType;

function useCodeSteps(code: string) {
  return React.useMemo(() => {
    const prefixes = code.match(/(?:\/\/|<!--) @.*\n/g) || ([] as string[]);
    const prefixesLength = prefixes.reduce(
      (acc, prefix) => acc + prefix.length,
      0,
    );

    const codeWithoutPrefixes = code.slice(prefixesLength);

    const hasDirectives = prefixes.length > 0;
    const allDirectives = hasDirectives ? [...prefixes] : [];
    const steps = parseStepDirectives(allDirectives);

    return {
      steps,
      code: codeWithoutPrefixes,
      prefixes,
      hasSteps: Boolean(steps.length),
      hasName: steps.some((step) => step.name),
    };
  }, [code]);
}

function getCodeDetails(children: React.ReactNode) {
  const child = React.Children.toArray(children)[0];

  if (!React.isValidElement<{ className?: string; children?: string }>(child)) {
    return {
      language: "",
      code: ReactIs.isFragment(child) ? "" : String(child || ""),
    };
  }

  const result = {
    language: (String(child.props.className) || "").replace("language-", ""),
    code: (child.props.children as string).trim(),
  };

  return result;
}

function CodeWrapper({
  name,
  stepName,
  hasName,
  children,
}: {
  name?: string;
  stepName?: string;
  hasName?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        margin: "0.5cqh 1cqw",
        backgroundColor: "rgb(38,39,40)",
        borderRadius: "4px",
      }}
    >
      {name && (
        <span
          style={{
            fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
            fontSize: "1cqw",
            color: "#ffffffbb",
            backgroundColor: "#33333388",
            display: "inline-block",
            padding: "8px 8px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {name}
        </span>
      )}
      {children}
      {hasName && (
        <span
          style={{
            fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
            fontSize: "0.8cqw",
            color: "#ffffffaa",
            backgroundColor: "#33333388",
            display: "inline-block",
            padding: "4px 8px",
            width: "100%",
            boxSizing: "border-box",
            fontStyle: "italic",
          }}
        >
          {stepName || <span style={{ visibility: "hidden" }}>Step</span>}
        </span>
      )}
    </div>
  );
}

export default function CodeStepper({
  priority,
  name,
  ...props
}: React.ComponentProps<"pre"> & {
  priority?: number;
  name?: string;
}) {
  const { language, code } = React.useMemo(() => {
    return getCodeDetails(props.children);
  }, [props.children]);

  const {
    steps,
    code: codeNormalized,
    prefixes,
    hasSteps,
    hasName,
  } = useCodeSteps(code);
  return (
    <div className={styles.container}>
      {import.meta.env.DEV && false && Boolean(prefixes?.length) && (
        <div style={{ position: "absolute", top: 0, opacity: 0.5, left: 0 }}>
          <Highlighter language={language} style={gruvboxDark}>
            {prefixes.join("")}
          </Highlighter>
        </div>
      )}
      <Stepper
        values={steps}
        alwaysVisible={!hasSteps}
        priority={priority ? priority + 1 : undefined}
      >
        {(step, _, isActive) => {
          return (
            <CodeWrapper
              name={name}
              stepName={(step as Step | null)?.name}
              hasName={hasName}
            >
              <Highlighter
                language={language}
                wrapLines
                showLineNumbers
                style={gruvboxDark}
                lineNumberStyle={(lineNumber: number) => {
                  const { highlight = [] } = (step as Step) || {};
                  const isHighlighted = highlight.includes(lineNumber);

                  return {
                    fontWeight: isHighlighted ? "bold" : "normal",
                  };
                }}
                lineProps={(lineNumber: number) => {
                  const { hiddenLines = [], highlight = [] } =
                    (step as Step) || {};
                  const isVisible =
                    hasSteps && isActive
                      ? !hiddenLines.includes(lineNumber)
                      : isActive || !hasSteps;
                  const isHighlighted = highlight.includes(lineNumber);
                  const getOpacity = () => {
                    if (!isVisible) return 0;
                    if (isHighlighted || !highlight.length) return 1;
                    return 0.8;
                  };

                  return {
                    ...(isHighlighted && {
                      "data-highlight-line": isHighlighted,
                      "data-step-active": isActive,
                    }),
                    style: {
                      opacity: getOpacity(),
                      transition: "all 0.3s ease",
                      display: "block",
                      width: "100%",
                      backgroundColor: isHighlighted
                        ? "rgba(var(--text-accent-rgb), 0.13)"
                        : "",
                    },
                  };
                }}
              >
                {codeNormalized}
              </Highlighter>
            </CodeWrapper>
          );
        }}
      </Stepper>
    </div>
  );
}

CodeStepper.mdxType = "CodeStepper";
