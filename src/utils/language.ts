import type { Language } from "../locales/types";

const supportedLanguages: Language[] = ["vi", "en", "fr"];
const storageKey = "preferredLanguage";

function isSupportedLanguage(value: string | null): value is Language {
  return supportedLanguages.includes(value as Language);
}

export function getInitialLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (isSupportedLanguage(stored)) {
      return stored;
    }
  } catch {
    // localStorage may be unavailable in private or restricted contexts.
  }

  const browserLanguage = navigator.language.toLowerCase();
  if (browserLanguage.startsWith("vi")) return "vi";
  if (browserLanguage.startsWith("fr")) return "fr";
  if (browserLanguage.startsWith("en")) return "en";
  return "vi";
}

export function setLanguage(lang: Language): void {
  try {
    window.localStorage.setItem(storageKey, lang);
  } catch {
    // The site remains usable even if persistence is blocked.
  }
  document.documentElement.lang = lang;
}
