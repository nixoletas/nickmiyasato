import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { site } from "@/data/site";
import { entrySlug, getPosts } from "@/lib/content";

/**
 * Deliberately at /blog/rss.xml rather than /rss.xml — that is the URL the old
 * Docusaurus blog published, and anyone still subscribed to it keeps working.
 */
export async function GET(context: APIContext) {
  const posts = await getPosts("en");

  return rss({
    title: `${site.name} — Writing`,
    description:
      "Notes on systems I've built and run — infrastructure, data pipelines, and the parts that only show up once something is in production.",
    site: context.site ?? site.url,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: `/blog/${entrySlug(post.id)}`,
    })),
    customData: "<language>en</language>",
  });
}
