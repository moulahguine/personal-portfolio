import { SITE_URL } from "@/lib";

export const dynamic = "force-static";

const isNetlifyPreview =
  process.env.CONTEXT && process.env.CONTEXT !== "production";

const staticRoutes = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.8 },
  { path: "/projects", priority: 0.8 },
  { path: "/skills", priority: 0.7 },
  { path: "/blog", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap() {
  if (isNetlifyPreview) {
    return [];
  }

  const lastModified = new Date();

  return staticRoutes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
