import { HeaderSection, SkillsGrid } from "@/components";
import { sections } from "@/data";

import styles from "./Skills.module.scss";

// ---- skills ----
export default function Skills() {
  const { skillsHeadingId, headerSection } = sections;
  return (
    <section
      className={styles.skills}
      id="skills"
      aria-labelledby={skillsHeadingId}
    >
      <div className={styles.skills__container}>
        {/* heading */}
        <HeaderSection title={headerSection.title} id={skillsHeadingId} />

        {/* skills grid */}
        <SkillsGrid variant="primary" showMoreLink />
      </div>
    </section>
  );
}
