import { z } from "zod";

export interface ReactDeckOptions {
  rehypePlugins: any[];
  remarkPlugins: any[];
  theme: "green" | "purple";
}

export const PestacleConfigSchema = z.object({
  theme: z.enum(["green", "purple"]).default("green"),
});

export type PestacleConfig = z.infer<typeof PestacleConfigSchema>;
