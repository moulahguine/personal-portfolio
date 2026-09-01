export const SITE_URL = "https://mohamedoulahguine.dev";

export const SITE_NAME = "Mohamed Oulahguine";
export const SITE_SHORT_NAME = "oulahguine";
export const SITE_DEFAULT_TITLE = "Mohamed Oulahguine • Frontend Developer";
export const SITE_TITLE_TEMPLATE = "%s | Mohamed Oulahguine";

export const BLOG_RSS_PATH = "/blog/feed.xml";

export const SITE_DEFAULT_DESCRIPTION =
  "I’m a frontend engineer focused on building accessible, performant, and well-crafted web experiences with React and Next.js.";

export const SITE_AUTHOR_NAME = "Mohamed Oulahguine";
export const SITE_TWITTER_SITE = "@moulahguine";
export const SITE_TWITTER_CREATOR = "@moulahguine";

export const OPEN_GRAPH_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Mohamed Oulahguine — Frontend Developer portfolio",
  type: "image/png",
} as const;

export const SITE_THEME_COLOR = "#ffe023";
export const PWA_BACKGROUND_COLOR = "#ffe023";
export const PWA_THEME_COLOR = "#1a1a1c";

export const PWA_ICON_192 = "/favicon/web-app-manifest-192x192.png";
export const PWA_ICON_512 = "/favicon/web-app-manifest-512x512.png";
export const MANIFEST_PATH = "/manifest.webmanifest";

export const PWA_CATEGORIES = [
  "development",
  "portfolio",
  "productivity",
  "technology",
] as const;

export const isNetlifyPreview =
  Boolean(process.env.CONTEXT) && process.env.CONTEXT !== "production";
