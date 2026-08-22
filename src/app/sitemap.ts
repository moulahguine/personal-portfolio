import { getSitemap } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap() {
  return getSitemap();
}
