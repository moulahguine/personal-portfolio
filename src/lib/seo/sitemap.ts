import { isNetlifyPreview, SITE_URL } from "./site";

const staticRoutes = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.8 },
  { path: "/projects", priority: 0.8 },
  { path: "/skills", priority: 0.7 },
  { path: "/blog", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
] as const;

export function getSitemap() {
  if (isNetlifyPreview) {
    return [];
  }

  return staticRoutes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
