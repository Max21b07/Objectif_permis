import { useMemo, useState } from "react";
import { quizQuestions } from "../data/quiz";
import { ui } from "../locales/translations";
import type { Language } from "../locales/types";
import { getProgress, recordSession, saveProgress, type LearningProgress } from "../utils/progress";

const categories = ["All", ...Array.from(new Set(quizQuestions.map((question) => question.category)))];
const levels = ["all", "easy", "intermediate", "scenario"] as const;

export function Quiz({ language, onProgressChange }: { language: Language; onProgressChange?: (progress: LearningProgress) => void }) {
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState<(typeof levels)[number]>("all");
  const [quickMode, setQuickMode] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const questions = useMemo(() => {
    const filtered = quizQuestions.filter((question) => {
      return (category === "All" || question.category === category) && (level === "all" || question.level === level);
    });
    return quickMode ? filtered.slice(0, 5) : filtered;
  }, [category, level, quickMode]);

  const current = questions[index] ?? questions[0];
  const completed = questions.length > 0 && Object.keys(answers).filter((id) => questions.some((q) => q.id === id)).length === questions.length;
  const score = questions.reduce((sum, question) => sum + (answers[question.id] === question.correctIndex ? 1 : 0), 0);
  const mistakes = questions.filter((question) => answers[question.id] !== undefined && answers[question.id] !== question.correctIndex);

  function reset() {
    setIndex(0);
    setSelected(null);
    setAnswers({});
  }

  function saveQuizScore() {
    const finalScore = Math.round((score / questions.length) * 100);
    const progress = getProgress();
    const next = recordSession(
      { ...progress, quizCompleted: progress.quizCompleted + 1 },
      { id: `${Date.now()}`, date: new Date().toISOString().slice(0, 10), type: "quiz", score: finalScore, categories: Array.from(new Set(questions.map((item) => item.category))).slice(0, 4) },
    );
    saveProgress(next);
    onProgressChange?.(next);
  }

  function check() {
    if (selected === null || !current) return;
    setAnswers((value) => ({ ...value, [current.id]: selected }));
  }

  function next() {
    setSelected(null);
    setIndex((value) => Math.min(value + 1, questions.length - 1));
  }

  if (!current) {
    return <p>{ui.noQuestion[language]}</p>;
  }

  return (
    <section className="rounded-3xl bg-white/90 p-5 shadow-soft ring-1 ring-moss/10">
      <div className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
        <label>
          <span className="sr-only">{ui.quizCategoryLabel[language]}</span>
          <select value={category} onChange={(event) => { setCategory(event.target.value); reset(); }} className="focus-ring w-full rounded-2xl border border-moss/20 bg-cream px-4 py-3">
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="sr-only">{ui.quizLevelLabel[language]}</span>
          <select value={level} onChange={(event) => { setLevel(event.target.value as (typeof levels)[number]); reset(); }} className="focus-ring w-full rounded-2xl border border-moss/20 bg-cream px-4 py-3">
            {levels.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <button type="button" onClick={reset} className="focus-ring rounded-2xl bg-mint px-4 py-3 font-extrabold text-moss">{ui.restart[language]}</button>
      </div>
      <button
        type="button"
        onClick={() => { setQuickMode((value) => !value); reset(); }}
        className="focus-ring mt-3 rounded-2xl bg-lemon px-4 py-3 font-extrabold text-ink"
      >
        {quickMode ? "Normal quiz" : "Quick quiz 5"}
      </button>

      <div className="mt-5 rounded-3xl bg-cream p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-extrabold text-clay">{current.level} · {current.category}</p>
          <p className="font-extrabold">{index + 1}/{questions.length} · {ui.score[language]} {score}</p>
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold">{current.question[language]}</h3>
        <div className="mt-4 grid gap-3">
          {current.answers.map((answer, answerIndex) => {
            const checked = answers[current.id] !== undefined;
            const isCorrect = answerIndex === current.correctIndex;
            const isSelected = selected === answerIndex;
            return (
              <button
                type="button"
                key={answer[language]}
                onClick={() => !checked && setSelected(answerIndex)}
                className={`focus-ring rounded-2xl border px-4 py-3 text-left font-bold transition ${
                  checked && isCorrect
                    ? "border-moss bg-mint text-moss"
                    : checked && isSelected
                      ? "border-clay bg-rosewash text-clay"
                      : isSelected
                        ? "border-moss bg-skysoft"
                        : "border-moss/10 bg-white"
                }`}
              >
                {answer[language]}
              </button>
            );
          })}
        </div>
        {answers[current.id] !== undefined && (
          <div className="mt-4 rounded-2xl bg-white p-4">
            <p className="font-extrabold">{answers[current.id] === current.correctIndex ? ui.correct[language] : ui.reviewThis[language]}</p>
            <p className="mt-1 text-sm leading-6 text-ink/75">{current.explanation[language]}</p>
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={check} className="focus-ring rounded-full bg-moss px-5 py-3 font-extrabold text-white">{ui.checkAnswer[language]}</button>
          <button type="button" onClick={next} disabled={index === questions.length - 1} className="focus-ring rounded-full bg-clay px-5 py-3 font-extrabold text-white disabled:opacity-40">{ui.next[language]}</button>
        </div>
      </div>

      {completed && (
        <div className="mt-5 rounded-3xl bg-moss p-5 text-white">
          <h3 className="font-display text-2xl font-bold">{ui.score[language]}: {score}/{questions.length}</h3>
          <p className="mt-2 text-white/80">
            {mistakes.length === 0
              ? { vi: "Không có lỗi. Tiếp tục ôn để phản xạ nhanh hơn.", en: "No mistakes. Keep reviewing for faster reflexes.", fr: "Aucune erreur. Continuez pour rendre les réflexes plus rapides." }[language]
              : { vi: "Ôn lại các chủ đề có lỗi trước buổi lái tiếp theo.", en: "Review the mistake categories before the next drive.", fr: "Revoir les catégories d'erreurs avant la prochaine séance." }[language]}
          </p>
          {mistakes.length > 0 && <p className="mt-3 text-sm font-bold">{ui.review[language]}: {Array.from(new Set(mistakes.map((item) => item.category))).join(", ")}</p>}
          <button type="button" onClick={saveQuizScore} className="focus-ring mt-4 rounded-full bg-lemon px-5 py-3 font-extrabold text-ink">
            {ui.saveDebrief[language]}
          </button>
        </div>
      )}
    </section>
  );
}
