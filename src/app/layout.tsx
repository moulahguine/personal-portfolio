import {
  Comic_Neue,
  Inter,
  Playfair_Display,
  Sour_Gummy,
} from "next/font/google";
import { Footer, Header, IntroAnimation, PageTransition } from "@/components";
import { IndieAuthLinks, SkipLink } from "@/lib";
import { ThemeProvider } from "@/providers";

import "@/assets/styles/main.scss";

export { generateMetadata, viewport } from "./metadata";

// ---- font primary ----
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// ---- font secondary ----
const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic",
  display: "swap",
});

// ---- font tertiary ----
const sourGummy = Sour_Gummy({
  subsets: ["latin"],
  variable: "--font-tertiary",
  display: "swap",
});

// ---- font quaternary ----
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-quaternary",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${comicNeue.variable} ${sourGummy.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <link rel="describedby" href="/llms.txt" />
      </head>
      <body>
        <IndieAuthLinks />
        <ThemeProvider>
          <IntroAnimation />
          <PageTransition>
            <SkipLink />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
