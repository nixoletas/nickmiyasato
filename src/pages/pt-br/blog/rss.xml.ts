import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { site } from "@/data/site";
import { entrySlug, getPosts } from "@/lib/content";

export async function GET(context: APIContext) {
  const posts = await getPosts("pt-br");

  return rss({
    title: `${site.name} — Blog`,
    description:
      "Notas sobre sistemas que construí e operei — infraestrutura, pipelines de dados e as partes que só aparecem quando a coisa está em produção.",
    site: context.site ?? site.url,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: `/pt-br/blog/${entrySlug(post.id)}`,
    })),
    customData: "<language>pt-BR</language>",
  });
}
