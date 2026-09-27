import { HeaderPage } from "@/components";
import { BlogsGrid } from "@/features";
import { ROUTES } from "@/data";
import { BLOG_META_DATA, BLOG_PAGE_DATA } from "@/data/blog.data";
import {
  createPageMetadata,
  getCollectionPageJsonLd,
  getRouteBreadcrumbJsonLd,
  JsonLd,
} from "@/lib";

import "../../assets/styles/main.scss";

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
    <>
      <JsonLd data={jsonLd} />
      <HeaderPage title={title} description={description} />
      <div className="page__container">
        <BlogsGrid />
      </div>
    </>
  );
}
