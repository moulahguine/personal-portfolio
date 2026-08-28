import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      require.resolve("remark-frontmatter"),
      require.resolve("remark-unwrap-images"),
    ],
    rehypePlugins: [require.resolve("rehype-mdx-import-media")],
  },
});

export default withMDX(nextConfig);
