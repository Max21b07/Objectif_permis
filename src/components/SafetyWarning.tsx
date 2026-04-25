import { ui } from "../locales/translations";
import type { Language } from "../locales/types";

interface Props {
  language: Language;
  compact?: boolean;
}

export function SafetyWarning({ language, compact = false }: Props) {
  return (
    <section className={`rounded-3xl border-2 border-clay/30 bg-rosewash/85 ${compact ? "p-4" : "p-5 md:p-6"} shadow-soft`}>
      <div className="flex gap-3">
        <div className="text-3xl" aria-hidden="true">⚠️</div>
        <div>
          <p className="font-extrabold text-clay">{ui.legalShort[language]}</p>
          {!compact && <p className="mt-2 text-sm leading-6 text-ink/75">{ui.verifyRules[language]}</p>}
        </div>
      </div>
    </section>
  );
}
