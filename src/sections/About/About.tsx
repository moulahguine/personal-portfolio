import { ABOUT_DATA } from "@/data";

import styles from "./About.module.scss";

// ---- about ----
export default function About() {
  const { headingId, paragraph } = ABOUT_DATA;

  return (
    <section className={styles.about} id="about" aria-labelledby={headingId}>
      <div className={styles.about__container}>
        <p className={styles.about__paragraph}>{paragraph}</p>
      </div>
    </section>
  );
}
