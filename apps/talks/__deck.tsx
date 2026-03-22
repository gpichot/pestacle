import { Deck } from "@gpichot/spectacle-deck";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";

import deck from "${slidePath}";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <StrictMode>
    <Deck deck={deck} />
  </StrictMode>,
);
