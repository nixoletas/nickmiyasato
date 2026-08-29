import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "@/i18n/ui";
import { localizePath } from "@/i18n/utils";

/**
 * `cover` in frontmatter is a bare filename, and these maps are what turn it
 * into something astro:assets can optimise. Projects and posts get separate
 * directories so a filename in one cannot silently resolve against the other.
 *
 * import.meta.glob needs a literal pattern — it is resolved at build time, so
 * the directory cannot be passed in as a variable.
 */
const byFilename = (modules: Record<string, { default: ImageMetadata }>) =>
  new Map(
    Object.entries(modules).map(([path, mod]) => [
      path.split("/").pop()!,
      mod.default,
    ]),
  );

const projectCovers = byFilename(
  import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/projects/*.{png,jpg,jpeg,webp,avif}",
    { eager: true },
  ),
);

const postCovers = byFilename(
  import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/posts/*.{png,jpg,jpeg,webp,avif}",
    { eager: true },
  ),
);

function lookup(
  covers: Map<string, ImageMetadata>,
  dir: string,
  name?: string,
): ImageMetadata | undefined {
  if (!name) return undefined;
  const image = covers.get(name);
  if (!image) {
    throw new Error(
      `Cover "${name}" not found in ${dir}. ` +
        `Available: ${[...covers.keys()].join(", ") || "(none yet)"}`,
    );
  }
  return image;
}

/** Resolve a project `cover` filename to an optimizable ImageMetadata object. */
export function resolveCover(name?: string): ImageMetadata | undefined {
  return lookup(projectCovers, "src/assets/projects/", name);
}

/** Resolve a post `cover` filename. Images live in src/assets/posts/. */
export function resolvePostCover(name?: string): ImageMetadata | undefined {
  return lookup(postCovers, "src/assets/posts/", name);
}

/** "en/meus-gastos" -> "meus-gastos" */
export function entrySlug(id: string): string {
  return id.split("/").slice(1).join("/");
}

/** "en/meus-gastos" -> "en" */
export function entryLang(id: string): Lang {
  return id.split("/")[0] as Lang;
}

export async function getProjects(lang: Lang) {
  const all = await getCollection("projects");
  return all
    .filter((entry) => entryLang(entry.id) === lang)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedProjects(lang: Lang) {
  return (await getProjects(lang)).filter((entry) => entry.data.featured);
}

export async function getOtherProjects(lang: Lang) {
  return (await getProjects(lang)).filter((entry) => !entry.data.featured);
}

export type ProjectEntry = CollectionEntry<"projects">;

/**
 * Posts, newest first. Drafts are visible while developing and dropped from a
 * production build, so an unfinished post can sit in the repo without leaking.
 */
export async function getPosts(lang: Lang) {
  const all = await getCollection("posts");
  assertTranslated(all.map((entry) => entry.id));

  return all
    .filter((entry) => entryLang(entry.id) === lang)
    .filter((entry) => import.meta.env.DEV || !entry.data.draft)
    .sort((a, b) => {
      // Dates are day-resolution, so two posts written the same day tie. Falling
      // back to the slug keeps the listing and the feed in the same order every
      // build instead of leaving it to whatever getCollection happened to yield.
      const byDate = b.data.date.valueOf() - a.data.date.valueOf();
      return byDate !== 0
        ? byDate
        : entrySlug(a.id).localeCompare(entrySlug(b.id));
    });
}

/**
 * Every post must exist in both locales — the language switcher is unconditional,
 * so a post present in only one would offer a link straight to a 404. Failing
 * the build is the cheap moment to find that out.
 */
function assertTranslated(ids: string[]) {
  const byLang = new Map<Lang, Set<string>>();
  for (const id of ids) {
    const lang = entryLang(id);
    if (!byLang.has(lang)) byLang.set(lang, new Set());
    byLang.get(lang)!.add(entrySlug(id));
  }

  const en = byLang.get("en") ?? new Set();
  const pt = byLang.get("pt-br") ?? new Set();

  const missing = [
    ...[...en].filter((slug) => !pt.has(slug)).map((s) => `pt-br/${s}`),
    ...[...pt].filter((slug) => !en.has(slug)).map((s) => `en/${s}`),
  ];

  if (missing.length > 0) {
    throw new Error(
      `Every post needs both locales. Missing: ${missing.join(", ")}. ` +
        `Add the file, or delete its counterpart.`,
    );
  }
}

/** Locale-aware long date — "12 August 2026" / "12 de agosto de 2026". */
export function formatPostDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export type PostEntry = CollectionEntry<"posts">;

/**
 * Rough but honest: 200 words a minute over the raw MDX, which overcounts by
 * the length of the frontmatter and undercounts code blocks. Close enough to
 * set expectations, which is all a reading time is for.
 */
export function readingTime(post: PostEntry): number {
  const words = post.body?.trim().split(/\s+/).length ?? 0;
  return Math.max(1, Math.round(words / 200));
}

/**
 * "Segurança" -> "seguranca". Tags are prose and written per locale — the same
 * post is tagged "Career" in English and "Carreira" in Portuguese — so the two
 * taxonomies are separate and each slug only has to be stable within its own.
 * Stripping diacritics keeps the Portuguese URLs ASCII.
 */
export function tagSlug(tag: string): string {
  return tag
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Posts grouped under the year they were published, newest first. getPosts
 * already sorts, so consecutive grouping preserves that order and no group
 * needs re-sorting. Year comes from UTC to agree with formatPostDate, which
 * also formats in UTC — otherwise a 1 January post lands in the wrong group
 * for anyone west of Greenwich.
 */
export async function getPostsByYear(
  lang: Lang,
): Promise<{ year: number; posts: PostEntry[] }[]> {
  const groups: { year: number; posts: PostEntry[] }[] = [];

  for (const post of await getPosts(lang)) {
    const year = post.data.date.getUTCFullYear();
    const current = groups.at(-1);
    if (current?.year === year) current.posts.push(post);
    else groups.push({ year, posts: [post] });
  }

  return groups;
}

export interface TagCount {
  /** The tag as written in the post, in this locale. */
  tag: string;
  slug: string;
  count: number;
}

/** Every tag used in a locale, most-used first, ties broken alphabetically. */
export async function getAllTags(lang: Lang): Promise<TagCount[]> {
  const bySlug = new Map<string, TagCount>();

  for (const post of await getPosts(lang)) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      const seen = bySlug.get(slug);
      if (seen) seen.count += 1;
      else bySlug.set(slug, { tag, slug, count: 1 });
    }
  }

  return [...bySlug.values()].sort(
    (a, b) => b.count - a.count || a.tag.localeCompare(b.tag),
  );
}

export async function getPostsByTag(
  lang: Lang,
  slug: string,
): Promise<PostEntry[]> {
  const posts = await getPosts(lang);
  return posts.filter((post) =>
    post.data.tags.some((tag) => tagSlug(tag) === slug),
  );
}

/**
 * Neighbours in the listing, for the footer of a post. Named by direction in
 * time rather than prev/next, which flips meaning depending on whether you are
 * thinking about the list or the calendar.
 */
export async function adjacentPosts(
  lang: Lang,
  id: string,
): Promise<{ newer?: PostEntry; older?: PostEntry }> {
  const posts = await getPosts(lang);
  const i = posts.findIndex((post) => post.id === id);
  if (i === -1) return {};

  return {
    newer: i > 0 ? posts[i - 1] : undefined,
    older: i < posts.length - 1 ? posts[i + 1] : undefined,
  };
}

/**
 * The two tag taxonomies are linked by position: the Nth tag of a post in one
 * locale is the same tag as the Nth in the other. Nothing else ties "Public
 * sector" to "Setor público", so the alignment is checked here rather than
 * trusted — without it a tag page would advertise an hreflang alternate that
 * 404s, which is the exact failure assertTranslated exists to prevent.
 *
 * Keys are "<lang>:<slug>", values the counterpart slug in the other locale.
 */
async function getTagSlugPairs(): Promise<Map<string, string>> {
  const byPost = new Map<string, Partial<Record<Lang, PostEntry>>>();

  for (const entry of await getCollection("posts")) {
    const slug = entrySlug(entry.id);
    const group = byPost.get(slug) ?? {};
    group[entryLang(entry.id)] = entry;
    byPost.set(slug, group);
  }

  const pairs = new Map<string, string>();

  for (const [slug, group] of byPost) {
    const en = group.en;
    const pt = group["pt-br"];
    // A post present in only one locale is assertTranslated's error to report.
    if (!en || !pt) continue;

    if (en.data.tags.length !== pt.data.tags.length) {
      throw new Error(
        `"${slug}" has ${en.data.tags.length} tags in English and ` +
          `${pt.data.tags.length} in Portuguese. Tags pair by position — keep ` +
          `both lists the same length and in the same order.`,
      );
    }

    en.data.tags.forEach((tag, i) => {
      const counterpart = pt.data.tags[i]!;
      link(pairs, "en", tag, counterpart, slug);
      link(pairs, "pt-br", counterpart, tag, slug);
    });
  }

  return pairs;
}

/** One direction of a tag pairing, refusing to overwrite a different one. */
function link(
  pairs: Map<string, string>,
  lang: Lang,
  from: string,
  to: string,
  post: string,
) {
  const key = `${lang}:${tagSlug(from)}`;
  const value = tagSlug(to);
  const existing = pairs.get(key);

  if (existing && existing !== value) {
    throw new Error(
      `Tag "${from}" (${lang}) is paired with both "${existing}" and ` +
        `"${value}" — the second by "${post}". A tag has to translate to the ` +
        `same thing in every post that uses it.`,
    );
  }

  pairs.set(key, value);
}

export interface TagPage extends TagCount {
  posts: PostEntry[];
  /** Real paths for this tag in every locale — hreflang and the switcher. */
  alternates: Record<Lang, string>;
}

/**
 * Everything a tag route needs, including where the same tag lives in the
 * other locale. The slugs differ per locale, so the default alternateUrls()
 * (which reuses the current path) would be wrong on these pages.
 */
export async function getTagPages(lang: Lang): Promise<TagPage[]> {
  const [tags, pairs] = await Promise.all([getAllTags(lang), getTagSlugPairs()]);
  const other: Lang = lang === "en" ? "pt-br" : "en";

  return Promise.all(
    tags.map(async (tag) => {
      const counterpart = pairs.get(`${lang}:${tag.slug}`);
      if (!counterpart) {
        throw new Error(
          `Tag "${tag.tag}" (${lang}) has no counterpart in ${other}. Every ` +
            `post is translated, so this means the two tag lists are out of ` +
            `step somewhere.`,
        );
      }

      return {
        ...tag,
        posts: await getPostsByTag(lang, tag.slug),
        alternates: {
          [lang]: localizePath(`/blog/tags/${tag.slug}`, lang),
          [other]: localizePath(`/blog/tags/${counterpart}`, other),
        } as Record<Lang, string>,
      };
    }),
  );
}
