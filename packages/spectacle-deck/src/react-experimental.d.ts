// React experimental: ViewTransition component (not yet in stable @types/react)
import type React from "react";

declare module "react" {
  export const ViewTransition: React.FC<{
    name?: string;
    children: React.ReactNode;
  }>;
}
