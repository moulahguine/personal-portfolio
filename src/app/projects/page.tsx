import { HeaderPage } from "@/components";
import { ProjectsGrid } from "@/features";
import { PROJECTS_META_DATA, PROJECTS_PAGE_DATA, ROUTES } from "@/data";
import {
  createPageMetadata,
  getCollectionPageJsonLd,
  getRouteBreadcrumbJsonLd,
  JsonLd,
} from "@/lib";

import styles from "./page.module.scss";

export const metadata = createPageMetadata(
  ROUTES.projects.href,
  PROJECTS_META_DATA,
);

// ---- projects page ----
export default function ProjectsPage() {
  const {
    headerPage: { title, description },
    projects,
  } = PROJECTS_PAGE_DATA;

  const jsonLd = [
    getCollectionPageJsonLd({
      routeId: "projects",
      name: title,
      description,
      itemType: "CreativeWork",
      items: projects.map((project) => ({
        name: project.title,
        description: project.description,
        url: project.demo,
      })),
    }),
    getRouteBreadcrumbJsonLd("projects"),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeaderPage title={title} description={description} />
      <div className={styles.page__container}>
        <ProjectsGrid />
      </div>
    </>
  );
}
