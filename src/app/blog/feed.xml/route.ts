import { ROUTES, getAuthor } from "@/data";
import {
  BLOG_RSS_PATH,
  SITE_AUTHOR_NAME,
  SITE_DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib";
import { getBlogPosts } from "@/server/blog.server";

export const dynamic = "force-static";

const BLOG_URL = `${SITE_URL}${ROUTES.blogs.href}`;
const FEED_URL = `${SITE_URL}${BLOG_RSS_PATH}`;

// XML 1.0 forbids raw &, <, > in text; also strip control chars that break parsers.
function escapeXml(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(value: string): string {
  return new Date(value).toUTCString();
}

export function GET() {
  const posts = getBlogPosts();
  const buildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${BLOG_URL}/${post.slug}`;
      const author = getAuthor(post.authorId);
      const pubDate = toRfc822(post.dateTime);
      const categories = (post.tags ?? [])
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <dc:creator>${escapeXml(author.name)}</dc:creator>`,
        `      <description>${escapeXml(post.description)}</description>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${SITE_NAME} — Blog`)}</title>
    <link>${BLOG_URL}</link>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DEFAULT_DESCRIPTION)}</description>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(SITE_AUTHOR_NAME)}</copyright>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
