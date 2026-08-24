import { ROUTES, type RouteId } from "@/data";
import {
  OPEN_GRAPH_IMAGE,
  PWA_BACKGROUND_COLOR,
  PWA_CATEGORIES,
  PWA_ICON_192,
  PWA_ICON_512,
  PWA_THEME_COLOR,
  SITE_DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_SHORT_NAME,
} from "./site";

const MANIFEST_SHORTCUTS: {
  id: RouteId;
  name: string;
  description: string;
}[] = [
  {
    id: "about",
    name: "About Me",
    description:
      "Read my story, from hardware tinkering to software development",
  },
  {
    id: "skills",
    name: ROUTES.skills.label,
    description: "My skills and technologies I use",
  },
  {
    id: "projects",
    name: ROUTES.projects.label,
    description:
      "Browse my Next.js and TypeScript projects with live demos and code",
  },
  {
    id: "blogs",
    name: ROUTES.blogs.label,
    description: "Articles and notes on software development",
  },
  {
    id: "contact",
    name: ROUTES.contact.label,
    description: "Get in touch for collaborations or opportunities.",
  },
];

export function getManifest() {
  return {
    id: ROUTES.home.href,
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description: SITE_DEFAULT_DESCRIPTION,
    lang: "en",
    dir: "ltr",
    start_url: `${ROUTES.home.href}?source=pwa`,
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: PWA_BACKGROUND_COLOR,
    theme_color: PWA_THEME_COLOR,
    prefer_related_applications: false,
    categories: [...PWA_CATEGORIES],
    icons: [
      {
        src: PWA_ICON_192,
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: PWA_ICON_512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    shortcuts: MANIFEST_SHORTCUTS.map(({ id, name, description }) => ({
      name,
      short_name: ROUTES[id].label,
      description,
      url: ROUTES[id].href,
      icons: [
        {
          src: PWA_ICON_192,
          sizes: "192x192",
          type: "image/png",
        },
      ],
    })),
    screenshots: [
      {
        src: OPEN_GRAPH_IMAGE.url,
        sizes: `${OPEN_GRAPH_IMAGE.width}x${OPEN_GRAPH_IMAGE.height}`,
        type: OPEN_GRAPH_IMAGE.type,
        form_factor: "wide",
      },
    ],
  };
}
