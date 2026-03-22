import { describe, expect, it } from "vitest";

import { parseStepDirectives } from "./code-directives";

function splitDirectives(str: string): string[] {
  return str.trim().split("\n");
}

describe("parseStepDirectives", () => {
  it("should reduce properly with showLines", () => {
    const directives = splitDirectives(`
      // @step showLines(1-3) highlight(1-3)
      // @step showLines(4-6) highlight(4-6)
    `);

    const result = parseStepDirectives(directives);
    expect(result[0]).toEqual({ hiddenLines: [4, 5, 6], highlight: [1, 2, 3] });
    expect(result[1]).toEqual({ hiddenLines: [], highlight: [4, 5, 6] });
  });

  it("should reduce properly with highlight", () => {
    const directives = splitDirectives(`
      // @step highlight(3)
      // @step showLines(4) highlight(4)
    `);

    const result = parseStepDirectives(directives);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ hiddenLines: [4], highlight: [3] });
    expect(result[1]).toEqual({ hiddenLines: [], highlight: [4] });
  });

  it("parse only highlights", () => {
    const directives = splitDirectives(`
      // @step highlight(6)
      // @step highlight(7-9)
      // @step highlight(10)
    `);

    const result = parseStepDirectives(directives);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ hiddenLines: [], highlight: [6] });
    expect(result[1]).toEqual({ hiddenLines: [], highlight: [7, 8, 9] });
    expect(result[2]).toEqual({ hiddenLines: [], highlight: [10] });
  });

  it("parses typescript lines", () => {
    const directives = splitDirectives(`
      // @step highlight(3) name("(string|number)[]")
    `);

    const result = parseStepDirectives(directives);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      hiddenLines: [],
      highlight: [3],
      name: "(string|number)[]",
    });
  });
});
