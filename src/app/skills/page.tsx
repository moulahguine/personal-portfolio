import { HeaderPage } from "@/components";
import { SkillsGrid } from "@/features";
import { ROUTES, SKILLS_META_DATA, SKILLS_PAGE_DATA } from "@/data";
import {
  createPageMetadata,
  getRouteBreadcrumbJsonLd,
  JsonLd,
} from "@/lib";

import styles from "./page.module.scss";

export const metadata = createPageMetadata(ROUTES.skills.href, SKILLS_META_DATA);

// ---- skills page ----
export default function SkillsPage() {
  const {
    headerPage: { title, description },
  } = SKILLS_PAGE_DATA;

  return (
    <div className={styles.page}>
      <JsonLd data={getRouteBreadcrumbJsonLd("skills")} />
      <HeaderPage title={title} description={description} />
      <main id="main-content" className={styles.page__container}>
        <SkillsGrid />
      </main>
    </div>
  );
}
