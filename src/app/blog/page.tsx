import { HeaderPage } from "@/components";
import { BlogsGrid } from "@/features";
import { blogMetaData, blogPage } from "@/data";
import { createPageMetadata } from "@/lib";

import styles from "./page.module.scss";

export const metadata = createPageMetadata("/blog", blogMetaData);

// ---- blog page ----
export default function BlogPage() {
  const {
    headerPage: { title, description },
  } = blogPage;

  return (
    <div className={styles.page}>
      <HeaderPage title={title} description={description} />
      <main id="main-content" className={styles.page__container}>
        <BlogsGrid />
      </main>
    </div>
  );
}
