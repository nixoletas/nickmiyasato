// Captures a project cover screenshot straight into src/assets/projects/.
//
//   node scripts/capture-cover.mjs https://example.com my-project.png [scrollY]
//
// Deliberately not part of the build: covers are chosen, not generated. This
// only exists so the first capture is the right size and does not need a
// browser window and a crop. Existing covers are ~1900x900, which is the
// viewport below; astro:assets derives every responsive width from it.
//
// If the landing page is not the frame worth showing, take the screenshot by
// hand instead and drop it at the same path — nothing here is load-bearing.

import { chromium } from "playwright";
import { resolve } from "node:path";

const [url, name, scrollY = "0"] = process.argv.slice(2);
if (!url || !name) {
  throw new Error(
    "usage: node scripts/capture-cover.mjs <url> <filename.png> [scrollY]",
  );
}

const out = resolve("src/assets/projects", name);
const browser = await chromium.launch();

try {
  const page = await browser.newPage({
    viewport: { width: 1900, height: 900 },
    deviceScaleFactor: 1,
    // The site under capture may honour prefers-color-scheme, and every other
    // cover in the directory is a light-theme screenshot.
    colorScheme: "light",
    // An app that negotiates its own locale will otherwise answer in whatever
    // the machine taking the screenshot is set to. The covers on this site are
    // read in both locales, and English is the one they are captioned in.
    locale: "en-US",
  });

  // Not `networkidle`: an app that holds a websocket open — a realtime
  // subscription, a dev socket — never reaches it, and the wait times out on a
  // page that has been fully painted for 30 seconds.
  const response = await page.goto(url, { waitUntil: "load" });
  if (!response?.ok()) {
    throw new Error(`${url}: server returned ${response?.status()}`);
  }

  // Webfonts and lazily-loaded hero images both land after first paint, and a
  // screenshot taken before them is the fallback face on a grey box.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500);

  // Landing pages put the thing worth showing below the hero. Scrolling before
  // the shot beats cropping after it — the viewport is already the cover's
  // aspect ratio.
  if (scrollY !== "0") {
    await page.evaluate((y) => window.scrollTo(0, y), Number(scrollY));
    await page.waitForTimeout(600);
  }

  await page.screenshot({ path: out });
  console.log(`${out}: 1900x900`);
} finally {
  await browser.close();
}
