import { HeaderSection, ProjectsGrid } from "@/components";
import { projectsSections } from "@/data";

import styles from "./Projects.module.scss";

// ---- projects ----
export default function Projects() {
  const { projectsHeadingId, headerSection } = projectsSections;

  return (
    <section
      className={styles.projects}
      id="projects"
      aria-labelledby={projectsHeadingId}
    >
      <div className={styles.projects__container}>
        <HeaderSection title={headerSection.title} id={projectsHeadingId} />

        <ProjectsGrid variant="primary" showAllLink />
      </div>
    </section>
  );
}
