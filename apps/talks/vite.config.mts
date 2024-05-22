import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactDeck from "vite-plugin-react-deck";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export default defineConfig({
  clearScreen: false,
  plugins: [
    react({}),
    reactDeck({
      rehypePlugins: [rehypeKatex],
      remarkPlugins: [remarkMath],
      theme: "purple",
    }),
  ],
});
