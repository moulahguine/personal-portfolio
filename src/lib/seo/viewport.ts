import type { Viewport } from "next";

import { PWA_THEME_COLOR, SITE_THEME_COLOR } from "./site";

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: SITE_THEME_COLOR },
    { media: "(prefers-color-scheme: dark)", color: PWA_THEME_COLOR },
  ],
};
