import type { ComponentType } from "react";
import path from "node:path";

const blogPosts = import.meta.glob("./*.mdx", { eager: true }) as Record<
  string,
  { default: ComponentType }
>;

export const blogComponents = Object.fromEntries(
  Object.entries(blogPosts).map(([filePath, module]) => [
    path.basename(filePath, ".mdx"),
    module.default,
  ]),
);
