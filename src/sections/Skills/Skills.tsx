import { HeaderSection, SkillsGrid } from "@/components";
import { sections } from "@/data";

import styles from "./Skills.module.scss";

// ---- skills ----
export default function Skills() {
  const { skillsHeadingId, headerSection, remainingSkillsCount } = sections;

  return (
    <section
      className={styles.skills}
      id="skills"
      aria-labelledby={skillsHeadingId}
    >
      <div className={styles.skills__container}>
        <HeaderSection
          title={headerSection.title}
          id={skillsHeadingId}
          link={
            remainingSkillsCount > 0
              ? {
                  href: "/skills",
                  label: "View all skills",
                  ariaLabel:
                    "These are some of my featured skills. To explore my complete tech stack, visit the Skills page.",
                }
              : undefined
          }
        />
        <SkillsGrid variant="primary" />
      </div>
    </section>
  );
}
