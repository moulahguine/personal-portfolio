import { HeaderSection } from "@/components";
import { ProjectsGrid } from "@/features";
import { projectsSections } from "@/data";

import styles from "./Projects.module.scss";

// ---- projects ----
export default function Projects() {
  const { projectsHeadingId, headerSection, remainingProjectsCount } =
    projectsSections;

  return (
    <section
      className={styles.projects}
      id="projects"
      aria-labelledby={projectsHeadingId}
    >
      <div className={styles.projects__container}>
        <HeaderSection
          title={headerSection.title}
          id={projectsHeadingId}
          link={
            remainingProjectsCount > 0
              ? {
                  href: "/projects",
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
