export {
  SITE_URL,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_DEFAULT_TITLE,
  SITE_TITLE_TEMPLATE,
  SITE_DEFAULT_DESCRIPTION,
  SITE_AUTHOR_NAME,
  SITE_TWITTER_SITE,
  SITE_TWITTER_CREATOR,
  OPEN_GRAPH_IMAGE,
  SITE_THEME_COLOR,
  PWA_BACKGROUND_COLOR,
  PWA_THEME_COLOR,
  PWA_ICON_192,
  PWA_ICON_512,
  MANIFEST_PATH,
  BLOG_RSS_PATH,
  PWA_CATEGORIES,
  isNetlifyPreview,
} from "./site";

export {
  rootMetadata,
  generateRootMetadata,
  createPageMetadata,
} from "./metadata";

export { rootViewport } from "./viewport";

export {
  getPersonJsonLd,
  getWebSiteJsonLd,
  getBlogPostingJsonLd,
  getBreadcrumbListJsonLd,
  getRouteBreadcrumbJsonLd,
  getProfilePageJsonLd,
  getContactPageJsonLd,
  getCollectionPageJsonLd,
} from "./json-ld";

export { default as JsonLd } from "./JsonLd";
export { default as SkipLink } from "./SkipLink";
export { default as IndieAuthLinks } from "./IndieAuthLinks";
