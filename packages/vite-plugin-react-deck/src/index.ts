import * as fs from "node:fs/promises";
import { PluginOption } from "vite";
import { transformSlidesMdxToReact } from "./slides";
import { createAppDeckFile, createIndexFile } from "./helpers";
import * as glob from "glob";
import { ReactDeckOptions } from "./types";
import path from "node:path";

async function checkIfDirectoryExists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export default (options: ReactDeckOptions): PluginOption => {
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
          console.warn(`No deck.mdx file found in ${path}`);
          return;
        }

        const contentIndex = createAppDeckFile({
          slidePath: `${directory}/deck.mdx`,
        });
        return contentIndex;
      }
      if (!id.endsWith("deck.mdx")) {
        // console.log('passing')
        return;
      }

      const content = await fs.readFile(id, "utf-8");
      const data = await transformSlidesMdxToReact(content, {
        production: isProd,
        ...options,
      });
      const dir = path.relative(process.cwd(), id);
      return data /*.replace(
        /\.\/assets/gi,
        `/${dir.replace("deck.mdx", "")}assets`
      )*/;
    },

    transformIndexHtml: {
      order: "pre",
      enforce: "pre",
      transform: async (html, ctx) => {
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
  };
};

