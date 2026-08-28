import { ABOUT_METADATA, ABOUT_PAGE_HEADER, ROUTES } from "@/data";
import { HeaderPage } from "@/components";
import { createPageMetadata } from "@/lib";
import AboutContent from "@/content/about/about.mdx";

import styles from "./page.module.scss";

export const metadata = createPageMetadata(ROUTES.about.href, ABOUT_METADATA);

// ------ about page ------
export default function AboutPage() {
  const { title, description } = ABOUT_PAGE_HEADER;

  return (
    <div className={styles.page__about}>
      <HeaderPage title={title} description={description} />

      <main id="main-content" className={styles["page__about-container"]}>
        <AboutContent />
      </main>
    </div>
  );
}
