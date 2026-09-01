import type { Metadata } from "next";

import {
  BLOG_RSS_PATH,
  isNetlifyPreview,
  MANIFEST_PATH,
  OPEN_GRAPH_IMAGE,
  SITE_AUTHOR_NAME,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_TITLE,
  SITE_NAME,
  SITE_TITLE_TEMPLATE,
  SITE_TWITTER_CREATOR,
  SITE_TWITTER_SITE,
  SITE_URL,
} from "./site";

const RSS_ALTERNATE_TYPES = {
  "application/rss+xml": `${SITE_URL}${BLOG_RSS_PATH}`,
};

// ---- verification ----
const GOOGLE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;
const BING_VERIFICATION = process.env.BING_SITE_VERIFICATION;

const verification: Metadata["verification"] | undefined =
  GOOGLE_VERIFICATION || BING_VERIFICATION
    ? {
        ...(GOOGLE_VERIFICATION ? { google: GOOGLE_VERIFICATION } : {}),
        ...(BING_VERIFICATION
          ? { other: { "msvalidate.01": BING_VERIFICATION } }
          : {}),
      }
    : undefined;

// ---- indexation (preview-safe) ----
const shouldIndex = !isNetlifyPreview;

interface BasePageMetadataInput {
  title: Metadata["title"];
  description: Metadata["description"];
  image?: string;
}

interface WebsitePageMetadataInput extends BasePageMetadataInput {
  variant?: "website";
}

interface ArticlePageMetadataInput extends BasePageMetadataInput {
  variant: "article";
  publishedTime: string;
  modifiedTime?: string;
  authors: string[];
  tags?: string[];
  section?: string;
}

type PageMetadataInput = WebsitePageMetadataInput | ArticlePageMetadataInput;

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
    index: shouldIndex,
    follow: shouldIndex,
    googleBot: {
      index: shouldIndex,
      follow: shouldIndex,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: MANIFEST_PATH,
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  ...(verification ? { verification } : {}),
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
    types: RSS_ALTERNATE_TYPES,
  },
};

export async function generateRootMetadata() {
  return rootMetadata;
}

function toOpenGraphImages(image: string | undefined) {
  if (!image) {
    return [OPEN_GRAPH_IMAGE];
  }

  return [{ ...OPEN_GRAPH_IMAGE, url: image }];
}

export function createPageMetadata(
  path: `/${string}`,
  input: PageMetadataInput,
): Metadata {
  const { title, description, image } = input;
  const url = `${SITE_URL}${path}`;
  const pageTitle = typeof title === "string" ? title : undefined;
  const pageDescription =
    typeof description === "string" ? description : undefined;

  const images = toOpenGraphImages(image);
  const twitterImages = images.map((img) => img.url);

  const openGraphBase = {
    locale: "en_US",
    siteName: SITE_NAME,
    title: pageTitle,
    description: pageDescription,
    url,
    images,
  };

  const openGraph: Metadata["openGraph"] =
    input.variant === "article"
      ? {
          ...openGraphBase,
          type: "article",
          publishedTime: input.publishedTime,
          modifiedTime: input.modifiedTime ?? input.publishedTime,
          authors: input.authors,
          ...(input.tags && input.tags.length > 0 ? { tags: input.tags } : {}),
          ...(input.section ? { section: input.section } : {}),
        }
      : {
          ...openGraphBase,
          type: "website",
        };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      types: RSS_ALTERNATE_TYPES,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      site: SITE_TWITTER_SITE,
      creator: SITE_TWITTER_CREATOR,
      title: pageTitle,
      description: pageDescription,
      images: twitterImages,
    },
  };
}
