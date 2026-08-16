import { BlogsGrid, HeaderPage } from "@/components";
import { blogMetaData, blogPage } from "@/data";

import styles from "./page.module.scss";

export const metadata = blogMetaData;

// ---- blog page ----
export default function BlogPage() {
  const {
    headerPage: { title, description },
  } = blogPage;

  return (
    <div className={styles.page}>
      <HeaderPage title={title} description={description} />
      <main className={styles.page__container}>
        <BlogsGrid />
      </main>
    </div>
  );
}
