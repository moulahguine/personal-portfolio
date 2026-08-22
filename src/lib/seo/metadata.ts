import type { Metadata } from "next";

import {
  MANIFEST_PATH,
  OPEN_GRAPH_IMAGE,
  SITE_AUTHOR_NAME,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_TITLE,
  SITE_NAME,
  SITE_THEME_COLOR,
  SITE_TITLE_TEMPLATE,
  SITE_TWITTER_CREATOR,
  SITE_TWITTER_SITE,
  SITE_URL,
} from "./site";

interface PageMetadataInput {
  title: Metadata["title"];
  description: Metadata["description"];
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_DEFAULT_TITLE,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
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

export async function generateRootMetadata() {
  return rootMetadata;
}

export function createPageMetadata(
  path: `/${string}`,
  { title, description }: PageMetadataInput,
): Metadata {
  const url = `${SITE_URL}${path}`;
  const pageTitle = typeof title === "string" ? title : undefined;
  const pageDescription =
    typeof description === "string" ? description : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: pageTitle,
      description: pageDescription,
      url,
      images: [OPEN_GRAPH_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_TWITTER_SITE,
      creator: SITE_TWITTER_CREATOR,
      title: pageTitle,
      description: pageDescription,
      images: [OPEN_GRAPH_IMAGE.url],
    },
  };
}
