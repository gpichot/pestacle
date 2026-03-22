import react from "@vitejs/plugin-react";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { defineConfig, type UserConfig } from "vite";
import reactDeck from "vite-plugin-react-deck";

const watchedPackages = ["vite-plugin-react-deck", "@gpichot/spectacle-deck"];

function watchPackages(
  modules: string[],
): NonNullable<UserConfig["plugins"]>[number] {
  return {
    name: "watch-node-modules",
    configureServer: (server) => {
      const regexp = `/node_modules\\/(?!${modules.join("|")}).*/`;
      server.watcher.options = {
        ...server.watcher.options,
        ignored: [
          "**/.git/**",
          "**/test-results/**",
          new RegExp(regexp),
          "!**/node_modules/@gpichot/spectacle-deck/**",
          "!**/node_modules/vite-plugin-react-deck/**",
        ],
      };
      // @ts-expect-error _userIgnored is not in the types
      server.watcher._userIgnored = undefined;
    },
    config() {
      return {
        optimizeDeps: {
          exclude: modules,
        },
        server: {
          watch: {
            ignored: modules.map((m) => `!**/node_modules/${m}/**`),
          },
        },
      };
    },
  };
}

export default defineConfig({
  clearScreen: false,
  optimizeDeps: {
    exclude: watchedPackages,
  },
  plugins: [
    react({}),
    watchPackages(watchedPackages),
    reactDeck({
      rehypePlugins: [rehypeKatex],
      remarkPlugins: [remarkMath],
      theme: "purple",
    }),
  ],
});
