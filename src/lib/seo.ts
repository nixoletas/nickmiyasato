import { getImage } from "astro:assets";
import { site } from "@/data/site";
import { htmlLang, type Lang } from "@/i18n/ui";
import { localizePath } from "@/i18n/utils";
import {
  resolveCover,
  entrySlug,
  type PostEntry,
  type ProjectEntry,
} from "@/lib/content";

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
 * BlogPosting rather than Article: it is the type search engines actually treat
 * as a blog entry, and it inherits everything Article would have carried.
 * `author` points at the site-wide Person by @id rather than restating a name,
 * so the post and the profile resolve to one entity.
 */
export function postSchema(post: PostEntry, lang: Lang, image?: string) {
  const { title, summary, date, tags } = post.data;
  const url = absolute(localizePath(`/blog/${entrySlug(post.id)}`, lang));

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: summary,
    url,
    mainEntityOfPage: url,
    inLanguage: htmlLang[lang],
    datePublished: date.toISOString(),
    ...(tags.length > 0 ? { keywords: tags.join(", ") } : {}),
    author: { "@type": "Person", "@id": personId, name: site.legalName },
    publisher: { "@type": "Person", "@id": personId, name: site.legalName },
    ...(image ? { image: absolute(image) } : {}),
  };
}

/**
 * The résumé page, tied back to the same Person by @id. `mainEntity` is what
 * tells a crawler this page *is* the profile rather than a page mentioning one,
 * and the DigitalDocument names the PDF so the file is discoverable on its own
 * rather than only through a download attribute.
 */
export function profilePageSchema(lang: Lang, pdfPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absolute(localizePath("/resume", lang)),
    inLanguage: htmlLang[lang],
    mainEntity: { "@type": "Person", "@id": personId, name: site.legalName },
    hasPart: {
      "@type": "DigitalDocument",
      name: lang === "en" ? "Résumé (PDF)" : "Currículo (PDF)",
      encodingFormat: "application/pdf",
      url: new URL(pdfPath, site.url).href,
    },
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
