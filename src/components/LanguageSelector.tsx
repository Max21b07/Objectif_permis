import { languages, type Language } from "../locales/types";

interface Props {
  language: Language;
  onChange: (language: Language) => void;
}

export function LanguageSelector({ language, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-full bg-white/85 p-1 shadow-sm ring-1 ring-moss/10">
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => onChange(item.code)}
          className={`focus-ring rounded-full px-3 py-2 text-sm font-extrabold transition ${
            language === item.code ? "bg-moss text-white" : "text-moss hover:bg-mint/70"
          }`}
          aria-pressed={language === item.code}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
