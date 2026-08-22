import { ABOUT_METADATA, ABOUT_PAGE_DATA } from "@/data";
import { HeaderPage } from "@/components";
import { createPageMetadata } from "@/lib";

import AboutContentItem from "./AboutContentItem";
import styles from "./page.module.scss";

export const metadata = createPageMetadata("/about", ABOUT_METADATA);

export default function AboutPage() {
  const {
    header: { title, description },
    sections,
  } = ABOUT_PAGE_DATA;

  return (
    <div className={styles.page}>
      <HeaderPage title={title} description={description} />

      <main id="main-content" className={styles.page__container}>
        {sections.map((section) => (
          <section key={section.id} className={styles.page__section}>
            <h2 className={styles.page__sectionTitle}>{section.title}</h2>

            {section.content.map((item, index) => (
              <AboutContentItem key={index} item={item} />
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}
