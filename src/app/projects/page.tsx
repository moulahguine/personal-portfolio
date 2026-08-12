import { HeaderPage, ProjectsGrid } from "@/components";
import { projectsMetaData, projectsPage } from "@/data";

import styles from "./page.module.scss";

export const metadata = projectsMetaData;

// ---- projects page ----
export default function ProjectsPage() {
  const {
    headerPage: { title, description },
  } = projectsPage;

  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <HeaderPage title={title} description={description} />
        <ProjectsGrid />
      </div>
    </div>
  );
}
