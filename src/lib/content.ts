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

/** "en/fut-evento" -> "fut-evento" */
export function entrySlug(id: string): string {
  return id.split("/").slice(1).join("/");
}

/** "en/fut-evento" -> "en" */
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
