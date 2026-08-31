import { getBlogPosts } from "@/server/blog.server";

export interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  dateTime: string;
  readingTime: number;
}

const BLOGS = getBlogPosts();

const PRIMARY_BLOGS = BLOGS.slice(0, 3);

const REMAINING_BLOGS_COUNT = Math.max(BLOGS.length - PRIMARY_BLOGS.length, 0);

// ---- sections ----
export const BLOG_SECTION_DATA = {
  blogsHeadingId: "blogs-heading",

  headerSection: {
    id: "blogs",
    title: "Blogs",
  },

  primaryBlogs: PRIMARY_BLOGS,
  remainingBlogsCount: REMAINING_BLOGS_COUNT,
};

// ---- meta data ----
export const BLOG_META_DATA = {
  title: "Blogs",
  description:
    "Notes, lessons, and things I've learned while building software and growing as a developer.",
};

// ---- page ----
export const BLOG_PAGE_DATA = {
  headerPage: {
    title: "Blogs",
    description:
      "Notes, lessons, and things I've learned while building software and growing as a developer.",
  },

  blogs: BLOGS,
};
