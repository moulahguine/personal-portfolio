import { HeaderPage } from "@/components";
import { ProjectsGrid } from "@/features";
import { PROJECTS_META_DATA, PROJECTS_PAGE_DATA, ROUTES } from "@/data";
import { createPageMetadata } from "@/lib";

import styles from "./page.module.scss";

export const metadata = createPageMetadata(
  ROUTES.projects.href,
  PROJECTS_META_DATA,
);

// ---- projects page ----
export default function ProjectsPage() {
  const {
    headerPage: { title, description },
  } = PROJECTS_PAGE_DATA;

  return (
    <div className={styles.page}>
      <HeaderPage title={title} description={description} />
      <main id="main-content" className={styles.page__container}>
        <ProjectsGrid />
      </main>
    </div>
  );
}
