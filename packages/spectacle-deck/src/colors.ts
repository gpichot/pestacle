/**
 * Extract colors from `rgb(...) or rgba(...)` string or #hex string
 */
export function extractColors(color: string): {
  r: number;
  g: number;
  b: number;
} {
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
  throw new Error(`Invalid color format: ${color}`);
}

/**
 * Create vars for css colors
 */
export function createCssVariables(colors: { [key: string]: string }) {
  const base = Object.entries(colors)
    .map(([key, value]) => `--color-${key}: ${value};`)
    .join("\n");
  const rgbs = Object.entries(colors)
    .map(([key, value]) => {
      const { r, g, b } = extractColors(value);
      return `--color-${key}-rgb: ${r}, ${g}, ${b};`;
    })
    .join("\n");

  return `${base}\n${rgbs}`;
}
