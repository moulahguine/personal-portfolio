import { Button, DialogTrigger, Link, Modal, ProjectsGrid } from "@/components";
import { sections, page, getProjectsBySkillId } from "@/data";
import { MdOutlineArrowOutward } from "react-icons/md";

import styles from "./SkillsGrid.module.scss";

type SkillsGridVariant = "primary" | "all";

interface SkillsGridProps {
  variant?: SkillsGridVariant;
}

const { primarySkills } = sections;
const { skills: skillsData } = page;
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
          <li key={skill.id}>
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
                    <ProjectsGrid projects={relatedProjects} layout="modal" />

                    {hasMoreProjects ? (
                      <Link
                        href="/projects"
                        variant="ghost"
                        iconPosition="right"
                        size="sm"
                        className={styles["skills__modal-projects-link"]}
                        aria-label={`View all projects using ${skill.name}`}
                        icon={
                          <MdOutlineArrowOutward
                            className={
                              styles["skills__modal-projects-link-icon"]
                            }
                            aria-hidden="true"
                          />
                        }
                        label="View all projects"
                      />
                    ) : null}
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
