import { FaRss } from "react-icons/fa";
import { HeaderPage, Link } from "@/components";
import { BlogsGrid } from "@/features";
import { ROUTES } from "@/data";
import { BLOG_META_DATA, BLOG_PAGE_DATA } from "@/data/blog.data";
import {
  BLOG_RSS_PATH,
  createPageMetadata,
  getCollectionPageJsonLd,
  getRouteBreadcrumbJsonLd,
  JsonLd,
} from "@/lib";

import styles from "./page.module.scss";

export const metadata = createPageMetadata(ROUTES.blogs.href, BLOG_META_DATA);

// ---- blog page ----
export default function BlogPage() {
  const {
    headerPage: { title, description },
    blogs,
  } = BLOG_PAGE_DATA;

  const jsonLd = [
    getCollectionPageJsonLd({
      routeId: "blogs",
      pageType: "Blog",
      itemType: "BlogPosting",
      name: title,
      description,
      items: blogs.map((post) => ({
        name: post.title,
        description: post.description,
        url: `${ROUTES.blogs.href}/${post.slug}`,
      })),
    }),
    getRouteBreadcrumbJsonLd("blogs"),
  ];

  return (
    <div className={styles.page}>
      <JsonLd data={jsonLd} />
      <HeaderPage title={title} description={description} />
      <main id="main-content" className={styles.page__container}>
        <div className={styles.page__actions}>
          <Link
            href={BLOG_RSS_PATH}
            variant="ghost"
            size="sm"
            icon={<FaRss aria-hidden="true" />}
            iconPosition="left"
            label="Subscribe via RSS"
            aria-label="Subscribe to the blog via RSS"
          />
        </div>
        <BlogsGrid />
      </main>
    </div>
  );
}
