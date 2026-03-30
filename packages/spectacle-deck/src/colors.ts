/**
 * Extract colors from `rgb(...) or rgba(...)` string or #hex string
 */
export function extractColors(color: string): {
  r: number;
  g: number;
  b: number;
} | null {
  if (color.startsWith("rgb")) {
    const [r, g, b] = color
      .replace("rgb(", "")
      .replace("rgba(", "")
      .replace(")", "")
      .split(",")
      .map((c) => parseInt(c.trim(), 10));
    return { r, g, b };
  } else if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

/**
 * Generate CSS custom properties for a set of colors under a given prefix.
 * For each entry, produces `--{prefix}-{key}: value;` and, when parseable,
 * `--{prefix}-{key}-rgb: r, g, b;` for use with rgba().
 */
function cssVarsForGroup(
  prefix: string,
  entries: { [key: string]: string },
): string {
  const base = Object.entries(entries)
    .map(([key, value]) => `--${prefix}-${key}: ${value};`)
    .join("\n");
  const rgbs = Object.entries(entries)
    .map(([key, value]) => {
      const color = extractColors(value);
      if (!color) return "";
      const { r, g, b } = color;
      return `--${prefix}-${key}-rgb: ${r}, ${g}, ${b};`;
    })
    .filter(Boolean)
    .join("\n");

  return `${base}\n${rgbs}`;
}

export interface ThemeTokens {
  text: { base: string; muted: string; accent: string };
  bg: { base: string; surface: string; elevated: string };
  border: string;
  fonts?: { header?: string; text?: string };
}

/**
 * Create CSS custom properties for theme tokens.
 *
 * Produces `--text-*`, `--bg-*`, and `--border` variables
 * (each color also gets a `-rgb` variant when parseable).
 */
export function createCssVariables(tokens: ThemeTokens): string {
  const parts = [
    cssVarsForGroup("text", tokens.text),
    cssVarsForGroup("bg", tokens.bg),
  ];

  // Border as a single variable
  parts.push(`--border: ${tokens.border};`);
  const borderRgb = extractColors(tokens.border);
  if (borderRgb) {
    parts.push(`--border-rgb: ${borderRgb.r}, ${borderRgb.g}, ${borderRgb.b};`);
  }

  return parts.join("\n");
}
