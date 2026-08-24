import { HeaderSection } from "@/components";
import { ExperienceTimeline } from "@/features";
import { EXPERIENCE_DATA } from "@/data";

import styles from "./Experience.module.scss";

// ---- experience ----
export default function Experience() {
  const {
    headingId,
    headerSection: { id, title },
  } = EXPERIENCE_DATA;

  return (
    <section className={styles.experience} id={id} aria-labelledby={headingId}>
      <div className={styles.experience__container}>
        <HeaderSection title={title} id={headingId} />

        <ExperienceTimeline />
      </div>
    </section>
  );
}
