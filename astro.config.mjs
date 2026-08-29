// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const SITE = "https://nickmiyasato.dev";

export default defineConfig({
  site: SITE,
  trailingSlash: "ignore",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt-br"],
    routing: {
      // English lives at the root (/), Portuguese at /pt-br/ — same shape as the
      // Docusaurus site so existing inbound links and SEO survive the migration.
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    mdx(),
    sitemap({
      // The /og/ routes are card templates that exist to be screenshotted by
      // scripts/render-og-cards.mjs. They carry noindex; keeping them out of
      // the sitemap stops them being offered up in the first place.
      filter: (page) => !page.includes("/og/"),
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", "pt-br": "pt-BR" },
      },
    }),
  ],

  // Output format is chosen per component, not globally: <Image> emits WebP,
  // and <Picture formats={["avif"]} fallbackFormat="webp"> is used for the
  // large project covers where AVIF is worth the extra encode.

  build: {
    // The whole stylesheet is ~5 kB brotli. Inlining it costs that much per
    // page but removes the one render-blocking request in front of the LCP
    // heading — the right trade for a site most people load exactly once.
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
