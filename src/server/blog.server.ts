import fs from "node:fs";
import path from "node:path";

import type { Blog } from "@/data/blog.data";

const BLOGS_DIR = path.join(process.cwd(), "src/content/blogs");
const WORDS_PER_MINUTE = 200;

function getReadingTime(content: string): number {
  const body = content.replace(/^---[\s\S]*?---/, "");
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_\[\]()`~-]/g, " ")
    .trim();
  const words = text.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function readBlogMetadata(filename: string): Blog {
  const slug = filename.replace(/\.mdx$/, "");
  const filePath = path.join(BLOGS_DIR, filename);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!match) {
    throw new Error(`Missing frontmatter in ${filename}`);
  }

  const metadata: Record<string, string> = {};

  for (const line of match[1].split("\n")) {
    const trimmed = line.trim();

    if (!trimmed) {
      continue;
    }

    const colonIndex = trimmed.indexOf(":");

    if (colonIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, colonIndex).trim();
    let value = trimmed.slice(colonIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    metadata[key] = value;
  }

  return {
    id: slug,
    slug,
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    dateTime: metadata.dateTime,
    readingTime: getReadingTime(fileContent),
  };
}

const BLOGS = fs
  .readdirSync(BLOGS_DIR)
  .filter((filename) => filename.endsWith(".mdx"))
  .map(readBlogMetadata)
  .sort((a, b) => b.dateTime.localeCompare(a.dateTime));

export function getBlogPosts() {
  return BLOGS;
}

export function getBlogPost(slug: string) {
  return BLOGS.find((blog) => blog.slug === slug) ?? null;
}
