import { HeaderSection } from "@/components";
import { ABOUT_SECTION_DATA } from "@/data";

import styles from "./About.module.scss";

// ---- about ----
export default function About() {
  const { headingId, title, paragraph } = ABOUT_SECTION_DATA;

  return (
    <section className={styles.about} id="about" aria-labelledby={headingId}>
      <div className={styles.about__container}>
        <HeaderSection
          title={title}
          id={headingId}
          className={styles.about__header}
        />
        <p className={styles.about__paragraph}>{paragraph}</p>
      </div>
    </section>
  );
}
