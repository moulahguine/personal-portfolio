import { ABOUT_METADATA, ABOUT_PAGE_HEADER, ROUTES } from "@/data";
import { ArticleLayout, HeaderPage } from "@/components";
import {
  createPageMetadata,
  getProfilePageJsonLd,
  getRouteBreadcrumbJsonLd,
  JsonLd,
} from "@/lib";
import AboutContent from "@/content/about/about.mdx";

export const metadata = createPageMetadata(ROUTES.about.href, ABOUT_METADATA);

// ------ about page ------
export default function AboutPage() {
  const { title, description } = ABOUT_PAGE_HEADER;

  const jsonLd = [
    getProfilePageJsonLd("about"),
    getRouteBreadcrumbJsonLd("about"),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeaderPage title={title} description={description} />

      <ArticleLayout>
        <AboutContent />
      </ArticleLayout>
    </>
  );
}
