import React from "react";

/**
 * Context used by the Notes component to report its content
 * to the PresenterMode view. When the context value is set,
 * Notes will call it with its children so PresenterMode can
 * display them in the speaker notes panel.
 */
export const NotesContext = React.createContext<
  ((notes: React.ReactNode) => void) | null
>(null);
