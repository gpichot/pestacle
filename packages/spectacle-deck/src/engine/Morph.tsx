import React from "react";

export interface MorphProps {
  /**
   * A unique name for this morphable element. Elements with the same `name`
   * on different slides will morph (animate position, size, shape) during
   * view transitions.
   *
   * Uses React's <React.ViewTransition> component which coordinates with the
   * browser's View Transitions API automatically via startTransition.
   * Names must be unique within a single slide.
   */
  name: string;
  /** HTML tag to render. Defaults to "div". */
  as?: keyof React.JSX.IntrinsicElements;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Additional CSS class */
  className?: string;
  children?: React.ReactNode;
}

/**
 * Morph — marks an element for cross-slide morphing via React ViewTransition.
 *
 * Usage in MDX:
 * ```mdx
 * <Morph name="title">
 *   # My Title
 * </Morph>
 * ```
 *
 * On the next slide, use the same name:
 * ```mdx
 * <Morph name="title" style={{ fontSize: "0.5em" }}>
 *   # My Title
 * </Morph>
 * ```
 *
 * The browser will automatically animate the element's position, size,
 * and visual properties between the two slides.
 */
export function Morph({
  name,
  as: Tag = "div",
  style,
  className,
  children,
}: MorphProps) {
  return (
    <React.ViewTransition name={name}>
      <Tag className={className} style={style}>
        {children}
      </Tag>
    </React.ViewTransition>
  );
}

/**
 * MorphImage — a convenience wrapper for images that should morph between slides.
 */
export function MorphImage({
  name,
  src,
  alt = "",
  style,
  className,
}: {
  name: string;
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <React.ViewTransition name={name}>
      <img src={src} alt={alt} className={className} style={style} />
    </React.ViewTransition>
  );
}
