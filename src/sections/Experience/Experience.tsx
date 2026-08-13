import { ExperienceTimeline, HeaderSection } from "@/components";
import { experience } from "@/data";

import styles from "./Experience.module.scss";

// ---- experience ----
export default function Experience() {
  const { headingId, headerSection } = experience;

  return (
    <section
      className={styles.experience}
      id="experience"
      aria-labelledby={headingId}
    >
      <div className={styles.experience__container}>
        <HeaderSection title={headerSection.title} id={headingId} />

        <ExperienceTimeline />
      </div>
    </section>
  );
}
