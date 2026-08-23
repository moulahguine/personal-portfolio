import { HeaderSection } from "@/components";
import { BlogsGrid } from "@/features";
import { blogSections } from "@/data";

import styles from "./Blog.module.scss";

// ---- blog ----
export default function Blog() {
  const { blogsHeadingId, headerSection, remainingBlogsCount } = blogSections;

  return (
    <section
      className={styles.blog}
      id="blog"
      aria-labelledby={blogsHeadingId}
    >
      <div className={styles.blog__container}>
        <HeaderSection
          title={headerSection.title}
          id={blogsHeadingId}
          link={
            remainingBlogsCount > 0
              ? {
                  href: "/blog",
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
