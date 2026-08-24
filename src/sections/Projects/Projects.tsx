import { HeaderSection } from "@/components";
import { ProjectsGrid } from "@/features";
import { PROJECTS_SECTION_DATA, ROUTES } from "@/data";

import styles from "./Projects.module.scss";

// ---- projects ----
export default function Projects() {
  const {
    projectsHeadingId,
    headerSection: { id, title },
    remainingProjectsCount,
  } = PROJECTS_SECTION_DATA;

  return (
    <section
      className={styles.projects}
      id={id}
      aria-labelledby={projectsHeadingId}
    >
      <div className={styles.projects__container}>
        <HeaderSection
          title={title}
          id={projectsHeadingId}
          link={
            remainingProjectsCount > 0
              ? {
                  href: ROUTES.projects.href,
                  label: "View all projects",
                  ariaLabel: `View all projects, ${remainingProjectsCount} more`,
                }
              : undefined
          }
        />
        <ProjectsGrid variant="primary" />
      </div>
    </section>
  );
}
