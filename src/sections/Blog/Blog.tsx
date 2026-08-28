import { HeaderSection } from "@/components";
import { BlogsGrid } from "@/features";
import { BLOG_SECTION_DATA } from "@/data/blog.data";
import { ROUTES } from "@/data";

import styles from "./Blog.module.scss";

// ---- blog ----
export default function Blog() {
  const {
    blogsHeadingId,
    headerSection: { id, title },
    remainingBlogsCount,
  } = BLOG_SECTION_DATA;

  return (
    <section className={styles.blog} id={id} aria-labelledby={blogsHeadingId}>
      <div className={styles.blog__container}>
        <HeaderSection
          title={title}
          id={blogsHeadingId}
          link={
            remainingBlogsCount > 0
              ? {
                  href: ROUTES.blogs.href,
                  label: "View all posts",
                  ariaLabel: `View all posts, ${remainingBlogsCount} more`,
                }
              : undefined
          }
        />
        <BlogsGrid variant="primary" />
      </div>
    </section>
  );
}
