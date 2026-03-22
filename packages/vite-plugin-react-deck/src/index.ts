import * as fs from "node:fs/promises";
import path from "node:path";

import * as glob from "glob";
import type { PluginOption } from "vite";

import { createAppDeckFile, createIndexFile } from "./helpers";
import { transformSlidesMdxToReact } from "./slides";
import type { ReactDeckOptions } from "./types";

export { defineConfig } from "./config";

async function checkIfDirectoryExists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function findDecks({ port }: { port: number }) {
  const decks = await glob.glob("./src/**/deck.mdx");

  return decks.map((deck) => ({
    deckFile: deck,
    deckUrl: `http://localhost:${port}/${deck.replace("src/", "").replace("deck.mdx", "")}`,
  }));
}

async function fileExists(_name: string, path: string) {
  const candidateExts = [".ts", ".tsx", ".js", ".jsx"];
  for await (const ext of candidateExts) {
    const fullPath = `${path}${ext}`;
    try {
      await fs.access(fullPath);
      return fullPath.replace(/^\./, "");
    } catch {}
  }
}

async function loadCustomConfig() {
  const layoutsFile = await fileExists("layouts", "./pestacle/layouts");

  return {
    layoutsFile: layoutsFile,
  };
}

export default async (options: ReactDeckOptions): Promise<PluginOption> => {
  let isProd = false;
  const deckConfig = {
    decks: [] as {
      originalFile: string;
      index: string;
    }[],
  };
  return {
    name: "react-deck",

    async config(config) {
      const decks = await glob.glob("./src/**/deck.mdx");
      const inputs = config.build?.rollupOptions?.input || {};

      deckConfig.decks = decks.map((deck) => ({
        originalFile: deck,
        index: deck.replace("/deck.mdx", "/index.html").replace("src/", ""),
      }));

      const newInputs = decks.reduce((acc, deck) => {
        const deckPath = deck.replace("/deck.mdx", "");
        return [...acc, `${deckPath.replace("src/", "")}/index.html`];
      }, [] as string[]);

      const finalInputs =
        typeof inputs === "string"
          ? [inputs, ...decks]
          : Array.isArray(inputs)
            ? [...inputs, ...decks]
            : { ...inputs, ...newInputs };

      return {
        ...config,
        build: {
          ...config.build,
          rollupOptions: {
            ...config.build?.rollupOptions,
            input: finalInputs,
          },
        },
      };
    },
    configResolved(config) {
      isProd = config.isProduction;
    },

    resolveId(id) {
      if (deckConfig.decks.some((deck) => deck.index === id)) {
        return id;
      }
      if (id.endsWith("__deck.tsx")) {
        return id;
      }
      if (id.endsWith("deck.mdx")) {
        return id;
      }
    },

    async load(id) {
      const config = await loadCustomConfig();
      const deck = deckConfig.decks.find((deck) => deck.index === id);
      if (deck) {
        return createIndexFile({
          entrypoint: deck.originalFile.replace("deck.mdx", "__deck.tsx"),
        });
      }

      // Return file app
      if (id.endsWith("__deck.tsx")) {
        const directory = id.replace("/__deck.tsx", "");
        const dir = directory.startsWith(".") ? directory : `./${directory}`;
        const path = `${dir}/deck.mdx`;
        if (!(await checkIfDirectoryExists(path))) {
          this.warn(`No deck.mdx file found in ${path}`);
          return;
        }

        const contentIndex = createAppDeckFile({
          slidePath: `${directory}/deck.mdx`,
          theme: options.theme,
          config,
        });
        return contentIndex;
      }
      if (!id.endsWith("deck.mdx")) {
        return;
      }

      const content = await fs.readFile(id, "utf-8");
      const data = await transformSlidesMdxToReact(content, {
        production: isProd,
        ...options,
      });
      const _dir = path.relative(process.cwd(), id);
      return data /*.replace(
        /\.\/assets/gi,
        `/${dir.replace("deck.mdx", "")}assets`
      )*/;
    },

    transformIndexHtml: {
      order: "pre",
      handler: async (html, ctx) => {
        const originalUrl = ctx.originalUrl?.split("?")[0] || "";
        const deckDir = ctx.path.replace("/index.html", "");
        const dir = originalUrl ? `./src${originalUrl}` : `.${deckDir}`;

        const path = `${dir}/deck.mdx`;
        if (!(await checkIfDirectoryExists(path))) {
          return html.replace("__SCRIPT__", `./src/main.tsx`);
        }

        const deckPath = dir.startsWith(".") ? dir : `.${dir}`;
        return html.replace("__SCRIPT__", `${deckPath}/__deck.tsx`);
      },
    },
    configureServer(server) {
      server.httpServer?.once("listening", async () => {
        const port = server.config.server.port || 5173;

        const decks = await findDecks({ port });

        for (const deck of decks) {
          server.config.logger.info(`Deck available at ${deck.deckUrl}`);
        }
      });
    },
  };
};
