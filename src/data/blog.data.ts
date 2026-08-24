// ---- blog ----
export interface Blog {
  id: string;
  title: string;
  description: string;
  date: string;
}

// ---- blogs ----
const BLOGS: Blog[] = [];

const PRIMARY_BLOGS = BLOGS.slice(0, 3);
const REMAINING_BLOGS_COUNT = BLOGS.length - PRIMARY_BLOGS.length;

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
