import * as fs from "node:fs/promises";

import * as glob from "glob";
import matter from "gray-matter";
import type { PluginOption } from "vite";

import type { DeckMeta } from "./helpers";
import {
  createAppDeckFile,
  createDecksIndexFile,
  createDecksPageFile,
  createIndexFile,
} from "./helpers";
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

async function extractDeckMeta(filePath: string): Promise<{
  title?: string;
  author?: string;
  date?: string;
  description?: string;
  slideCount: number;
}> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);

    // Count slides (split by --- separator, filter out layout-only blocks)
    const slides = content.split("---\n");
    const LAYOUT_REGEX = /\S*\nlayout: (.*)/g;
    let slideCount = 0;
    for (const slide of slides) {
      if (!LAYOUT_REGEX.test(slide) && slide.trim().length > 0) {
        slideCount++;
      }
      LAYOUT_REGEX.lastIndex = 0;
    }

    // Try to extract title from first heading if not in frontmatter
    let title = data.title;
    if (!title) {
      const headingMatch = content.match(/^#\s+\*{0,2}(.+?)\*{0,2}\s*$/m);
      if (headingMatch) {
        title = headingMatch[1].replace(/\*+/g, "").trim();
      }
    }

    return {
      title,
      author: data.author,
      date: data.date,
      description: data.description,
      slideCount,
    };
  } catch {
    return { slideCount: 0 };
  }
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
  const showStartupPage: boolean | undefined = options.startupPage;
  const deckConfig = {
    decks: [] as {
      originalFile: string;
      index: string;
      name: string;
    }[],
  };
  return {
    name: "react-deck",

    async config(config, env) {
      const decks = await glob.glob("./src/**/deck.mdx");
      const inputs = config.build?.rolldownOptions?.input || {};

      deckConfig.decks = decks.map((deck) => {
        const name = deck
          .replace("./src/", "")
          .replace("/deck.mdx", "")
          .replace(/\//g, " / ");
        return {
          originalFile: deck,
          index: deck.replace("/deck.mdx", "/index.html").replace("src/", ""),
          name,
        };
      });

      const isProduction = env.mode === "production";
      const startupPageEnabled =
        showStartupPage !== undefined ? showStartupPage : !isProduction;

      const newInputs = decks.map((deck) => {
        const deckPath = deck.replace("/deck.mdx", "");
        return `${deckPath.replace("src/", "")}/index.html`;
      });

      if (startupPageEnabled) {
        newInputs.unshift("index.html");
      }

      const finalInputs =
        typeof inputs === "string"
          ? [inputs, ...decks]
          : Array.isArray(inputs)
            ? [...inputs, ...decks]
            : { ...inputs, ...newInputs };

      return {
        build: {
          rolldownOptions: {
            input: finalInputs,
          },
        },
      };
    },
    configResolved(config) {
      isProd = config.isProduction;
    },

    resolveId(id) {
      if (id === "index.html" || id === "__decks.tsx") {
        return id;
      }
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
      const shouldShowStartupPage =
        showStartupPage !== undefined ? showStartupPage : !isProd;

      if (id === "index.html" && shouldShowStartupPage) {
        return createDecksIndexFile();
      }
      if (id === "__decks.tsx") {
        const decks: DeckMeta[] = await Promise.all(
          deckConfig.decks.map(async (d) => {
            const meta = await extractDeckMeta(d.originalFile);
            return {
              name: d.name,
              path: `/${d.index.replace("/index.html", "/")}`,
              title: meta.title,
              author: meta.author,
              date: meta.date,
              description: meta.description,
              slideCount: meta.slideCount,
            };
          }),
        );
        return createDecksPageFile({ decks, theme: options.theme });
      }

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
      return data;
    },

    transformIndexHtml: {
      order: "pre",
      handler: async (html, ctx) => {
        const originalUrl = ctx.originalUrl?.split("?")[0] || "";

        // Root URL → decks page
        if (originalUrl === "/" || originalUrl === "") {
          const shouldShow =
            showStartupPage !== undefined ? showStartupPage : !isProd;
          if (shouldShow) {
            return html.replace("__SCRIPT__", `__decks.tsx`);
          }
        }

        const deckDir = ctx.path.replace("/index.html", "");
        const dir = originalUrl ? `./src${originalUrl}` : `.${deckDir}`;

        const deckPath = `${dir}/deck.mdx`;
        if (await checkIfDirectoryExists(deckPath)) {
          const resolvedDeckPath = dir.startsWith(".") ? dir : `.${dir}`;
          return html.replace("__SCRIPT__", `${resolvedDeckPath}/__deck.tsx`);
        }

        // Landing page: list available decks
        const decks = await glob.glob("./src/**/deck.mdx");
        const deckLinks = decks
          .map((d) => {
            const url = `/${d.replace("src/", "").replace("/deck.mdx", "")}/`;
            const name = d.replace("src/", "").replace("/deck.mdx", "");
            return `<li><a href="${url}">${name}</a></li>`;
          })
          .join("\n");

        return html
          .replace('<script type="module" src="__SCRIPT__"></script>', "")
          .replace(
            '<div id="root"></div>',
            `<div id="root">
              <h1>Available Decks</h1>
              <ul>${deckLinks}</ul>
            </div>`,
          );
      },
    },
    configureServer(server) {
      const shouldShow = showStartupPage !== undefined ? showStartupPage : true;

      if (shouldShow) {
        server.middlewares.use(async (req, res, next) => {
          const url = req.url?.split("?")[0] || "";
          if (url === "/" || url === "/index.html") {
            const html = createDecksIndexFile();
            const transformed = await server.transformIndexHtml(
              url,
              html,
              req.originalUrl,
            );
            res.setHeader("Content-Type", "text/html");
            res.statusCode = 200;
            res.end(transformed);
            return;
          }
          next();
        });
      }

      server.httpServer?.once("listening", async () => {
        const port = server.config.server.port || 5173;

        if (shouldShow) {
          server.config.logger.info(
            `\n  Decks available at http://localhost:${port}/\n`,
          );
        } else {
          const decks = await findDecks({ port });
          for (const deck of decks) {
            server.config.logger.info(`Deck available at ${deck.deckUrl}`);
          }
        }
      });
    },
  };
};
