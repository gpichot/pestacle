/**
 * The Code Stepper component is a component that allows you to step through
 * the code using familiar directives.
 *
 * @example "@step showLines(1-3)" will show lines 1-3
 * @example "@step highlight(1-3)" will highlight lines 1-3
 *
 */

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

/**
 * Function parse ranges list
 */
function parseRangeList(str: string): number[] {
  return str.split(",").reduce((acc, line) => {
    if (!line.includes("-")) return [...acc, parseInt(line, 10)];

    const [start, end] = line.split("-").map(Number);
    return [...acc, ...range(start, end)];
  }, [] as number[]);
}

/**
 * Parse showLines fn
 *
 * "showLines(1-3)" => [1, 2, 3]
 * "showLines(1,3)" => [1,3]
 * "showLines(1-2,4-5)" => [1,2,4,5]
 */
function parseShowLines(directive: string): { showLines: number[] } | null {
  const match = directive.match(/showLines\((.*)\)/);
  if (!match) return null;

  const lines = parseRangeList(match[1]);

  return { showLines: lines };
}

/**
 * Parse highlight fn
 *
 * "highlight(1-3)" => [1,2,3]
 * etc.
 */
function parseHighlight(directive: string): { highlight: number[] } | null {
  const match = directive.match(/highlight\((.*)\)/);
  if (!match) return null;

  const lines = parseRangeList(match[1]);

  return { highlight: lines };
}

type StepDirective = {
  showLines?: number[];
  highlight?: number[];
  name?: string;
};

/**
 * Parse name fn
 *
 * "name("my name")" => "my name"
 */
function parseName(directive: string): { name: string } | null {
  const match = directive.match(/name\("(.*)"\)/);
  if (!match) return null;

  return { name: match[1] };
}

/**
 * Parse step directive
 *
 * @example "@step showLines(1-3) highlight(1-3)"
 * @example "@step showLines(1-3)"
 * @example "@step highlight(1-3)"
 */
function parseStepDirective(directive: string): StepDirective {
  // Should match a showLines(1-3) or highlight(1-3) directive
  // Should match name("(string)")
  const regex = /showLines\([^)]+\)|highlight\([^)]+\)|name\("(.*)"\)/g;

  const directives = directive.match(regex) || [];

  const name = directives.map(parseName).find(Boolean);
  const showLines = directives.map(parseShowLines).find(Boolean);
  const highlight = directives.map(parseHighlight).find(Boolean);

  return { ...showLines, ...highlight, ...name };
}

export type Step = {
  hiddenLines: number[];
  highlight: number[];
  name?: string;
};

/**
 * Reduce steps directives
 */
export function combineStepDirectives(directives: StepDirective[]): Step[] {
  let hiddenLines = directives.reduce((acc, { showLines }) => {
    if (!showLines) return acc;

    return [...acc, ...showLines];
  }, [] as number[]);

  return directives.map(({ highlight, showLines, name }) => {
    hiddenLines = hiddenLines.filter((line) => !showLines?.includes(line));
    return {
      highlight: highlight || [],
      hiddenLines,
      name,
    };
  });
}

/**
 * Parse step directives
 */
export function parseStepDirectives(directives: string[]): Step[] {
  const parsedDirectives = directives.map(parseStepDirective);

  return combineStepDirectives(parsedDirectives);
}
