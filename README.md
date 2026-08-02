# nickmiyasato.com.br

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
  data/experience.ts             Work timeline
  i18n/ui.ts                     UI strings per locale
  i18n/utils.ts                  Locale detection and path localisation
  components/                    Astro components (no framework runtime)
  layouts/Base.astro             <head>, meta, hreflang, JSON-LD, theme script
  pages/                         Routes — EN at /, PT-BR under /pt-br/
  assets/projects/               Screenshots, optimised at build by astro:assets
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
