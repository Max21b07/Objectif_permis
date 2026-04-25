export type Language = "vi" | "en" | "fr";

export type LocalizedString = Record<Language, string>;

export const languages: Array<{ code: Language; label: string }> = [
  { code: "vi", label: "🇻🇳 Tiếng Việt" },
  { code: "en", label: "🇬🇧 English" },
  { code: "fr", label: "🇫🇷 Français" },
];
