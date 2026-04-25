import { useState } from "react";
import { badges } from "../data/badges";
import { commands } from "../data/commands";
import { actionButtons, audioActions, getMaximeFrenchAudio } from "../data/audioActions";
import { miniScenarios } from "../data/scenarios";
import type { CommandItem, MiniScenario, ModuleId, QuizQuestion, VocabularyItem } from "../data/types";
import { quizQuestions } from "../data/quiz";
import { vocabulary } from "../data/vocabulary";
import { ui } from "../locales/translations";
import type { Language } from "../locales/types";
import { playAudioOrSpeak } from "../utils/audio";
import {
  getProgress,
  progressPercent,
  recalculateBadges,
  recordSession,
  resetProgress,
  saveProgress,
  type LearningProgress,
} from "../utils/progress";
import { ProgressBadge } from "./ProgressBadge";
import { SafetyWarning } from "./SafetyWarning";

const todayIso = () => new Date().toISOString().slice(0, 10);

function pick<T>(items: T[], count: number, offset = 0): T[] {
  if (items.length === 0) return [];
  return Array.from({ length: Math.min(count, items.length) }, (_, index) => items[(index + offset) % items.length]);
}

function cardClass(extra = "") {
  return `rounded-3xl bg-white/90 p-5 text-ink shadow-soft ring-1 ring-moss/10 ${extra}`;
}

function saveAndEmit(progress: LearningProgress, onProgressChange: (progress: LearningProgress) => void) {
  const next = recalculateBadges(progress);
  saveProgress(next);
  onProgressChange(next);
}

export function Dashboard({
  language,
  progress,
  onNavigate,
}: {
  language: Language;
  progress: LearningProgress;
  onNavigate: (id: ModuleId) => void;
}) {
  const recentBadge = badges.find((badge) => badge.id === progress.unlockedBadges.at(-1));
  const percent = progressPercent(progress);
  const quickLinks: Array<{ id: ModuleId; label: string; icon: string }> = [
    { id: "daily", label: ui.dailyDrive[language], icon: "⚡" },
    { id: "swipe-cards", label: ui.swipeCards[language], icon: "🎴" },
    { id: "commands", label: "Flashcards", icon: "🃏" },
    { id: "quiz", label: "Quiz", icon: "✅" },
    { id: "practice-maxime", label: ui.practiceMaxime[language], icon: "🗣️" },
    { id: "audio-game", label: ui.audioGame[language], icon: "🎧" },
    { id: "progress", label: ui.progressPage[language], icon: "📈" },
  ];

  return (
    <section className="grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[2rem] bg-moss p-5 text-white shadow-soft">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-mint">{ui.todayGoal[language]}</p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-6xl">{ui.helloMinh[language]}</h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-white/82">{ui.fiveMinuteGoal[language]}</p>
        <button
          type="button"
          onClick={() => onNavigate("daily")}
          className="focus-ring mt-6 w-full rounded-3xl bg-lemon px-6 py-5 text-xl font-extrabold text-ink md:w-auto"
        >
          {ui.startFiveMinutes[language]}
        </button>
      </div>
      <div className="grid gap-3">
        <div className={cardClass()}>
          <div className="flex items-center justify-between">
            <p className="font-extrabold text-moss">{ui.globalProgress[language]}</p>
            <p className="font-display text-3xl font-bold">{percent}%</p>
          </div>
          <div className="mt-3 h-4 rounded-full bg-mint">
            <div className="h-4 rounded-full bg-clay" style={{ width: `${percent}%` }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Metric label={ui.currentStreak[language]} value={`${progress.currentStreak}`} suffix="🔥" />
          <Metric label={ui.averageScore[language]} value={`${progress.averageScore || 0}%`} />
        </div>
        <div className={cardClass("bg-cream")}>
          <p className="text-sm font-extrabold text-clay">{ui.recentBadge[language]}</p>
          <p className="mt-1 text-lg font-extrabold">{recentBadge ? `${recentBadge.icon} ${recentBadge.title[language]}` : "🌱 First lesson soon"}</p>
        </div>
      </div>
      <div className="md:col-span-2">
        <p className="mb-3 font-extrabold text-moss">{ui.quickAccess[language]}</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {quickLinks.map((link) => (
            <button key={link.id} type="button" onClick={() => onNavigate(link.id)} className="focus-ring rounded-3xl bg-white/90 p-4 text-left shadow-soft ring-1 ring-moss/10">
              <span className="text-3xl" aria-hidden="true">{link.icon}</span>
              <span className="mt-3 block font-extrabold">{link.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AudioActionGame({ language, onProgressChange }: { language: Language; onProgressChange: (progress: LearningProgress) => void }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const item = audioActions[index % audioActions.length];
  const correct = selected === item.target;
  const progressLabel = `${index + 1}/${audioActions.length}`;

  function playCurrent() {
    playAudioOrSpeak(item.audio?.fr, item.promptFrench, "fr");
  }

  function choose(action: string) {
    if (selected !== null) return;
    setSelected(action);
    if (action === item.target) setScore((value) => value + 1);
  }

  function next() {
    if (index >= audioActions.length - 1) {
      const finalScore = Math.round(score / audioActions.length * 100);
      const progress = getProgress();
      const nextProgress = recordSession(
        { ...progress, moduleProgress: { ...progress.moduleProgress, "French commands": Math.min(100, progress.moduleProgress["French commands"] + 10) } },
        { id: cryptoId(), date: todayIso(), type: "practice", score: finalScore, categories: ["French commands", item.category] },
      );
      saveProgress(nextProgress);
      onProgressChange(nextProgress);
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  if (finished) {
    const finalScore = Math.round(score / audioActions.length * 100);
    return (
      <section className={cardClass("text-center")}>
        <p className="text-5xl">🎧</p>
        <h1 className="mt-3 font-display text-4xl font-bold">{ui.audioGame[language]}</h1>
        <p className="mt-3 text-3xl font-extrabold">{ui.score[language]}: {finalScore}%</p>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-ink/70">{ui.encouragement[language]}</p>
        <button type="button" onClick={() => { setIndex(0); setScore(0); setSelected(null); setFinished(false); }} className="focus-ring mt-5 rounded-3xl bg-moss px-6 py-4 font-extrabold text-white">
          {ui.anotherQuickSession[language]}
        </button>
      </section>
    );
  }

  return (
    <section className="grid gap-5">
      <SafetyWarning language={language} compact />
      <div className={cardClass()}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-4xl font-bold">{ui.audioGame[language]}</h1>
            <p className="mt-2 max-w-2xl leading-7 text-ink/70">{ui.audioGameSubtitle[language]}</p>
          </div>
          <ProgressBadge value={progressLabel} />
        </div>
        <p className="mt-4 rounded-2xl bg-skysoft p-3 text-sm font-bold text-moss">{ui.syntheticVoiceNote[language]}</p>
        <div className="mt-5 rounded-[2rem] bg-moss p-6 text-center text-white">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-mint">Maxime says</p>
          <p className="mt-3 font-display text-5xl font-bold">{selected === null ? "•••" : item.promptFrench}</p>
          <button type="button" onClick={playCurrent} className="focus-ring mt-5 w-full rounded-3xl bg-lemon px-5 py-4 text-lg font-extrabold text-ink md:w-auto">
            {ui.playCommand[language]}
          </button>
        </div>
        <p className="mt-5 font-extrabold text-moss">{ui.tapAction[language]}</p>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {actionButtons.map((action) => {
            const isSelected = selected === action.id;
            const isCorrect = item.target === action.id;
            const state = selected === null ? "bg-cream" : isCorrect ? "bg-mint text-moss" : isSelected ? "bg-rosewash text-clay" : "bg-cream opacity-65";
            return (
              <button
                key={action.id}
                type="button"
                onClick={() => choose(action.id)}
                className={`focus-ring min-h-28 rounded-3xl p-4 text-center font-extrabold ${state}`}
                aria-label={action.label[language]}
              >
                <span className="block text-4xl" aria-hidden="true">{action.emoji}</span>
                <span className="mt-2 block">{action.label[language]}</span>
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-moss/10">
            <p className="font-extrabold">{correct ? ui.correct[language] : ui.reviewThis[language]}</p>
            <p className="mt-1 text-sm text-ink/70">{item.promptFrench} = {item.promptEnglish} = {item.promptVietnamese}</p>
          </div>
        )}
        <button type="button" onClick={next} disabled={selected === null} className="focus-ring mt-5 w-full rounded-3xl bg-clay px-5 py-4 font-extrabold text-white disabled:opacity-45">
          {ui.next[language]}
        </button>
      </div>
    </section>
  );
}

function Metric({ label, value, suffix = "" }: { label: string; value: string; suffix?: string }) {
  return (
    <div className={cardClass()}>
      <p className="text-xs font-extrabold uppercase tracking-wide text-ink/55">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold">{value} {suffix}</p>
    </div>
  );
}

type SwipeCard = {
  id: string;
  question: QuizQuestion["question"];
  answers: [QuizQuestion["answers"][number], QuizQuestion["answers"][number]];
  correctIndex: 0 | 1;
  explanation: QuizQuestion["explanation"];
  category: string;
};

function buildSwipeCards(): SwipeCard[] {
  return quizQuestions.slice(0, 24).map((question) => {
    const correctAnswer = question.answers[question.correctIndex];
    const wrongAnswer = question.answers.find((_, index) => index !== question.correctIndex) ?? question.answers[0];
    return {
      id: `swipe-${question.id}`,
      question: question.question,
      answers: [correctAnswer, wrongAnswer],
      correctIndex: 0,
      explanation: question.explanation,
      category: question.category,
    };
  });
}

export function SwipeCards({ language, onProgressChange }: { language: Language; onProgressChange: (progress: LearningProgress) => void }) {
  const cards = buildSwipeCards();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<0 | 1 | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const current = cards[index];
  const done = index >= cards.length;

  function finish(finalScore: number) {
    const progress = getProgress();
    saveAndEmit(
      recordSession(
        { ...progress, moduleProgress: { ...progress.moduleProgress, Priority: Math.min(100, progress.moduleProgress.Priority + 8) } },
        { id: cryptoId(), date: todayIso(), type: "quiz", score: finalScore, categories: ["Swipe Cards", "Priority"] },
      ),
      onProgressChange,
    );
  }

  function choose(answerIndex: 0 | 1) {
    if (selected !== null || done) return;
    setSelected(answerIndex);
    setShowExplanation(true);
    if (answerIndex === current.correctIndex) setScore((value) => value + 1);
  }

  function next() {
    if (done) return;
    if (index >= cards.length - 1) {
      const final = Math.round((score / cards.length) * 100);
      finish(final);
      setIndex((value) => value + 1);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setShowExplanation(false);
    setDrag({ x: 0, y: 0 });
  }

  function reset() {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setShowExplanation(false);
    setDrag({ x: 0, y: 0 });
  }

  function handleSwipe(deltaX: number, deltaY: number) {
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    if (absX < 70 && absY < 70) return;
    if (absX > absY) {
      choose(deltaX < 0 ? 0 : 1);
      return;
    }
    if (deltaY < 0 && selected !== null) next();
    if (deltaY > 0) setShowExplanation(true);
  }

  if (done) {
    const final = Math.round((score / cards.length) * 100);
    return (
      <section className={cardClass("text-center")}>
        <p className="text-5xl">🎴</p>
        <h1 className="mt-3 font-display text-4xl font-bold">{ui.swipeCards[language]}</h1>
        <p className="mt-3 text-3xl font-extrabold">{ui.score[language]}: {final}%</p>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-ink/70">{ui.encouragement[language]}</p>
        <button type="button" onClick={reset} className="focus-ring mt-5 rounded-3xl bg-moss px-6 py-4 font-extrabold text-white">
          {ui.anotherQuickSession[language]}
        </button>
      </section>
    );
  }

  const cardStyle = {
    transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x / 28}deg)`,
  };

  return (
    <section className="grid gap-5">
      <SafetyWarning language={language} compact />
      <div className={cardClass()}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-4xl font-bold">{ui.swipeCards[language]}</h1>
            <p className="mt-2 max-w-2xl leading-7 text-ink/70">{ui.swipeCardsSubtitle[language]}</p>
          </div>
          <ProgressBadge value={`${index + 1}/${cards.length}`} />
        </div>
        <p className="mt-4 rounded-2xl bg-skysoft p-3 text-sm font-bold text-moss">{ui.swipeUpDown[language]}</p>

        <div className="relative mt-5 min-h-[28rem] overflow-hidden rounded-[2rem] bg-moss/10 p-3">
          <div
            role="group"
            aria-label={current.question[language]}
            className="touch-none select-none rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-moss/10 transition-transform"
            style={cardStyle}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              setDragStart({ x: event.clientX, y: event.clientY });
            }}
            onPointerMove={(event) => {
              if (!dragStart || selected !== null) return;
              setDrag({ x: event.clientX - dragStart.x, y: event.clientY - dragStart.y });
            }}
            onPointerUp={(event) => {
              if (!dragStart) return;
              const deltaX = event.clientX - dragStart.x;
              const deltaY = event.clientY - dragStart.y;
              setDragStart(null);
              setDrag({ x: 0, y: 0 });
              handleSwipe(deltaX, deltaY);
            }}
          >
            <p className="rounded-full bg-cream px-3 py-2 text-center text-sm font-extrabold text-moss">{current.category}</p>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">{current.question[language]}</h2>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {current.answers.map((answer, answerIndex) => {
                const typedIndex = answerIndex as 0 | 1;
                const isSelected = selected === typedIndex;
                const isCorrect = current.correctIndex === typedIndex;
                const state = selected === null ? "bg-cream" : isCorrect ? "bg-mint text-moss" : isSelected ? "bg-rosewash text-clay" : "bg-cream opacity-70";
                return (
                  <button
                    key={answer.en}
                    type="button"
                    onClick={() => choose(typedIndex)}
                    className={`focus-ring min-h-36 rounded-3xl p-4 text-left font-extrabold ${state}`}
                  >
                    <span className="block text-xs uppercase tracking-[0.18em] text-ink/50">{typedIndex === 0 ? ui.swipeLeft[language] : ui.swipeRight[language]}</span>
                    <span className="mt-3 block text-xl">{answer[language]}</span>
                  </button>
                );
              })}
            </div>
            {showExplanation && (
              <div className="mt-5 rounded-2xl bg-skysoft p-4">
                <p className="font-extrabold">{selected === current.correctIndex ? ui.correct[language] : ui.reviewThis[language]}</p>
                <p className="mt-1 text-sm leading-6 text-ink/75">{current.explanation[language]}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button type="button" onClick={() => choose(0)} disabled={selected !== null} className="focus-ring rounded-3xl bg-cream px-5 py-4 font-extrabold text-moss disabled:opacity-60">
            {ui.swipeLeft[language]}
          </button>
          <button type="button" onClick={() => choose(1)} disabled={selected !== null} className="focus-ring rounded-3xl bg-cream px-5 py-4 font-extrabold text-moss disabled:opacity-60">
            {ui.swipeRight[language]}
          </button>
        </div>
        <button type="button" onClick={next} disabled={selected === null} className="focus-ring mt-3 w-full rounded-3xl bg-clay px-5 py-4 font-extrabold text-white disabled:opacity-45">
          {ui.next[language]}
        </button>
      </div>
    </section>
  );
}

export function DailyDrive({ language, onProgressChange }: { language: Language; onProgressChange: (progress: LearningProgress) => void }) {
  const progress = getProgress();
  const offset = progress.dailySessionsCompleted;
  const words = pick(vocabulary, 5, offset * 5);
  const dailyCommands = pick(commands, 3, offset * 3);
  const questions = pick(quizQuestions, 3, offset * 3);
  const scenario = miniScenarios[offset % miniScenarios.length];
  const steps = ["words", "cards", "quiz", "scenario", "result"] as const;
  const [stepIndex, setStepIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<Record<string, number>>({});
  const step = steps[stepIndex];

  function answerQuestion(question: QuizQuestion | MiniScenario, answerIndex: number) {
    if (answered[question.id] !== undefined) return;
    setAnswered((value) => ({ ...value, [question.id]: answerIndex }));
    if (answerIndex === question.correctIndex) setScore((value) => value + 1);
  }

  function finish() {
    const finalScore = Math.round((score / 4) * 100);
    const next = recordSession(
      {
        ...progress,
        dailySessionsCompleted: progress.dailySessionsCompleted + 1,
        moduleProgress: {
          ...progress.moduleProgress,
          Vocabulary: Math.min(100, progress.moduleProgress.Vocabulary + 4),
          "French commands": Math.min(100, progress.moduleProgress["French commands"] + 5),
          [scenario.category]: Math.min(100, (progress.moduleProgress[scenario.category] ?? 0) + 8),
        },
      },
      { id: cryptoId(), date: todayIso(), type: "daily", score: finalScore, categories: [scenario.category, "Vocabulary", "French commands"] },
    );
    saveProgress(next);
    onProgressChange(next);
  }

  if (step === "result") {
    return (
      <section className={cardClass("text-center")}>
        <p className="text-5xl">🎉</p>
        <h1 className="mt-3 font-display text-4xl font-bold">{ui.dailyComplete[language]}</h1>
        <p className="mt-3 text-2xl font-extrabold">{ui.score[language]}: {Math.round((score / 4) * 100)}%</p>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-ink/70">{ui.encouragement[language]}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <button type="button" onClick={finish} className="focus-ring rounded-3xl bg-moss px-5 py-4 font-extrabold text-white">{ui.continueTomorrow[language]}</button>
          <button type="button" onClick={() => { finish(); setStepIndex(0); setScore(0); setAnswered({}); }} className="focus-ring rounded-3xl bg-lemon px-5 py-4 font-extrabold text-ink">{ui.anotherQuickSession[language]}</button>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-5">
      <SafetyWarning language={language} compact />
      <div className={cardClass()}>
        <div className="mb-4 flex items-center justify-between">
          <ProgressBadge value={`${stepIndex + 1}/5`} />
          <p className="font-extrabold text-moss">{ui.dailyDrive[language]}</p>
        </div>
        {step === "words" && <WordStep words={words} language={language} />}
        {step === "cards" && <CommandStep commands={dailyCommands} language={language} />}
        {step === "quiz" && <QuestionStep questions={questions} language={language} answered={answered} onAnswer={answerQuestion} />}
        {step === "scenario" && <ScenarioCard scenario={scenario} language={language} answered={answered[scenario.id]} onAnswer={(answer) => answerQuestion(scenario, answer)} />}
        <button type="button" onClick={() => setStepIndex((value) => Math.min(value + 1, steps.length - 1))} className="focus-ring mt-5 w-full rounded-3xl bg-moss px-5 py-4 font-extrabold text-white">
          {ui.next[language]}
        </button>
      </div>
    </section>
  );
}

function WordStep({ words, language }: { words: VocabularyItem[]; language: Language }) {
  return (
    <div>
      <h2 className="font-display text-3xl font-bold">{ui.vocabularyLabel[language]}</h2>
      <div className="mt-4 grid gap-3">
        {words.map((word) => (
          <div key={word.french} className="rounded-2xl bg-cream p-4">
            <p className="text-xl font-extrabold">{word.french}</p>
            <p className="text-sm text-ink/70">{word.pronunciation} · {word.english} · {word.vietnamese}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommandStep({ commands: items, language }: { commands: CommandItem[]; language: Language }) {
  return (
    <div>
      <h2 className="font-display text-3xl font-bold">Flashcards</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item.french} className="rounded-2xl bg-moss p-4 text-white">
            <p className="text-2xl font-extrabold">{item.french}</p>
            <p className="mt-1 text-white/80">{item.english} · {item.vietnamese}</p>
            <button type="button" onClick={() => playAudioOrSpeak(getMaximeFrenchAudio(item.french), item.french, "fr")} className="focus-ring mt-3 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-moss">
              {ui.listenFrench[language]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionStep({
  questions,
  language,
  answered,
  onAnswer,
}: {
  questions: QuizQuestion[];
  language: Language;
  answered: Record<string, number>;
  onAnswer: (question: QuizQuestion, answer: number) => void;
}) {
  return (
    <div className="grid gap-4">
      <h2 className="font-display text-3xl font-bold">Quiz</h2>
      {questions.map((question) => (
        <MiniQuestion key={question.id} question={question} language={language} selected={answered[question.id]} onAnswer={(answer) => onAnswer(question, answer)} />
      ))}
    </div>
  );
}

function MiniQuestion({ question, language, selected, onAnswer }: { question: QuizQuestion; language: Language; selected?: number; onAnswer: (answer: number) => void }) {
  return (
    <div className="rounded-2xl bg-cream p-4">
      <p className="font-extrabold">{question.question[language]}</p>
      <div className="mt-3 grid gap-2">
        {question.answers.map((answer, index) => (
          <button
            key={answer.en}
            type="button"
            onClick={() => onAnswer(index)}
            className={`focus-ring rounded-2xl px-4 py-3 text-left font-bold ${selected === undefined ? "bg-white" : index === question.correctIndex ? "bg-mint text-moss" : selected === index ? "bg-rosewash text-clay" : "bg-white opacity-70"}`}
          >
            {answer[language]}
          </button>
        ))}
      </div>
      {selected !== undefined && <p className="mt-2 text-sm font-bold text-moss">{question.explanation[language]}</p>}
    </div>
  );
}

export function PracticeWithMaxime({ language, onProgressChange }: { language: Language; onProgressChange: (progress: LearningProgress) => void }) {
  const session = pick(commands, 10);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const current = session[index];
  const done = index >= session.length;

  function optionsFor(command: CommandItem) {
    const wrong = commands.filter((item) => item.french !== command.french).slice(index + 1, index + 3);
    return [command, ...wrong].map((item) => ({ label: language === "vi" ? item.vietnamese : item.english, correct: item.french === command.french }));
  }

  if (done) {
    const final = Math.round((score / session.length) * 100);
    return (
      <ResultCard
        language={language}
        title={ui.practiceMaxime[language]}
        score={final}
        onSave={() => {
          const progress = getProgress();
          saveAndEmit(recordSession({ ...progress, moduleProgress: { ...progress.moduleProgress, "French commands": Math.min(100, progress.moduleProgress["French commands"] + 12) } }, { id: cryptoId(), date: todayIso(), type: "practice", score: final, categories: ["French commands"] }), onProgressChange);
        }}
      />
    );
  }

  const options = optionsFor(current);
  return (
    <section className={cardClass()}>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">{ui.practiceMaxime[language]}</h1>
        <ProgressBadge value={`${index + 1}/10`} />
      </div>
      <div className="mt-5 rounded-3xl bg-moss p-6 text-center text-white">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-mint">Maxime says</p>
        <p className="mt-3 font-display text-5xl font-bold">{current.french}</p>
        <button type="button" onClick={() => playAudioOrSpeak(getMaximeFrenchAudio(current.french), current.french, "fr")} className="focus-ring mt-5 rounded-full bg-white px-5 py-3 font-extrabold text-moss">
          {ui.listenFrench[language]}
        </button>
      </div>
      <div className="mt-4 grid gap-3">
        {options.map((option, optionIndex) => (
          <button
            type="button"
            key={option.label}
            onClick={() => {
              if (selected !== null) return;
              setSelected(optionIndex);
              if (option.correct) setScore((value) => value + 1);
            }}
            className={`focus-ring rounded-3xl px-5 py-4 text-left font-extrabold ${selected === null ? "bg-cream" : option.correct ? "bg-mint text-moss" : selected === optionIndex ? "bg-rosewash text-clay" : "bg-cream opacity-70"}`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <button type="button" onClick={() => { setSelected(null); setIndex((value) => value + 1); }} className="focus-ring mt-5 w-full rounded-3xl bg-clay px-5 py-4 font-extrabold text-white">
        {ui.next[language]}
      </button>
    </section>
  );
}

function ResultCard({ language, title, score, onSave }: { language: Language; title: string; score: number; onSave: () => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <section className={cardClass("text-center")}>
      <p className="text-5xl">🏁</p>
      <h1 className="mt-3 font-display text-4xl font-bold">{title}</h1>
      <p className="mt-3 text-3xl font-extrabold">{ui.score[language]}: {score}%</p>
      <button type="button" onClick={() => { onSave(); setSaved(true); }} className="focus-ring mt-5 rounded-3xl bg-moss px-6 py-4 font-extrabold text-white">
        {saved ? ui.correct[language] : ui.saveDebrief[language]}
      </button>
    </section>
  );
}

export function ScenarioCard({ scenario, language, answered, onAnswer }: { scenario: MiniScenario; language: Language; answered?: number; onAnswer: (answer: number) => void }) {
  return (
    <div className="rounded-3xl bg-cream p-4">
      <ScenarioVisual type={scenario.visual} />
      <p className="mt-4 text-sm font-extrabold uppercase tracking-wide text-clay">{scenario.category}</p>
      <h2 className="mt-1 font-display text-3xl font-bold">{scenario.title[language]}</h2>
      <p className="mt-2 leading-7">{scenario.question[language]}</p>
      <div className="mt-4 grid gap-2">
        {scenario.answers.map((answer, index) => (
          <button
            key={answer.en}
            type="button"
            onClick={() => onAnswer(index)}
            className={`focus-ring rounded-2xl px-4 py-3 text-left font-bold ${answered === undefined ? "bg-white" : index === scenario.correctIndex ? "bg-mint text-moss" : answered === index ? "bg-rosewash text-clay" : "bg-white opacity-70"}`}
          >
            {answer[language]}
          </button>
        ))}
      </div>
      {answered !== undefined && <p className="mt-3 rounded-2xl bg-white p-3 text-sm font-bold text-moss">{scenario.explanation[language]}</p>}
    </div>
  );
}

function ScenarioVisual({ type }: { type: MiniScenario["visual"] }) {
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label={type} className="h-36 w-full rounded-2xl bg-skysoft">
      <rect x="0" y="62" width="320" height="28" fill="#58685f" opacity="0.55" />
      <rect x="145" y="0" width="28" height="150" fill="#58685f" opacity="0.55" />
      {type === "roundabout" && <circle cx="160" cy="75" r="40" fill="none" stroke="#496b52" strokeWidth="16" />}
      {type === "pedestrian" && <g stroke="#fff" strokeWidth="5">{[110, 130, 150, 170, 190].map((x) => <line key={x} x1={x} y1="57" x2={x + 20} y2="93" />)}</g>}
      {type === "stop" && <polygon points="152,25 180,25 200,45 200,73 180,93 152,93 132,73 132,45" fill="#cf7d57" />}
      {type === "yield" && <polygon points="160,105 110,35 210,35" fill="#fff" stroke="#cf7d57" strokeWidth="8" />}
      {type === "bike" && <circle cx="250" cy="55" r="12" fill="none" stroke="#20251f" strokeWidth="4" />}
      {type === "bus" && <rect x="210" y="42" width="70" height="42" rx="8" fill="#f7df8b" />}
      {type === "zone30" && <circle cx="245" cy="42" r="23" fill="#fff" stroke="#cf7d57" strokeWidth="6" />}
      {type === "zone30" && <text x="232" y="50" fontSize="20" fontWeight="800" fill="#20251f">30</text>}
      {type === "rain" && [50, 95, 210, 260].map((x) => <line key={x} x1={x} y1="18" x2={x - 15} y2="45" stroke="#496b52" strokeWidth="4" />)}
      {type === "parking" && <text x="230" y="55" fontSize="34" fontWeight="800" fill="#496b52">P</text>}
      <rect x="65" y="73" width="44" height="24" rx="6" fill="#cf7d57" />
      <rect x="202" y="73" width="44" height="24" rx="6" fill="#496b52" />
      <path d="M96 68 C125 42 185 42 217 68" fill="none" stroke="#cf7d57" strokeWidth="5" strokeDasharray="8 8" />
    </svg>
  );
}

export function BeforePractice({ language, onNavigate }: { language: Language; onNavigate: (id: ModuleId) => void }) {
  const items = [
    "siège réglé", "rétroviseurs réglés", "ceinture attachée", "pied sur le frein", "position du sélecteur vérifiée",
    "environnement regardé", "clignotant si nécessaire", "respiration calme", ui.legalShort[language],
  ];
  const [checked, setChecked] = useState<string[]>([]);
  const complete = checked.length === items.length;
  return (
    <section className={cardClass()}>
      <SafetyWarning language={language} compact />
      <h1 className="mt-5 font-display text-4xl font-bold">{ui.beforePractice[language]}</h1>
      <button type="button" onClick={() => setChecked([])} className="focus-ring mt-4 rounded-3xl bg-moss px-5 py-4 font-extrabold text-white">{ui.startChecklist[language]}</button>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <label key={item} className="flex min-h-14 items-center gap-3 rounded-2xl bg-cream p-4 font-bold">
            <input type="checkbox" checked={checked.includes(item)} onChange={() => setChecked((value) => value.includes(item) ? value.filter((x) => x !== item) : [...value, item])} className="h-6 w-6" />
            {item}
          </label>
        ))}
      </div>
      {complete && <p className="mt-4 rounded-2xl bg-mint p-4 font-extrabold text-moss">{ui.checklistDone[language]}</p>}
      <button type="button" onClick={() => onNavigate("commands")} className="focus-ring mt-4 w-full rounded-3xl bg-clay px-5 py-4 font-extrabold text-white">{ui.todayCommands[language]}</button>
    </section>
  );
}

export function AfterPractice({ language, onProgressChange }: { language: Language; onProgressChange: (progress: LearningProgress) => void }) {
  const topics = ["ronds-points", "stationnement", "consignes françaises", "piétons", "vélos", "vitesse", "direction", "stress"];
  const [mood, setMood] = useState(ui.okay[language]);
  const [selected, setSelected] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const recommendation = selected.includes("ronds-points")
    ? "Roundabouts + 5 questions"
    : selected.includes("consignes françaises")
      ? "Practice with Maxime"
      : selected.includes("piétons")
        ? "Pedestrians scenarios"
        : "Daily Drive tomorrow";

  function save() {
    const progress = getProgress();
    saveAndEmit(recordSession(progress, { id: cryptoId(), date: todayIso(), type: "after-practice", score: mood === ui.stressful[language] ? 60 : 85, categories: selected.length ? selected : ["Practice"] }), onProgressChange);
    setSaved(true);
  }

  return (
    <section className={cardClass()}>
      <h1 className="font-display text-4xl font-bold">{ui.afterPractice[language]}</h1>
      <p className="mt-2 text-ink/70">{ui.recommendation[language]}: {recommendation}</p>
      <div className="mt-5">
        <p className="font-extrabold">{ui.mood[language]}</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[ui.easy[language], ui.okay[language], ui.stressful[language]].map((item) => (
            <button key={item} type="button" onClick={() => setMood(item)} className={`focus-ring rounded-2xl px-4 py-3 font-extrabold ${mood === item ? "bg-moss text-white" : "bg-cream"}`}>{item}</button>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <p className="font-extrabold">{ui.difficultTopics[language]}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <button key={topic} type="button" onClick={() => setSelected((value) => value.includes(topic) ? value.filter((x) => x !== topic) : [...value, topic])} className={`focus-ring rounded-full px-4 py-2 font-bold ${selected.includes(topic) ? "bg-clay text-white" : "bg-cream"}`}>{topic}</button>
          ))}
        </div>
      </div>
      <label className="mt-5 block">
        <span className="font-extrabold">{ui.optionalNote[language]}</span>
        <textarea value={note} onChange={(event) => setNote(event.target.value)} className="focus-ring mt-2 min-h-28 w-full rounded-2xl border border-moss/20 bg-cream p-4" />
      </label>
      <button type="button" onClick={save} className="focus-ring mt-4 w-full rounded-3xl bg-moss px-5 py-4 font-extrabold text-white">{saved ? ui.correct[language] : ui.saveDebrief[language]}</button>
    </section>
  );
}

export function ProgressPage({ language, progress, onProgressChange }: { language: Language; progress: LearningProgress; onProgressChange: (progress: LearningProgress) => void }) {
  const percent = progressPercent(progress);
  const unlocked = new Set(progress.unlockedBadges);
  return (
    <section className="grid gap-5">
      <div className={cardClass("bg-moss text-white")}>
        <h1 className="font-display text-4xl font-bold">{ui.progressPage[language]}</h1>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Metric label={ui.currentStreak[language]} value={`${progress.currentStreak}`} suffix="🔥" />
          <Metric label={ui.bestStreak[language]} value={`${progress.bestStreak}`} />
          <Metric label={ui.sessionsDone[language]} value={`${progress.dailySessionsCompleted}`} />
          <Metric label={ui.averageScore[language]} value={`${progress.averageScore || 0}%`} />
        </div>
        <div className="mt-5 h-4 rounded-full bg-white/20"><div className="h-4 rounded-full bg-lemon" style={{ width: `${percent}%` }} /></div>
      </div>
      <div className={cardClass()}>
        <h2 className="font-display text-3xl font-bold">{ui.badges[language]}</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          {badges.map((badge) => (
            <div key={badge.id} className={`rounded-3xl p-4 ${unlocked.has(badge.id) ? "bg-mint" : "bg-cream opacity-70"}`}>
              <p className="text-3xl">{badge.icon}</p>
              <p className="mt-2 font-extrabold">{badge.title[language]}</p>
              <p className="mt-1 text-xs text-ink/65">{badge.description[language]}</p>
              <p className="mt-2 text-xs font-extrabold text-clay">{unlocked.has(badge.id) ? ui.unlocked[language] : ui.locked[language]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <CategoryBox title={ui.strongCategories[language]} items={progress.strongCategories} />
        <CategoryBox title={ui.weakCategories[language]} items={progress.weakCategories} />
      </div>
      <div className={cardClass()}>
        <h2 className="font-display text-3xl font-bold">{ui.globalProgress[language]}</h2>
        <div className="mt-4 grid gap-3">
          {Object.entries(progress.moduleProgress).map(([module, value]) => (
            <div key={module}>
              <div className="flex justify-between text-sm font-extrabold"><span>{module}</span><span>{value}%</span></div>
              <div className="mt-1 h-3 rounded-full bg-cream"><div className="h-3 rounded-full bg-clay" style={{ width: `${value}%` }} /></div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm(ui.resetConfirm[language])) onProgressChange(resetProgress());
          }}
          className="focus-ring mt-5 rounded-2xl bg-rosewash px-4 py-3 font-extrabold text-clay"
        >
          {ui.resetProgress[language]}
        </button>
      </div>
    </section>
  );
}

function CategoryBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className={cardClass()}>
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {(items.length ? items : ["Daily Drive"]).map((item) => <span key={item} className="rounded-full bg-cream px-3 py-2 text-sm font-bold">{item}</span>)}
      </div>
    </div>
  );
}

export function InstallIphoneCard({ language }: { language: Language }) {
  return (
    <section className={`no-print ${cardClass("bg-skysoft")}`}>
      <h2 className="font-display text-3xl font-bold">{ui.installIphone[language]}</h2>
      <p className="mt-2 leading-7 text-ink/75">{ui.installSteps[language]}</p>
    </section>
  );
}

function cryptoId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
