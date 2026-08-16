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
      <HeaderPage title={title} description={description} />
      <main className={styles.page__container}>
        <ProjectsGrid />
      </main>
    </div>
  );
}
