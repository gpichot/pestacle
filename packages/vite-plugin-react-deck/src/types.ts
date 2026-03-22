import { z } from "zod";

export interface ReactDeckOptions {
  rehypePlugins: any[];
  remarkPlugins: any[];
  theme: "green" | "purple";
  /** Show the talks listing page. Defaults to true in dev, false in production. */
  startupPage?: boolean;
}

export const PestacleConfigSchema = z.object({
  theme: z.enum(["green", "purple"]).default("green"),
  startupPage: z.boolean().optional(),
});

export type PestacleConfig = z.infer<typeof PestacleConfigSchema>;
