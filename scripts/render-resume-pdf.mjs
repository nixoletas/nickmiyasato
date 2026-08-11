// Renders the built /resume pages to PDF.
//
// Run after `npm run build`; used by .github/workflows/deploy.yml and available
// locally as `npm run resume:pdf` so a change to the print layout can be checked
// without pushing.
//
// This deliberately drives Playwright rather than `chrome --headless
// --print-to-pdf`. The system-Chrome route silently produced US Letter pages
// with fallback system fonts on ubuntu-latest: old headless ignores
// `@page { size: A4 }` and prints before webfonts resolve, and it exits 0 while
// doing it. `preferCSSPageSize` plus an explicit wait on document.fonts is what
// makes the output match what the browser shows.

import { preview } from "astro";
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

/** A4 in PostScript points, which is what a PDF MediaBox is measured in. */
const A4 = { width: 595, height: 842 };
const TOLERANCE = 2;

const TARGETS = [
  { path: "/resume/", out: "dist/resume.pdf" },
  { path: "/pt-br/resume/", out: "dist/curriculo.pdf" },
];

/**
 * Read the page size back out of the file we just wrote. Every failure mode
 * seen so far — wrong page box, missing stylesheet, fallback fonts — shows up
 * as a MediaBox that is not A4, so this is the check worth having.
 */
function assertA4(file) {
  const pdf = readFileSync(file).toString("latin1");
  const match = pdf.match(/\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)/);
  if (!match) throw new Error(`${file}: no MediaBox — not a readable PDF`);

  const [width, height] = [Number(match[1]), Number(match[2])];
  const ok =
    Math.abs(width - A4.width) <= TOLERANCE &&
    Math.abs(height - A4.height) <= TOLERANCE;

  if (!ok) {
    throw new Error(
      `${file}: page is ${width}x${height}pt, expected A4 (${A4.width}x${A4.height}pt). ` +
        `The print stylesheet did not apply.`,
    );
  }
  return { width, height };
}

const server = await preview({ logLevel: "error" });
const origin = `http://${server.host ?? "localhost"}:${server.port}`;
const browser = await chromium.launch();

try {
  const page = await browser.newPage();

  for (const { path, out } of TARGETS) {
    const response = await page.goto(`${origin}${path}`, {
      waitUntil: "networkidle",
    });
    if (!response?.ok()) {
      throw new Error(`${path}: server returned ${response?.status()}`);
    }

    // Self-hosted webfonts use font-display: swap, so the first paint can land
    // on a fallback face. Printing that is how the CI output ended up in
    // DejaVu Sans.
    await page.evaluate(() => document.fonts.ready);

    await page.pdf({
      path: out,
      // Let @page in src/components/Resume.astro own the paper size and
      // margins, rather than restating them here where they would drift.
      preferCSSPageSize: true,
      printBackground: false,
    });

    const size = assertA4(out);
    console.log(`${out}: ${size.width}x${size.height}pt`);
  }
} finally {
  await browser.close();
  await server.stop();
}
