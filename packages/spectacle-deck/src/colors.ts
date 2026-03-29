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

/**
 * Create CSS custom properties for theme colors and backgrounds.
 *
 * Accepts either the legacy flat format `{ primary, secondary, tertiary }`
 * (produces `--color-*` variables only) or the new split format with separate
 * `colors` and `backgrounds` objects (produces `--color-*` and `--bg-*`).
 */
export function createCssVariables(
  colors: { [key: string]: string },
  backgrounds?: { [key: string]: string },
): string {
  const parts = [cssVarsForGroup("color", colors)];
  if (backgrounds) {
    parts.push(cssVarsForGroup("bg", backgrounds));
  }
  return parts.join("\n");
}
