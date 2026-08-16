import { Comic_Neue, Inter, Sour_Gummy } from "next/font/google";
import { Header } from "@/components";

import "@/assets/styles/main.scss";

export { generateMetadata } from "./metadata";

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${comicNeue.variable} ${inter.variable} ${sourGummy.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
