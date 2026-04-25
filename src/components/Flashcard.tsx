import { useState } from "react";
import { commands } from "../data/commands";
import { ui } from "../locales/translations";
import type { Language } from "../locales/types";

export function Flashcard({ language }: { language: Language }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState(0);
  const [review, setReview] = useState(0);
  const card = commands[index % commands.length];

  if (!card) {
    return <p>{ui.noQuestion[language]}</p>;
  }

  function next(mark: "known" | "review") {
    if (mark === "known") setKnown((value) => value + 1);
    else setReview((value) => value + 1);
    setIndex((value) => (value + 1) % commands.length);
    setRevealed(false);
  }

  return (
    <section className="rounded-3xl bg-moss p-5 text-white shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-bold">Flashcards</h3>
        <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-bold">
          {index + 1}/{commands.length} · ✅ {known} · 🔁 {review}
        </span>
      </div>
      <div className="mt-5 rounded-3xl bg-white p-6 text-center text-ink">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-clay">{ui.french[language]}</p>
        <p className="mt-3 font-display text-4xl font-bold">{card.french}</p>
        <p className="mt-2 text-lg text-ink/60">{card.pronunciation}</p>
        {revealed && (
          <div className="mt-5 grid gap-2 rounded-2xl bg-cream p-4 text-left">
            <p><strong>{ui.english[language]}:</strong> {card.english}</p>
            <p><strong>{ui.vietnamese[language]}:</strong> {card.vietnamese}</p>
            <p><strong>{ui.gestureSituation[language]}:</strong> {card.situation[language]}</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => setRevealed(true)} className="focus-ring rounded-full bg-white px-4 py-2 font-extrabold text-moss">
          {ui.reveal[language]}
        </button>
        <button type="button" onClick={() => next("known")} className="focus-ring rounded-full bg-mint px-4 py-2 font-extrabold text-moss">
          {ui.knowIt[language]}
        </button>
        <button type="button" onClick={() => next("review")} className="focus-ring rounded-full bg-clay px-4 py-2 font-extrabold text-white">
          {ui.reviewAgain[language]}
        </button>
      </div>
    </section>
  );
}
