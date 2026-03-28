import React from "react";

export interface Command {
  id: string;
  label: string;
  shortcut?: string;
  action: () => void;
}

export function CommandPalette({
  commands,
  onClose,
}: {
  commands: Command[];
  onClose: () => void;
}) {
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const filtered = React.useMemo(() => {
    if (!query) return commands;
    const q = query.toLowerCase();
    return commands.filter((cmd) => cmd.label.toLowerCase().includes(q));
  }, [commands, query]);

  // Reset selection when filter changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset on filter change
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [filtered]);

  // Focus input on mount
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll selected item into view
  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.children[selectedIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  // Use refs so the capture listener always sees latest state
  const filteredRef = React.useRef(filtered);
  filteredRef.current = filtered;
  const selectedIndexRef = React.useRef(selectedIndex);
  selectedIndexRef.current = selectedIndex;

  // Capture-phase listener: intercept ALL keydown events while the palette
  // is open so they never reach the deck navigation handler.
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Stop the event from propagating to any other listeners (deck nav)
      e.stopPropagation();

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((i) =>
            Math.min(i + 1, filteredRef.current.length - 1),
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter": {
          e.preventDefault();
          const cmd = filteredRef.current[selectedIndexRef.current];
          if (cmd) {
            cmd.action();
            onClose();
          }
          break;
        }
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () =>
      document.removeEventListener("keydown", handleKeyDown, {
        capture: true,
      });
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "20vh",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={() => {
        /* handled by capture-phase listener */
      }}
    >
      <div
        style={{
          width: "min(500px, 90vw)",
          background: "#1e1e2e",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Search input */}
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command..."
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: "15px",
              fontFamily: "inherit",
              padding: 0,
            }}
          />
        </div>

        {/* Command list */}
        <div
          ref={listRef}
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            padding: "4px 0",
          }}
        >
          {filtered.length === 0 && (
            <div
              style={{
                padding: "16px",
                color: "rgba(255,255,255,0.4)",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              No matching commands
            </div>
          )}
          {filtered.map((cmd, index) => (
            <button
              key={cmd.id}
              type="button"
              onClick={() => {
                cmd.action();
                onClose();
              }}
              onMouseEnter={() => setSelectedIndex(index)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "8px 16px",
                border: "none",
                background:
                  index === selectedIndex
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                color: "#fff",
                fontSize: "14px",
                fontFamily: "inherit",
                cursor: "pointer",
                textAlign: "left",
                outline: "none",
              }}
            >
              <span>{cmd.label}</span>
              {cmd.shortcut && (
                <span
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "12px",
                    marginLeft: "16px",
                    flexShrink: 0,
                  }}
                >
                  {cmd.shortcut}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
