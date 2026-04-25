import { modules } from "../data/modules";
import { ui } from "../locales/translations";
import type { Language } from "../locales/types";
import type { ModuleId } from "../data/types";
import { LanguageSelector } from "./LanguageSelector";

interface Props {
  language: Language;
  active: ModuleId;
  onLanguageChange: (language: Language) => void;
  onNavigate: (id: ModuleId) => void;
  children: React.ReactNode;
}

export function Layout({ language, active, onLanguageChange, onNavigate, children }: Props) {
  return (
    <div className="min-h-screen">
      <header className="no-print sticky top-0 z-20 border-b border-moss/10 bg-cream/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <button type="button" onClick={() => onNavigate("home")} className="focus-ring text-left">
            <p className="font-display text-2xl font-bold text-moss">{ui.appName[language]}</p>
            <p className="text-xs font-bold text-ink/60">{ui.tagline[language]}</p>
          </button>
          <LanguageSelector language={language} onChange={onLanguageChange} />
        </div>
        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-4">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className={`focus-ring whitespace-nowrap rounded-full px-4 py-2 text-sm font-extrabold ${active === "home" ? "bg-moss text-white" : "bg-white/80 text-moss"}`}
          >
            {ui.home[language]}
          </button>
          {modules.map((module) => (
            <button
              type="button"
              key={module.id}
              onClick={() => onNavigate(module.id)}
              className={`focus-ring whitespace-nowrap rounded-full px-4 py-2 text-sm font-extrabold ${active === module.id ? "bg-moss text-white" : "bg-white/80 text-moss"}`}
            >
              {module.title[language]}
            </button>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 md:py-12">{children}</main>
      <footer className="no-print mx-auto max-w-7xl px-4 pb-8 text-sm text-ink/60">
        <p>{ui.sourceDisclaimer[language]}</p>
      </footer>
    </div>
  );
}
