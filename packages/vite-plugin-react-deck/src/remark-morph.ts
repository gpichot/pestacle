import { SKIP, visit } from "unist-util-visit";

/**
 * Remark plugin that parses `{morph="name"}` attributes from MDX elements.
 *
 * In MDX, `{morph="name"}` is parsed as an `mdxTextExpression` node (since
 * curly braces are JSX expression boundaries). This plugin detects those
 * expression nodes, extracts the morph name, and sets it as an hProperty
 * on the parent element so it flows through as a React prop.
 *
 * Example:
 *   # My Title {morph="hero"}
 *
 * Becomes an h1 with props.morph = "hero", with the expression removed
 * from the children.
 */

const MORPH_EXPR_RE = /^morph\s*=\s*"([^"]+)"$/;

export function remarkMorph() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- MDX-specific node types aren't available in @types/mdast
  return (tree: any) => {
    visit(tree, "mdxTextExpression", (node: any, index: any, parent: any) => {
      if (!parent || index == null) return;

      const match = node.value.match(MORPH_EXPR_RE);
      if (!match) return;

      const morphName = match[1];

      // Remove the expression node from parent's children
      parent.children.splice(index, 1);

      // Trim trailing whitespace from the previous text sibling
      if (index > 0) {
        const prev = parent.children[index - 1];
        if (prev.type === "text") {
          prev.value = prev.value.replace(/\s+$/, "");
        }
      }

      // Set morph as an hProperty on the parent
      if (!parent.data) {
        parent.data = {};
      }
      if (!parent.data.hProperties) {
        parent.data.hProperties = {};
      }
      parent.data.hProperties.morph = morphName;

      return [SKIP, index];
    });
  };
}
