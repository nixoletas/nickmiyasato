import { defaultLang, ui, type Lang, type UIKey } from "./ui";

/** All supported locales, default first. */
export const locales: Lang[] = ["en", "pt-br"];

/**
 * Derive the active locale from the request path.
 * English is served from the root, Portuguese from /pt-br/.
 */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split("/");
  return first === "pt-br" ? "pt-br" : defaultLang;
}

/** Look up a UI string, falling back to English if a translation is missing. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Turn a locale-agnostic path ("/projects/fut-evento") into a real URL for the
 * given locale. English keeps the bare path; Portuguese gets the /pt-br prefix.
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = "/" + path.replace(/^\/+/, "").replace(/\/+$/, "");
  if (lang === defaultLang) return clean === "/" ? "/" : clean;
  return clean === "/" ? "/pt-br" : `/pt-br${clean}`;
}

/** Strip the locale prefix, giving back the locale-agnostic path. */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/pt-br(?=\/|$)/, "");
  const clean = stripped.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

/**
 * The same page in every locale — used for the language switcher and for the
 * hreflang alternates in <head>.
 */
export function alternateUrls(url: URL): Record<Lang, string> {
  const base = stripLocale(url.pathname);
  return {
    en: localizePath(base, "en"),
    "pt-br": localizePath(base, "pt-br"),
  };
}
