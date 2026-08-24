import { BLOG_PAGE_DATA, BLOG_SECTION_DATA } from "@/data";

import styles from "./BlogsGrid.module.scss";

type BlogsGridVariant = "primary" | "all";

interface BlogsGridProps {
  variant?: BlogsGridVariant;
}

const { primaryBlogs } = BLOG_SECTION_DATA;
const { blogs: blogsData } = BLOG_PAGE_DATA;

// ---- blogs grid ----
export default function BlogsGrid({ variant = "all" }: BlogsGridProps) {
  const blogs = variant === "primary" ? primaryBlogs : blogsData;

  return (
    <ul className={styles.blogs__grid}>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <li key={blog.id}>
            <article className={styles.blogs__card}>
              <time className={styles.blogs__date}>{blog.date}</time>
              <h3 className={styles.blogs__title}>{blog.title}</h3>
              <p className={styles.blogs__description}>{blog.description}</p>
            </article>
          </li>
        ))
      ) : (
        <li className={styles.blogs__empty} role="alert">
          <p>Nothing to see here yet.</p>
        </li>
      )}
    </ul>
  );
}
