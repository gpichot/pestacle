import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactDeck from "vite-plugin-react-deck";
import rehypeHighlight from "rehype-highlight";

export default defineConfig({
  clearScreen: false,
  plugins: [
    react({}),
    reactDeck({
      rehypePlugins: [rehypeHighlight],
    }),
  ],
});
