# nickmiyasato.dev

Personal site and portfolio of Nicholas Miyasato — bilingual (EN / PT-BR), static, and shipped with almost no client-side JavaScript: a ~400-byte theme toggle everywhere, and the blog search on `/blog`.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed on Cloudflare Pages.

## Commands

| Command            | Does                                     |
| ------------------ | ---------------------------------------- |
| `npm install`      | Install dependencies                     |
| `npm run dev`      | Dev server at `localhost:4321`           |
| `npm run build`    | Build the static site to `dist/`         |
| `npm run preview`  | Serve `dist/` locally                    |
| `npm run check`    | Type-check `.astro` and `.ts` files      |
| `npm run og:cards` | Render post social cards (after a build) |

## Layout

```
src/
  content/projects/{en,pt-br}/   Project write-ups (MDX). Locale comes from the
                                 directory; filenames must match across locales
                                 so the language switcher can pair them.
  content/posts/{en,pt-br}/      Blog posts (MDX). Same pairing rule, enforced:
                                 an unpaired post fails the build.
  content.config.ts              Zod schemas for the content collections
  data/site.ts                   Identity, links, intro copy, education
  data/experience.ts             Work timeline — prose for the site, bullets
                                 for the résumé
  data/resume.ts                 Résumé-only content: summary, skills matrix,
                                 ATS title line, the two called-out projects
  i18n/ui.ts                     UI strings per locale
  i18n/utils.ts                  Locale detection and path localisation
  components/                    Astro components (no framework runtime)
  layouts/Base.astro             <head>, meta, hreflang, JSON-LD, theme script
  pages/                         Routes — EN at /, PT-BR under /pt-br/
  pages/og/blog/                 Social card templates, screenshotted after the
                                 build rather than served
  assets/projects/               Screenshots, optimised at build by astro:assets
  assets/posts/                  Blog images, same treatment
  styles/global.css              Design tokens, base styles, components
public/
  _redirects                     301s from the old Docusaurus URLs
  _headers                       Cache-Control and security headers
  fonts/                         Self-hosted Inter and JetBrains Mono (latin)
```

## Adding a project

Create the same filename in both locale directories:

```
src/content/projects/en/my-project.mdx
src/content/projects/pt-br/my-project.mdx
```

Frontmatter is validated against the schema in `src/content.config.ts` — the
build fails on a missing or malformed field. Put the screenshot in
`src/assets/projects/` and reference it by filename in `cover`.

Set `featured: true` for a full-width block on the home page; everything else
falls into the compact list. `order` sorts within each group.

For the screenshot, `scripts/capture-cover.mjs` takes one at the size the
covers are used at, so it does not need cropping afterwards:

```sh
node scripts/capture-cover.mjs https://example.com my-project.png 470
```

The third argument scrolls before the shot — landing pages usually put the
thing worth showing below the hero. Take it by hand instead if a particular
frame is wanted; nothing depends on the script.

## Adding a post

Create the same filename in both locale directories:

```
src/content/posts/en/my-post.mdx
src/content/posts/pt-br/my-post.mdx
```

Both, always. `assertTranslated()` in `src/lib/content.ts` fails the build on a
post that exists in one locale only — the language switcher is unconditional,
so a lone post would offer a link straight to a 404. It is the most common way
to break this build.

```yaml
---
title: What it is called
summary: One line. Shown in the listing and used as the meta description.
date: 2026-08-29
tags: ["Angular", "Public sector"]
# updated: 2026-09-14   # only for a real revision, not a typo fix
# draft: true           # builds in dev, dropped from production
# cover: dashboard.png  # file in src/assets/posts/
---
```

**Tags are prose, and they are translated** — `"Public sector"` in English is
`"Setor público"` in Portuguese. The two tag pages are separate taxonomies with
their own slugs (`/blog/tags/public-sector`, `/pt-br/blog/tags/setor-publico`),
and the only thing linking them is **position**: the Nth tag of a post in one
locale is the same tag as the Nth in the other. Keep both lists the same length
and in the same order, or the build tells you which post is out of step. That
pairing is what lets a tag page point its hreflang at the right counterpart.

Two posts on the same date sort by slug, so the order is stable across builds.

If a slug changes after publication, add the 301 to `public/_redirects` — both
the bare and the trailing-slash form, in both locales. There is precedent in
that file from the Docusaurus migration.

## Search

`/blog` has full-text search over the post bodies, built by
[Pagefind](https://pagefind.app) in the `postbuild` npm script and written to
`dist/pagefind/`. It reads `<html lang>` and keeps one index per locale, so a
Portuguese search never returns English results.

This is the one place the site loads JavaScript that matters. It is loaded
lazily and the box stays hidden until the index answers, so the year-grouped
list below it is what a reader without JS — or anyone on `astro dev`, where
`dist/pagefind/` does not exist — gets, which is the whole blog anyway.

**Search only works against a build.** `npm run build && npm run preview`, not
`npm run dev`. Two things it depends on that are easy to break:

- `data-pagefind-body` on the `<article>` in `src/components/PostDetail.astro`.
  It is what confines the index to posts; remove it and the résumé starts
  turning up in blog results.
- `'wasm-unsafe-eval'` in the CSP in `public/_headers`. Pagefind's index reader
  is WebAssembly. Without it the search box silently never appears, and nothing
  else on the page notices.

## Social cards

A post with a `cover` gets that image cropped to 1200×630. A post without one
gets a card generated from its title and summary: `src/pages/og/blog/[lang]/`
renders it as a real page, and `npm run og:cards` screenshots that page into
`dist/og/blog/<lang>/<slug>.png` with Playwright — the same approach as the
résumé PDFs, and for the same reason, which is that the card then uses the
site's own fonts and palette and cannot drift from them.

The built HTML already points `og:image` at those files, so the step has to run
after `npm run build` and before the upload. `.github/workflows/deploy.yml` does
that. Skipping it locally only means the card 404s on localhost, where nothing
unfurls anything.

## Images in a post

Put the file in `src/assets/posts/` — **never in `public/`**, which skips
optimisation and ships the original bytes.

Formats: `png`, `jpg`, `jpeg`, `webp`, `avif`. **Not HEIC.** An iPhone photo
stores the image as a grid of 512×512 HEVC tiles, and assembling that grid
exceeds libheif's reference limit, so the bundled sharp refuses it — the build
fails complaining about JS syntax, because Vite tried to import it as a module.
Set the camera to "Most Compatible" to shoot JPEG, or convert first. `ffmpeg`
appears to work and does not: it extracts a single tile and hands back a
512×512 crop. On Windows, WIC decodes the grid properly:

```powershell
Add-Type -AssemblyName PresentationCore
$s = [System.IO.File]::OpenRead("in.HEIC")
$d = [System.Windows.Media.Imaging.BitmapDecoder]::Create($s,'PreservePixelFormat','OnLoad')
$e = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
$e.QualityLevel = 90
$e.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($d.Frames[0]))
$o = [System.IO.File]::Open("out.jpg",'Create'); $e.Save($o); $o.Close(); $s.Close()
```

Inside the post, a relative path is enough. Astro rewrites it and emits WebP at
several widths:

```md
![What the dashboard looked like](../../../assets/posts/dashboard.png)
```

For control over widths and loading, import it instead:

```mdx
import { Image } from "astro:assets";
import shot from "@/assets/posts/dashboard.png";

<Image src={shot} alt="What the dashboard looked like" widths={[640, 1024]} />
```

### Sizing

Images in a post are capped at `32rem` tall and centred. Without that, a
portrait photo renders about 750×1000 in the text column and pushes the article
off the screen; wide screenshots are never tall enough for the cap to touch
them. Two overrides, applied to an `<Image>`:

```mdx
<Image src={shot} alt="…" class="img-full" />  {/* edge to edge, no cap */}
<Image src={shot} alt="…" class="img-sm" />    {/* 20rem, for small diagrams */}
```

If the *file* is the wrong size rather than its display, resize the source
instead of shipping pixels nobody sees — 1800px on the long edge is plenty,
since Astro generates the responsive widths from it:

```sh
node -e "require('sharp')('in.jpg').rotate()
  .resize({width:1800,height:1800,fit:'inside',withoutEnlargement:true})
  .jpeg({quality:82,mozjpeg:true}).toFile('src/assets/posts/out.jpg')"
```

### Covers

To give the post a header image and a social card, name the file in
frontmatter — bare filename, no path:

```yaml
cover: dashboard.png
```

That renders above the body as AVIF with a WebP fallback, and is cropped to
1200×630 JPEG for the OG card. A `cover` that does not exist fails the build
with the list of filenames it did find, rather than shipping a broken image.

## The résumé

`/resume` and `/pt-br/resume` are rendered from `src/data/experience.ts`,
`src/data/resume.ts` and the `education` block in `src/data/site.ts` — the same
data the rest of the site reads. There is no separate résumé document to keep in
step.

The PDFs at `/resume.pdf` and `/curriculo.pdf` are those pages printed to paper
by `scripts/render-resume-pdf.mjs`, so the download cannot drift from the page.
Everything the PDF looks like lives in the `@media print` block of
`src/components/Resume.astro`.

```sh
npm run build && npm run resume:pdf
```

The same script runs in `.github/workflows/deploy.yml`, so what you get locally
is what ships. It drives Playwright rather than the runner's own Chrome —
`chrome --headless --print-to-pdf` resolves to old headless there, which ignores
`@page { size: A4 }` and prints before webfonts resolve, producing US Letter
pages set in DejaVu Sans while still exiting 0. The script asserts the page
geometry is A4 afterwards and fails the deploy if it is not.

Each PDF is written to both `dist/` and `public/`. `dist/` is what gets
uploaded; `public/` is what `astro dev` serves, and without that copy the
download button 404s in dev — silently, because the anchor carries `download`,
so the browser saves the 404 page as `resume.htm` rather than reporting an
error. `public/*.pdf` is gitignored: build output that has to live in a source
directory.

**The PDFs are not committed.** On a fresh clone the button 404s until you have
run the command above at least once.

`docs/resume.tex` is still the human-facing LaTeX résumé and still carries a
phone number, which is why `docs/` is gitignored. **Nothing under `src/` may
repeat that number** — it feeds a public PDF.

## Conventions worth keeping

- **Almost no client JS.** If something seems to need a framework island, check
  whether CSS can do it first. What ships today is the theme toggle, the
  copy-email button and the blog search — and the search is lazy, optional, and
  leaves a working page behind when it fails to load. Hold new additions to
  that standard.
- **Images go through `astro:assets`.** Never reference a screenshot from
  `public/` — that skips optimisation and ships the raw file.
- **URLs are locale-agnostic in code.** Build paths with `localizePath()` from
  `src/i18n/utils.ts` rather than hardcoding a `/pt-br` prefix.
- **Old URLs stay alive.** If a project slug changes, add the 301 to
  `public/_redirects`.

## History

This replaced a Docusaurus site in 2026. The previous version, including five
Portuguese blog posts, remains in the git history:

```sh
git show main:i18n/pt-br/docusaurus-plugin-content-blog/2025-05-18-solid/index.mdx
```
