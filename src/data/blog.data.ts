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
export const sections = {
  blogsHeadingId: "blogs-heading",

  headerSection: {
    title: "Blog",
  },

  primaryBlogs: PRIMARY_BLOGS,
  remainingBlogsCount: REMAINING_BLOGS_COUNT,
};

// ---- meta data ----
export const metaData = {
  title: "Blog",
  description:
    "Notes, lessons, and things I've learned while building software and growing as a developer.",
};

// ---- page ----
export const page = {
  headerPage: {
    title: "Blog",
    description:
      "Notes, lessons, and things I've learned while building software and growing as a developer.",
  },

  blogs: BLOGS,
};
