import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Files live at src/content/<collection>/<lang>/<slug>.mdx, so `id` comes out
 * as "en/meus-gastos". Locale is derived from that path rather than duplicated
 * in frontmatter — one less thing to get out of sync.
 */
const localizedGlob = (base: string) =>
  glob({ pattern: "*/*.{md,mdx}", base });

const projects = defineCollection({
  loader: localizedGlob("./src/content/projects"),
  schema: z.object({
    title: z.string(),
    /** One line, shown in the listing. Keep under ~130 chars. */
    summary: z.string(),
    year: z.string(),
    role: z.string(),
    stack: z.array(z.string()).min(1),
    /** Featured projects get a full-width block with a screenshot. */
    featured: z.boolean().default(false),
    /** Ascending; controls order within featured and non-featured groups. */
    order: z.number(),
    /** Filename inside src/assets/projects/. */
    cover: z.string().optional(),
    repo: z.url().optional(),
    demo: z.url().optional(),
  }),
});

const posts = defineCollection({
  loader: localizedGlob("./src/content/posts"),
  schema: z.object({
    title: z.string(),
    /** One line, shown in the listing and used as the meta description. */
    summary: z.string(),
    /** Publication date. Drives ordering and the feed's pubDate. */
    date: z.coerce.date(),
    /** Freeform; rendered as tags under the title. */
    tags: z.array(z.string()).default([]),
    /** Drafts build locally but are dropped from the production output. */
    draft: z.boolean().default(false),
    /** Filename inside src/assets/posts/. */
    cover: z.string().optional(),
  }),
});

// A `caseStudies` collection (Army intranet, A Divisão) is planned but not
// defined yet — it needs figures and scope details that only Nick can supply,
// and an empty collection warns on every build. Adding it back is this block:
//
//   const caseStudies = defineCollection({
//     loader: localizedGlob("./src/content/case-studies"),
//     schema: z.object({ title, summary, org, period, role, stack, order }),
//   });

export const collections = { projects, posts };
