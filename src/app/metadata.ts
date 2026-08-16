import {
  OPEN_GRAPH_IMAGE,
  SITE_AUTHOR_NAME,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_TITLE,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE_TEMPLATE,
  SITE_TWITTER_CREATOR,
  SITE_TWITTER_SITE,
  SITE_THEME_COLOR,
  SITE_URL,
  MANIFEST_PATH,
} from "@/lib";

const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_DEFAULT_TITLE,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_AUTHOR_NAME, url: SITE_URL }],
  creator: SITE_AUTHOR_NAME,
  publisher: SITE_AUTHOR_NAME,
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: MANIFEST_PATH,
  other: {
    "theme-color": SITE_THEME_COLOR,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [OPEN_GRAPH_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    site: SITE_TWITTER_SITE,
    creator: SITE_TWITTER_CREATOR,
    images: [OPEN_GRAPH_IMAGE.url],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export async function generateMetadata() {
  return metadata;
}
