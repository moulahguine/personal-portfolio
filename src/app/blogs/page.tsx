import { HeaderPage } from "@/components";
import { BlogsGrid } from "@/features";
import { BLOG_META_DATA, BLOG_PAGE_DATA, ROUTES } from "@/data";
import { createPageMetadata } from "@/lib";

import styles from "./page.module.scss";

export const metadata = createPageMetadata(ROUTES.blogs.href, BLOG_META_DATA);

// ---- blog page ----
export default function BlogPage() {
  const {
    headerPage: { title, description },
  } = BLOG_PAGE_DATA;

  return (
    <div className={styles.page}>
      <HeaderPage title={title} description={description} />
      <main id="main-content" className={styles.page__container}>
        <BlogsGrid />
      </main>
    </div>
  );
}
