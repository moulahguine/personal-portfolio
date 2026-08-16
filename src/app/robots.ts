import { SITE_URL } from "@/lib";

export const dynamic = "force-static";
const isNetlifyPreview =
  process.env.CONTEXT && process.env.CONTEXT !== "production";

export default function robots() {
  if (isNetlifyPreview) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
