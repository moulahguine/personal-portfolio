import { DEFAULT_AUTHOR_ID, ROUTES, type Author, RouteId } from "@/data";

import {
  OPEN_GRAPH_IMAGE,
  SITE_DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./site";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// ---- helpers ----
function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) {
    return pathOrUrl;
  }

  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

function routeUrl(routeId: RouteId): string {
  return toAbsoluteUrl(ROUTES[routeId].href);
}

// ---- person (site owner) ----
interface PersonJsonLdInput {
  name: string;
  jobTitle: string;
  location: string;
  techStack: string[];
  sameAs: string[];
  nationality?: string;
}

export function getPersonJsonLd({
  name,
  jobTitle,
  location,
  techStack,
  sameAs,
  nationality,
}: PersonJsonLdInput) {
  const [locality, country] = location.split(",").map((part) => part.trim());

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name,
    jobTitle,
    url: SITE_URL,
    mainEntityOfPage: SITE_URL,
    image: `${SITE_URL}${OPEN_GRAPH_IMAGE.url}`,
    sameAs,
    address: {
      "@type": "PostalAddress",
      ...(locality ? { addressLocality: locality } : {}),
      ...(country ? { addressCountry: country } : {}),
    },
    ...(nationality
      ? { nationality: { "@type": "Country", name: nationality } }
      : {}),
    knowsAbout: techStack,
  };
}

// ---- website ----
export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DEFAULT_DESCRIPTION,
    inLanguage: "en-US",
    author: { "@id": PERSON_ID },
  };
}

// ---- author reference ----
function getAuthorSchema(author: Author) {
  if (author.id === DEFAULT_AUTHOR_ID) {
    return { "@id": PERSON_ID };
  }

  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person-${author.id}`,
    name: author.name,
    jobTitle: author.role,
    image: toAbsoluteUrl(author.avatar.src),
    sameAs: author.socials
      .filter((social) => social.external)
      .map((social) => social.href),
  };
}

// ---- blog posting ----
interface BlogPostingJsonLdInput {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: Author;
  image?: string;
  wordCount?: number;
  keywords?: string[];
}

export function getBlogPostingJsonLd({
  slug,
  title,
  description,
  datePublished,
  dateModified,
  author,
  image,
  wordCount,
  keywords,
}: BlogPostingJsonLdInput) {
  const url = `${SITE_URL}${ROUTES.blogs.href}/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    description,
    url,
    inLanguage: "en-US",
    datePublished,
    dateModified: dateModified ?? datePublished,
    image: toAbsoluteUrl(image ?? OPEN_GRAPH_IMAGE.url),
    author: getAuthorSchema(author),
    publisher: { "@id": PERSON_ID },
    ...(typeof wordCount === "number" ? { wordCount } : {}),
    ...(keywords && keywords.length > 0
      ? { keywords: keywords.join(", ") }
      : {}),
  };
}

// ---- breadcrumb list ----
interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function getBreadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: toAbsoluteUrl(item.url) } : {}),
    })),
  };
}

// ---- breadcrumb (route-aware) ----
export function getRouteBreadcrumbJsonLd(
  routeId: RouteId,
  currentPage?: string,
) {
  const isRouteRoot = !currentPage;

  const items: BreadcrumbItem[] = [
    { name: ROUTES.home.label, url: ROUTES.home.href },
    {
      name: ROUTES[routeId].label,
      ...(isRouteRoot ? {} : { url: ROUTES[routeId].href }),
    },
  ];

  if (currentPage) {
    items.push({ name: currentPage });
  }

  return getBreadcrumbListJsonLd(items);
}

// ---- profile page ----
export function getProfilePageJsonLd(routeId: RouteId) {
  const url = routeUrl(routeId);

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#page`,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

// ---- contact page ----
export function getContactPageJsonLd(routeId: RouteId) {
  const url = routeUrl(routeId);

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#page`,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
  };
}

// ---- collection page (generic) ----
interface CollectionItem {
  name: string;
  url?: string;
  description?: string;
}

interface CollectionPageJsonLdInput {
  routeId: RouteId;
  name: string;
  description?: string;
  items: CollectionItem[];
  itemType?: string;
  pageType?: "CollectionPage" | "Blog";
}

export function getCollectionPageJsonLd({
  routeId,
  name,
  description,
  items,
  itemType = "Thing",
  pageType = "CollectionPage",
}: CollectionPageJsonLdInput) {
  const url = routeUrl(routeId);

  return {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": `${url}#page`,
    url,
    name,
    ...(description ? { description } : {}),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": itemType,
          name: item.name,
          ...(item.url ? { url: toAbsoluteUrl(item.url) } : {}),
          ...(item.description ? { description: item.description } : {}),
        },
      })),
    },
  };
}
