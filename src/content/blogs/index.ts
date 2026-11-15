import type { ComponentType } from "react";
import path from "node:path";

const blogPosts = import.meta.glob("./*/index.mdx", { eager: true }) as Record<
  string,
  { default: ComponentType }
>;

export const blogComponents = Object.fromEntries(
  Object.entries(blogPosts).map(([filePath, module]) => [
    path.basename(path.dirname(filePath)),
    module.default,
  ]),
);

const blogCardVisualModules = import.meta.glob("./*/MdxTransformVisual.tsx", {
  eager: true,
}) as Record<string, { default: ComponentType }>;

export const blogCardVisuals = Object.fromEntries(
  Object.entries(blogCardVisualModules).map(([filePath, module]) => [
    path.basename(path.dirname(filePath)),
    module.default,
  ]),
);
