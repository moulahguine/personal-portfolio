import { FaRegClock } from "react-icons/fa";
import { Link } from "@/components";
import { blogCardVisuals } from "@/content/blogs";
import { BLOG_PAGE_DATA, BLOG_SECTION_DATA } from "@/data/blog.data";
import { ROUTES } from "@/data";

import styles from "./BlogsGrid.module.scss";

type BlogsGridVariant = "primary" | "all";

function BlogCardVisual({ slug }: { slug: string }) {
  const Visual = blogCardVisuals[slug];

  return Visual ? <Visual /> : null;
}

interface BlogsGridProps {
  variant?: BlogsGridVariant;
}

const { primaryBlogs } = BLOG_SECTION_DATA;
const { blogs: blogsData } = BLOG_PAGE_DATA;

// ---- blogs grid ----
export default function BlogsGrid({ variant = "all" }: BlogsGridProps) {
  const blogs = variant === "primary" ? primaryBlogs : blogsData;

  return (
    <ol className={styles.blogs__grid}>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <li key={blog.id} className={styles.blogs__card}>
            <Link
              href={`${ROUTES.blogs.href}/${blog.slug}`}
              variant="plain"
              className={styles.blogs__link}
              aria-label={`Read blog post: ${blog.title}`}
            >
              <div className={styles.blogs__visual}>
                <BlogCardVisual slug={blog.slug} />
              </div>

              <div className={styles.blogs__content}>
                <h3 className={styles["blogs__content-title"]}>{blog.title}</h3>
                <p className={styles["blogs__content-description"]}>
                  {blog.description}
                </p>

                <footer className={styles["blogs__content-footer"]}>
                  <span
                    className={styles["blogs__content-footer--readingTime"]}
                  >
                    <FaRegClock
                      className={
                        styles["blogs__content-footer--readingTimeIcon"]
                      }
                      aria-hidden="true"
                    />
                    {blog.readingTime} min read
                  </span>
                  <time
                    className={styles["blogs__content-footer--date"]}
                    dateTime={blog.dateTime}
                  >
                    {blog.date}
                  </time>
                </footer>
              </div>
            </Link>
          </li>
        ))
      ) : (
        <li className={styles.blogs__empty} role="alert">
          <p>Nothing to see here yet.</p>
        </li>
      )}
    </ol>
  );
}
