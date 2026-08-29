import { Button, DialogTrigger, HeaderSection, Modal } from "@/components";
import { ProjectsGrid } from "@/features";
import {
  ROUTES,
  SKILLS_SECTION_DATA,
  SKILLS_PAGE_DATA,
  getProjectsBySkillId,
} from "@/data";

import styles from "./SkillsGrid.module.scss";

interface SkillsGridProps {
  variant?: "primary" | "all";
}

const { primarySkills } = SKILLS_SECTION_DATA;
const { skills: skillsData } = SKILLS_PAGE_DATA;
const SKILL_MODAL_MAX_PROJECTS = 2;

// ---- skills grid ----
export default function SkillsGrid({ variant = "all" }: SkillsGridProps) {
  const skills = variant === "primary" ? primarySkills : skillsData;

  return (
    <ul className={styles.skills__grid}>
      {skills.map((skill) => {
        const SkillIcon = skill.icon;
        const matchingProjects = getProjectsBySkillId(skill.id);
        const relatedProjects = matchingProjects.slice(
          0,
          SKILL_MODAL_MAX_PROJECTS,
        );
        const hasMoreProjects =
          matchingProjects.length > SKILL_MODAL_MAX_PROJECTS;

        return (
          <li key={skill.id} className={styles.skills__list}>
            <DialogTrigger>
              <Button
                variant="ghost"
                className={styles.skills__item}
                aria-label={`View ${skill.name} details`}
                style={{ "--skill-color": skill.color } as React.CSSProperties}
              >
                <SkillIcon className={styles.skills__icon} aria-hidden="true" />
                <span className={styles.skills__name}>{skill.name}</span>
              </Button>

              <Modal
                size="lg"
                className={styles.skills__modal}
                icon={<SkillIcon aria-hidden="true" />}
                title={skill.name}
                description={skill.description}
                iconColor={skill.color}
                aria-label={`${skill.name} details`}
              >
                {skill.overview ? (
                  <p className={styles["skills__modal-overview"]}>
                    {skill.overview}
                  </p>
                ) : null}

                {relatedProjects.length > 0 ? (
                  <section className={styles["skills__modal-projects"]}>
                    <HeaderSection
                      title="Related projects"
                      link={
                        hasMoreProjects
                          ? {
                              href: ROUTES.projects.href,
                              label: "View all projects",
                            }
                          : undefined
                      }
                    />
                    <ProjectsGrid projects={relatedProjects} />
                  </section>
                ) : null}
              </Modal>
            </DialogTrigger>
          </li>
        );
      })}
    </ul>
  );
}
