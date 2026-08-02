import { getImage } from "astro:assets";
import { site } from "@/data/site";
import { htmlLang, type Lang } from "@/i18n/ui";
import { localizePath } from "@/i18n/utils";
import { resolveCover, entrySlug, type ProjectEntry } from "@/lib/content";

/**
 * Every social card is generated at this size, and public/img/og-default.png
 * matches it — so the dimensions can be emitted as constants rather than
 * threaded through from each page.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;

/**
 * A project cover cropped to card proportions. JPEG on purpose: link unfurlers
 * (WhatsApp, LinkedIn, Slack) are far behind browsers on AVIF and WebP, and a
 * card that fails to decode is worse than a heavier one.
 *
 * Covers are screenshots, so the crop holds the top of the frame — that is
 * where the header and headline are, and a centred crop cuts both.
 */
export async function projectOgImage(cover?: string): Promise<string | undefined> {
  const source = resolveCover(cover);
  if (!source) return undefined;

  const image = await getImage({
    src: source,
    ...OG_SIZE,
    fit: "cover",
    position: "top",
    format: "jpeg",
    quality: 72,
  });

  return image.src;
}

/**
 * Schema URLs have to be byte-identical to the canonical to name the same
 * entity, and the canonical carries a trailing slash — localizePath strips it.
 */
const absolute = (path: string) =>
  new URL(path.endsWith("/") ? path : `${path}/`, site.url).href;

/** The site-wide Person, referenced by @id from the per-page schemas. */
const personId = `${site.url}/#person`;

/**
 * Trail of {name, path} pairs, locale-agnostic paths in, BreadcrumbList out.
 * Search engines use this for the breadcrumb line under a result; it also tells
 * them the project pages sit under /projects rather than floating at the root.
 */
export function breadcrumbSchema(
  lang: Lang,
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absolute(localizePath(crumb.path, lang)),
    })),
  };
}

/**
 * CreativeWork rather than SoftwareApplication: the latter is only eligible for
 * rich results with an offers/price block, and none of these are for sale.
 */
export function projectSchema(project: ProjectEntry, lang: Lang, image?: string) {
  const { title, summary, year, stack, demo, repo } = project.data;
  const url = absolute(localizePath(`/projects/${entrySlug(project.id)}`, lang));

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: summary,
    url,
    inLanguage: htmlLang[lang],
    dateCreated: year,
    keywords: stack.join(", "),
    author: { "@type": "Person", "@id": personId, name: site.legalName },
    ...(image ? { image: absolute(image) } : {}),
    // Where the thing itself lives, as opposed to this page about it.
    ...(demo || repo
      ? { sameAs: [demo, repo].filter(Boolean) as string[] }
      : {}),
  };
}
