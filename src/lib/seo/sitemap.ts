import { ROUTES, type RouteId } from "@/data";
import { isNetlifyPreview, SITE_URL } from "./site";

const SITEMAP_PRIORITIES: Record<RouteId, number> = {
  home: 1.0,
  about: 0.8,
  projects: 0.8,
  skills: 0.7,
  blogs: 0.8,
  contact: 0.8,
};

export function getSitemap() {
  if (isNetlifyPreview) {
    return [];
  }

  return (Object.keys(SITEMAP_PRIORITIES) as RouteId[]).map((id) => ({
    url: `${SITE_URL}${ROUTES[id].href}`,
    changeFrequency: "monthly" as const,
    priority: SITEMAP_PRIORITIES[id],
  }));
}
