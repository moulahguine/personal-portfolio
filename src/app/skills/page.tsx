import { HeaderPage, SkillsGrid } from "@/components";
import { metaData, page } from "@/data";

import styles from "./page.module.scss";

export const metadata = metaData;

// ---- skills page ----
export default function SkillsPage() {
  const {
    headerPage: { title, description },
  } = page;
  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <HeaderPage title={title} description={description} />
        <SkillsGrid />
      </div>
    </div>
  );
}
