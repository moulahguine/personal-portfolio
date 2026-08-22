import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./site";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

interface PersonJsonLdInput {
  name: string;
  jobTitle: string;
  location: string;
  techStack: string[];
  sameAs: string[];
}

export function getPersonJsonLd({
  name,
  jobTitle,
  location,
  techStack,
  sameAs,
}: PersonJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name,
    jobTitle,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.split(",")[0]?.trim(),
      addressCountry: "TR",
    },
    knowsAbout: techStack,
  };
}

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
