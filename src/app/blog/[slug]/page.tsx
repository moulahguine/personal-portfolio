import { notFound } from "next/navigation";
import { ArticleHeader, ArticleLayout } from "@/components";
import { blogComponents } from "@/content/blogs";
import { getAuthor, ROUTES } from "@/data";
import { getBlogPost, getBlogPosts } from "@/server/blog.server";
import {
  createPageMetadata,
  getBlogPostingJsonLd,
  getRouteBreadcrumbJsonLd,
  JsonLd,
} from "@/lib";

import styles from "./page.module.scss";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getBlogPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const author = getAuthor(post.authorId);

  return createPageMetadata(`${ROUTES.blogs.href}/${post.slug}`, {
    variant: "article",
    title: post.title,
    description: post.description,
    publishedTime: toIsoDateTime(post.dateTime),
    modifiedTime: post.updated ? toIsoDateTime(post.updated) : undefined,
    authors: [getAuthorUrl(author)],
    tags: post.tags,
    section: post.section,
  });
}

function toIsoDateTime(value: string): string {
  return new Date(value).toISOString();
}

function getAuthorUrl(author: ReturnType<typeof getAuthor>): string {
  const website = author.socials.find((social) => social.id === "website");

  if (website) {
    return website.href;
  }

  const linkedin = author.socials.find((social) => social.id === "linkedin");

  return linkedin?.href ?? `${author.name}`;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const Content = blogComponents[slug];

  if (!post || !Content) {
    notFound();
  }

  const author = getAuthor(post.authorId);

  const jsonLd = [
    getBlogPostingJsonLd({
      slug: post.slug,
      title: post.title,
      description: post.description,
      datePublished: post.dateTime,
      dateModified: post.updated,
      author,
      wordCount: post.wordCount,
      keywords: post.tags,
    }),
    getRouteBreadcrumbJsonLd("blogs", post.title),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ArticleLayout
        header={
          <ArticleHeader
            backTo={{ href: ROUTES.blogs.href, label: ROUTES.blogs.label }}
            title={post.title}
            author={author}
            readingTime={post.readingTime}
            publishedAt={{ display: post.date, iso: post.dateTime }}
          />
        }
      >
        <Content />
      </ArticleLayout>
    </>
  );
}
