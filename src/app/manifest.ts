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
} from "@/lib";

export default function manifest() {
  return {
    id: "/",
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description: SITE_DEFAULT_DESCRIPTION,
    lang: "en",
    dir: "ltr",
    start_url: "/?source=pwa",
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
    shortcuts: [
      {
        name: "About Me",
        short_name: "About",
        description:
          "Read my story, from hardware tinkering to software development",
        url: "/about",
        icons: [
          {
            src: PWA_ICON_192,
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Skills",
        short_name: "Skills",
        description: "My skills and technologies I use",
        url: "/skills",
        icons: [
          {
            src: PWA_ICON_192,
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Projects",
        short_name: "Projects",
        description:
          "Browse my Next.js and TypeScript projects with live demos and code",
        url: "/projects",
        icons: [
          {
            src: PWA_ICON_192,
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Blog",
        short_name: "Blog",
        description: "Articles and notes on software development",
        url: "/blog",
        icons: [
          {
            src: PWA_ICON_192,
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Contact",
        short_name: "Contact",
        description: "Get in touch for collaborations or opportunities.",
        url: "/contact",
        icons: [
          {
            src: PWA_ICON_192,
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    ],
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
