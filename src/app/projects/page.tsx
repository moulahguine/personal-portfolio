import { HeaderPage } from "@/components";
import { ProjectsGrid } from "@/features";
import { projectsMetaData, projectsPage } from "@/data";
import { createPageMetadata } from "@/lib";

import styles from "./page.module.scss";

export const metadata = createPageMetadata("/projects", projectsMetaData);

// ---- projects page ----
export default function ProjectsPage() {
  const {
    headerPage: { title, description },
  } = projectsPage;

  return (
    <div className={styles.page}>
      <HeaderPage title={title} description={description} />
      <main id="main-content" className={styles.page__container}>
        <ProjectsGrid />
      </main>
    </div>
  );
}
