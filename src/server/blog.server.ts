import fs from "node:fs";
import path from "node:path";

import type { Blog } from "@/data/blog.data";
import {
  DEFAULT_AUTHOR_ID,
  isAuthorId,
  type AuthorId,
} from "@/data/authors.data";

const BLOGS_DIR = path.join(process.cwd(), "src/content/blogs");
const WORDS_PER_MINUTE = 200;

function getContentStats(content: string): {
  wordCount: number;
  readingTime: number;
} {
  const body = content.replace(/^---[\s\S]*?---/, "");
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_\[\]()`~-]/g, " ")
    .trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

  return { wordCount, readingTime };
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

  const { wordCount, readingTime } = getContentStats(fileContent);

  return {
    id: slug,
    slug,
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    dateTime: assertValidDate(metadata.dateTime, "dateTime", filename),
    ...(metadata.updated
      ? { updated: assertValidDate(metadata.updated, "updated", filename) }
      : {}),
    readingTime,
    wordCount,
    authorId: resolveAuthorId(metadata.author, filename),
    ...(metadata.tags ? { tags: parseTags(metadata.tags) } : {}),
    ...(metadata.section ? { section: metadata.section } : {}),
  };
}

function assertValidDate(
  value: string | undefined,
  field: string,
  filename: string,
): string {
  if (!value) {
    throw new Error(
      `Missing required frontmatter field "${field}" in ${filename}.`,
    );
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(
      `Invalid date "${value}" for field "${field}" in ${filename}. Use ISO format like "2026-08-24".`,
    );
  }

  return value;
}

function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function resolveAuthorId(value: string | undefined, filename: string): AuthorId {
  if (!value) {
    return DEFAULT_AUTHOR_ID;
  }

  if (!isAuthorId(value)) {
    throw new Error(
      `Unknown author "${value}" in ${filename}. Add them to AUTHORS in src/data/authors.data.ts first.`,
    );
  }

  return value;
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
