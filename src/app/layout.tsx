import { Comic_Neue, Inter, Sour_Gummy } from "next/font/google";
import { Footer, Header } from "@/components";
import { IndieAuthLinks, SkipLink } from "@/lib";
import { ThemeProvider } from "@/providers";

import "@/assets/styles/main.scss";

export { generateMetadata, viewport } from "./metadata";

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const sourGummy = Sour_Gummy({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sour-gummy",
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
      className={`${comicNeue.variable} ${inter.variable} ${sourGummy.variable}`}
    >
      <head>
        <link rel="describedby" href="/llms.txt" />
      </head>
      <body>
        <IndieAuthLinks />
        <ThemeProvider>
          <SkipLink />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
