import { z } from "zod";

export const TransitionNames = ["fade", "slide", "drop", "none"] as const;
export type TransitionName = (typeof TransitionNames)[number];

export interface ReactDeckOptions {
  rehypePlugins: any[];
  remarkPlugins: any[];
  theme: "dark" | "green" | "purple" | "solarized-light";
  /** Show the talks listing page. Defaults to true in dev, false in production. */
  startupPage?: boolean;
  /** Default slide transition. */
  transition?: TransitionName;
}

export const PestacleConfigSchema = z.object({
  theme: z
    .enum(["dark", "green", "purple", "solarized-light"])
    .default("green"),
  startupPage: z.boolean().optional(),
  transition: z.enum(["fade", "slide", "drop", "none"]).optional(),
});

export type PestacleConfig = z.infer<typeof PestacleConfigSchema>;
