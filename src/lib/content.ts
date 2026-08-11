import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "@/i18n/ui";

/** Every image that a project or case study can point at via `cover`. */
const coverModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/projects/*.{png,jpg,jpeg,webp,avif}",
  { eager: true },
);

const covers = new Map<string, ImageMetadata>(
  Object.entries(coverModules).map(([path, mod]) => [
    path.split("/").pop()!,
    mod.default,
  ]),
);

/** Resolve a `cover` filename to an optimizable ImageMetadata object. */
export function resolveCover(name?: string): ImageMetadata | undefined {
  if (!name) return undefined;
  const image = covers.get(name);
  if (!image) {
    throw new Error(
      `Cover "${name}" not found in src/assets/projects/. ` +
        `Available: ${[...covers.keys()].join(", ")}`,
    );
  }
  return image;
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
