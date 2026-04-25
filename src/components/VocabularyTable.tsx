import { useDeferredValue, useMemo, useState } from "react";
import { vocabulary, vocabularyCategories } from "../data/vocabulary";
import { ui } from "../locales/translations";
import type { Language } from "../locales/types";
import { ProgressBadge } from "./ProgressBadge";

export function VocabularyTable({ language }: { language: Language }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [vitalOnly, setVitalOnly] = useState(false);
  const [showTranslations, setShowTranslations] = useState(true);
  const deferredQuery = useDeferredValue(query.toLowerCase());

  const filtered = useMemo(() => {
    return vocabulary.filter((item) => {
      const text = `${item.french} ${item.english} ${item.vietnamese} ${item.category}`.toLowerCase();
      return (
        text.includes(deferredQuery) &&
        (category === "all" || item.category === category) &&
        (!vitalOnly || item.importance === "Vital")
      );
    });
  }, [category, deferredQuery, vitalOnly]);

  return (
    <section className="rounded-3xl bg-white/90 p-4 shadow-soft ring-1 ring-moss/10">
      <div className="grid gap-3 md:grid-cols-[1fr_220px_auto_auto]">
        <label>
          <span className="sr-only">{ui.vocabularySearchLabel[language]}</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={ui.search[language]}
            className="focus-ring w-full rounded-2xl border border-moss/20 bg-cream px-4 py-3"
          />
        </label>
        <label>
          <span className="sr-only">{ui.vocabularyCategoryLabel[language]}</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="focus-ring w-full rounded-2xl border border-moss/20 bg-cream px-4 py-3"
          >
            <option value="all">{ui.allCategories[language]}</option>
            {vocabularyCategories.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={() => setVitalOnly((value) => !value)} className={`focus-ring rounded-2xl px-4 py-3 font-bold ${vitalOnly ? "bg-clay text-white" : "bg-mint text-moss"}`}>
          {ui.vitalOnly[language]}
        </button>
        <button type="button" onClick={() => setShowTranslations((value) => !value)} className="focus-ring rounded-2xl bg-skysoft px-4 py-3 font-bold text-moss">
          {showTranslations ? ui.hideTranslations[language] : ui.showTranslations[language]}
        </button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[900px] border-separate border-spacing-y-2 text-left text-sm">
          <thead>
            <tr className="text-ink/60">
              <th scope="col" className="px-3 py-2">{ui.french[language]}</th>
              <th scope="col" className="px-3 py-2">{ui.pronunciation[language]}</th>
              {showTranslations && <th scope="col" className="px-3 py-2">{ui.english[language]}</th>}
              {showTranslations && <th scope="col" className="px-3 py-2">{ui.vietnamese[language]}</th>}
              <th scope="col" className="px-3 py-2">{ui.category[language]}</th>
              <th scope="col" className="px-3 py-2">{ui.importance[language]}</th>
              <th scope="col" className="px-3 py-2">{ui.example[language]}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={`${item.french}-${item.category}`} className="rounded-2xl bg-cream">
                <td className="rounded-l-2xl px-3 py-3 font-extrabold">{item.french}</td>
                <td className="px-3 py-3">{item.pronunciation}</td>
                {showTranslations && <td className="px-3 py-3">{item.english}</td>}
                {showTranslations && <td className="px-3 py-3">{item.vietnamese}</td>}
                <td className="px-3 py-3">{item.category}</td>
                <td className="px-3 py-3"><ProgressBadge value={item.importance} /></td>
                <td className="rounded-r-2xl px-3 py-3">{item.example[language]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm font-bold text-ink/60">{filtered.length} / {vocabulary.length}</p>
    </section>
  );
}
