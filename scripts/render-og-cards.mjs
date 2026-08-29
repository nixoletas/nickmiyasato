// Screenshots the /og/blog/ card pages into PNGs next to themselves.
//
// Run after `npm run build`; used by .github/workflows/deploy.yml and available
// locally as `npm run og:cards`. Posts without a `cover` point their og:image
// at the file this writes — see postOgImage() in src/lib/seo.ts — so a post
// gets its own social card instead of the site-wide default.
//
// Only dist/ is written, unlike the résumé PDFs. Those have to exist in public/
// as well because a 404 there is a broken download button in dev; a card that
// is missing in dev costs nothing, because nothing unfurls localhost.

import { preview } from "astro";
import { chromium } from "playwright";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "dist/og/blog";
const SIZE = { width: 1200, height: 630 };

/**
 * dist/og/blog/<lang>/<slug>/index.html -> a page to shoot and a file to write.
 * Reading the built output rather than the content collection keeps this script
 * free of the Astro content APIs, and it can only ever ask for pages that were
 * actually built.
 */
function cards() {
  const found = [];

  for (const lang of readdirSync(ROOT)) {
    const langDir = join(ROOT, lang);
    if (!statSync(langDir).isDirectory()) continue;

    for (const slug of readdirSync(langDir)) {
      // Skip the PNGs a previous run left behind in the same directory.
      if (!statSync(join(langDir, slug)).isDirectory()) continue;
      found.push({
        path: `/og/blog/${lang}/${slug}/`,
        out: join(langDir, `${slug}.png`),
      });
    }
  }

  return found;
}

const targets = cards();
if (targets.length === 0) {
  throw new Error(`No card pages under ${ROOT} — did the build run?`);
}

const server = await preview({ logLevel: "error" });
const origin = `http://${server.host ?? "localhost"}:${server.port}`;
const browser = await chromium.launch();

try {
  const page = await browser.newPage({
    viewport: SIZE,
    deviceScaleFactor: 1,
    // The card has no theme script, so it renders light unless the machine
    // taking the screenshot pushes it the other way.
    colorScheme: "light",
  });

  for (const { path, out } of targets) {
    const response = await page.goto(`${origin}${path}`, { waitUntil: "load" });
    if (!response?.ok()) {
      throw new Error(`${path}: server returned ${response?.status()}`);
    }

    // Self-hosted webfonts use font-display: swap. Shooting before they resolve
    // is how a card ends up set in the fallback face, silently and at full
    // resolution — the same failure the résumé PDFs guard against.
    await page.evaluate(() => document.fonts.ready);

    writeFileSync(out, await page.screenshot({ type: "png" }));
    console.log(`${out}: ${SIZE.width}x${SIZE.height}`);
  }
} finally {
  await browser.close();
  await server.stop();
}
