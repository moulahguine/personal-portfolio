import { HeaderSection } from "@/components";
import { SkillsGrid } from "@/features";
import { ROUTES, SKILLS_SECTION_DATA } from "@/data";

import styles from "./Skills.module.scss";

// ---- skills ----
export default function Skills() {
  const {
    skillsHeadingId,
    headerSection: { id, title },
    remainingSkillsCount,
  } = SKILLS_SECTION_DATA;

  return (
    <section
      className={styles.skills}
      id={id}
      aria-labelledby={skillsHeadingId}
    >
      <div className={styles.skills__container}>
        <HeaderSection
          title={title}
          id={skillsHeadingId}
          link={
            remainingSkillsCount > 0
              ? {
                  href: ROUTES.skills.href,
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
