import { getSitemap } from "@/lib/seo/sitemap";

export const dynamic = "force-static";

export default function sitemap() {
  return getSitemap();
}
