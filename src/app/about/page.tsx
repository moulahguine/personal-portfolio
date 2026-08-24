import type { MDXComponents } from "mdx/types";
import { ABOUT_METADATA, ABOUT_PAGE_HEADER, ROUTES } from "@/data";
import { HeaderPage, Link } from "@/components";
import { createPageMetadata } from "@/lib";
import AboutContent from "./about.mdx";

import styles from "./page.module.scss";

export const metadata = createPageMetadata(ROUTES.about.href, ABOUT_METADATA);

// ------ MDX components ------
const aboutComponents = {
  h2: ({ children }) => (
    <h2 className={styles["page__about-section--title"]}>{children}</h2>
  ),
  p: ({ children }) => (
    <p className={styles["page__about-paragraph"]}>{children}</p>
  ),
  blockquote: (props) => (
    <blockquote {...props} className={styles["page__about-paragraph--quote"]} />
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");

    return (
      <Link
        href={href}
        className={styles["page__about-link"]}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </Link>
    );
  },
} satisfies MDXComponents;

// ------ about page ------
export default function AboutPage() {
  const { title, description } = ABOUT_PAGE_HEADER;

  return (
    <div className={styles.page__about}>
      <HeaderPage title={title} description={description} />

      <main id="main-content" className={styles["page__about-container"]}>
        <AboutContent components={aboutComponents} />
      </main>
    </div>
  );
}
