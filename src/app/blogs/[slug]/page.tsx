import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components";
import { blogComponents } from "@/content/blogs";
import { ROUTES } from "@/data";
import { getBlogPost, getBlogPosts } from "@/server/blog.server";
import { createPageMetadata } from "@/lib";

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

  return createPageMetadata(`${ROUTES.blogs.href}/${post.slug}`, {
    title: post.title,
    description: post.description,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const Content = blogComponents[slug];

  if (!post || !Content) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <ArticleLayout>
        <Content />
      </ArticleLayout>
    </div>
  );
}
