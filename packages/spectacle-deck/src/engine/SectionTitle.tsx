/**
 * Displays the current section title as a sticky header at the top of the slide.
 *
 * The section title is derived from the `section` frontmatter field.
 * Once set on a slide, it persists on subsequent slides until changed or
 * explicitly cleared (by setting `section: ""` or `section: false`).
 */
export function SectionTitle({ title }: { title: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        padding: "0.7cqh 1.4cqw",
        display: "flex",
        alignItems: "center",
        gap: "0.6cqw",
        pointerEvents: "none",
        opacity: title ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          width: 3,
          height: "1.2cqw",
          borderRadius: 2,
          background: "var(--color-secondary, #ffffff)",
          opacity: 0.4,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: "1.3cqw",
          fontWeight: 500,
          color: "var(--color-primary, #ffffff)",
          opacity: 0.45,
          fontFamily: "var(--font-header, inherit)",
          letterSpacing: "0.04cqw",
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>
    </div>
  );
}

/**
 * Compute the current section title for a given slide index.
 * Walks backward through slides to find the most recent `section` frontmatter.
 * A falsy value (empty string, false) explicitly clears the section.
 */
export function getCurrentSection(
  slides: { metadata: Record<string, unknown> }[],
  slideIndex: number,
): string {
  for (let i = slideIndex; i >= 0; i--) {
    const section = slides[i]?.metadata?.section;
    if (section !== undefined) {
      // Explicit falsy clears the section
      return section ? String(section) : "";
    }
  }
  return "";
}
