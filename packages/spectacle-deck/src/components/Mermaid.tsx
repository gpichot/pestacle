import React from "react";

export interface MermaidProps {
  chart: string;
  width?: string;
}

export function Mermaid({ chart, width = "100%" }: MermaidProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    const el = containerRef.current;
    if (!el) return;

    async function renderChart() {
      try {
        const mermaid = await import("mermaid");
        mermaid.default.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            darkMode: true,
            background: "transparent",
            primaryColor: "var(--color-primary)",
            secondaryColor: "var(--color-secondary)",
            tertiaryColor: "var(--color-tertiary)",
            primaryTextColor: "#ffffff",
            secondaryTextColor: "#ffffffcc",
            lineColor: "#ffffffaa",
          },
        });
        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg: rendered } = await mermaid.default.render(id, chart);
        if (!cancelled && el) {
          el.innerHTML = rendered;
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    }

    renderChart();
    return () => {
      cancelled = true;
      if (el) el.replaceChildren();
    };
  }, [chart]);

  if (error) {
    return (
      <div
        style={{
          color: "#ff6b6b",
          fontFamily: "monospace",
          fontSize: "1rem",
          padding: "1rem",
          border: "1px solid #ff6b6b33",
          borderRadius: "0.5rem",
        }}
      >
        Mermaid error: {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
