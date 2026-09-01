import { ABOUT_METADATA, ABOUT_PAGE_HEADER, ROUTES } from "@/data";
import { ArticleLayout, HeaderPage } from "@/components";
import {
  createPageMetadata,
  getProfilePageJsonLd,
  getRouteBreadcrumbJsonLd,
  JsonLd,
} from "@/lib";
import AboutContent from "@/content/about/about.mdx";

import styles from "./page.module.scss";

export const metadata = createPageMetadata(ROUTES.about.href, ABOUT_METADATA);

// ------ about page ------
export default function AboutPage() {
  const { title, description } = ABOUT_PAGE_HEADER;

  const jsonLd = [
    getProfilePageJsonLd("about"),
    getRouteBreadcrumbJsonLd("about"),
  ];

  return (
    <div className={styles.page__about}>
      <JsonLd data={jsonLd} />
      <HeaderPage title={title} description={description} />

      <ArticleLayout>
        <AboutContent />
      </ArticleLayout>
    </div>
  );
}
