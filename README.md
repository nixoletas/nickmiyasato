# nickmiyasato.dev

Personal site and portfolio of Nicholas Miyasato — bilingual (EN / PT-BR), static, and shipped with no client-side JavaScript beyond a ~400-byte theme toggle.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed on Cloudflare Pages.

## Commands

| Command           | Does                                |
| ----------------- | ----------------------------------- |
| `npm install`     | Install dependencies                |
| `npm run dev`     | Dev server at `localhost:4321`      |
| `npm run build`   | Build the static site to `dist/`    |
| `npm run preview` | Serve `dist/` locally               |
| `npm run check`   | Type-check `.astro` and `.ts` files |

## Layout

```
src/
  content/projects/{en,pt-br}/   Project write-ups (MDX). Locale comes from the
                                 directory; filenames must match across locales
                                 so the language switcher can pair them.
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

- **No client JS.** If something seems to need a framework island, check whether
  CSS can do it first. The only script that ships is the theme toggle.
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
