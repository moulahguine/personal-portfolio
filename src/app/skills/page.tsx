import { HeaderPage, SkillsGrid } from "@/components";
import { metaData, page } from "@/data";
import { createPageMetadata } from "@/lib";

import styles from "./page.module.scss";

export const metadata = createPageMetadata("/skills", metaData);

// ---- skills page ----
export default function SkillsPage() {
  const {
    headerPage: { title, description },
  } = page;

  return (
    <div className={styles.page}>
      <HeaderPage title={title} description={description} />
      <main id="main-content" className={styles.page__container}>
        <SkillsGrid />
      </main>
    </div>
  );
}
