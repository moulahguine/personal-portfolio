import type { MetadataRoute } from "next";
import { ROUTES, type RouteId } from "@/data";
import { getBlogPosts } from "@/server/blog.server";
import { isNetlifyPreview, SITE_URL } from "./site";

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = NonNullable<SitemapEntry["changeFrequency"]>;

interface StaticRouteConfig {
  priority: number;
  changeFrequency: ChangeFrequency;
}

const STATIC_ROUTES: Record<RouteId, StaticRouteConfig> = {
  home: { priority: 1.0, changeFrequency: "weekly" },
  about: { priority: 0.9, changeFrequency: "weekly" },
  projects: { priority: 0.9, changeFrequency: "weekly" },
  skills: { priority: 0.9, changeFrequency: "monthly" },
  blogs: { priority: 0.9, changeFrequency: "weekly" },
  contact: { priority: 0.9, changeFrequency: "yearly" },
};

export function getSitemap(): MetadataRoute.Sitemap {
  if (isNetlifyPreview) {
    return [];
  }

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = (
    Object.keys(STATIC_ROUTES) as RouteId[]
  ).map((id) => ({
    url: `${SITE_URL}${ROUTES[id].href}`,
    lastModified: now,
    changeFrequency: STATIC_ROUTES[id].changeFrequency,
    priority: STATIC_ROUTES[id].priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: `${SITE_URL}${ROUTES.blogs.href}/${post.slug}`,
    lastModified: new Date(post.updated ?? post.dateTime),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const latestPost = blogEntries[0];

  if (latestPost?.lastModified) {
    const blogsIndex = staticEntries.find(
      (entry) => entry.url === `${SITE_URL}${ROUTES.blogs.href}`,
    );

    if (blogsIndex) {
      blogsIndex.lastModified = latestPost.lastModified;
    }
  }

  return [...staticEntries, ...blogEntries];
}
