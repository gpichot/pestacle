import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactDeck from "vite-plugin-react-deck";

export default defineConfig({
  clearScreen: false,
  plugins: [
    react({}),
    reactDeck({
      rehypePlugins: [],
    }),
  ],
});
