import type { Language } from "../locales/types";
import type { ModuleInfo } from "../data/types";

interface Props {
  module: ModuleInfo;
  language: Language;
  onOpen: () => void;
}

export function ModuleCard({ module, language, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="focus-ring group rounded-3xl bg-white/90 p-5 text-left shadow-soft ring-1 ring-moss/10 transition hover:-translate-y-1 hover:bg-white"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-2xl transition group-hover:rotate-3">
        {module.icon}
      </div>
      <h3 className="font-display text-2xl font-bold text-ink">{module.title[language]}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/70">{module.description[language]}</p>
    </button>
  );
}
