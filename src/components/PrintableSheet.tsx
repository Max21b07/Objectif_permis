import type { PrintableSheetData } from "../data/types";
import { ui } from "../locales/translations";
import type { Language } from "../locales/types";

export function PrintableSheet({ sheet, language }: { sheet: PrintableSheetData; language: Language }) {
  return (
    <article className="print-sheet rounded-3xl bg-white p-6 shadow-soft ring-1 ring-moss/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-bold">{sheet.title[language]}</h3>
          <p className="mt-2 text-sm leading-6 text-ink/70">{sheet.intro[language]}</p>
        </div>
        <button type="button" onClick={() => window.print()} className="no-print focus-ring rounded-full bg-moss px-4 py-2 text-sm font-extrabold text-white">
          {ui.print[language]}
        </button>
      </div>
      <ol className="mt-5 grid gap-2">
        {sheet.items.map((item, index) => (
          <li key={`${sheet.id}-${index}`} className="rounded-2xl border border-moss/10 px-4 py-3 text-sm leading-6">
            <span className="font-extrabold text-clay">{index + 1}.</span> {item[language]}
          </li>
        ))}
      </ol>
    </article>
  );
}
