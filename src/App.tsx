import { useEffect, useState } from "react";
import { automaticBasics, automaticChecklist } from "./data/automatic";
import { commands } from "./data/commands";
import { drivingTopics } from "./data/drivingTopics";
import { husbandGuidelines, husbandPhrases, husbandScale } from "./data/husband";
import { modules } from "./data/modules";
import { printableSheets } from "./data/printables";
import { sourceLinks } from "./data/sources";
import { trainingPlan } from "./data/trainingPlan";
import type { ModuleId } from "./data/types";
import { vietnamVsFrance } from "./data/vietnamVsFrance";
import { Flashcard } from "./components/Flashcard";
import { Layout } from "./components/Layout";
import { ModuleCard } from "./components/ModuleCard";
import { PrintableSheet } from "./components/PrintableSheet";
import { ProgressBadge } from "./components/ProgressBadge";
import { Quiz } from "./components/Quiz";
import { SafetyWarning } from "./components/SafetyWarning";
import { VocabularyTable } from "./components/VocabularyTable";
import { ui } from "./locales/translations";
import type { Language, LocalizedString } from "./locales/types";
import { getInitialLanguage, setLanguage as saveLanguage } from "./utils/language";

const pageTitles: Record<ModuleId, LocalizedString> = {
  home: { vi: "Học lái xe ở Pháp, từng bước an toàn", en: "Learn French driving basics safely", fr: "Apprendre les bases de la conduite en France" },
  legal: { vi: "Pháp lý & an toàn", en: "Legal & Safety", fr: "Légalité & sécurité" },
  driving: { vi: "Các quy tắc lái xe ở Pháp", en: "Driving in France", fr: "Conduite en France" },
  "vietnam-france": { vi: "Khác biệt Việt Nam / Pháp", en: "Vietnam vs France", fr: "Vietnam vs France" },
  commands: { vi: "Câu lệnh thiết yếu", en: "Essential Commands", fr: "Consignes essentielles" },
  vocabulary: { vi: "Từ vựng lái xe", en: "Driving Vocabulary", fr: "Vocabulaire de conduite" },
  automatic: { vi: "Cơ bản xe số tự động", en: "Automatic Car Basics", fr: "Bases de la boîte automatique" },
  training: { vi: "Kế hoạch luyện tập 8 tuần", en: "8-week training plan", fr: "Plan d'entraînement sur 8 semaines" },
  husband: { vi: "Dành cho chồng người Pháp", en: "For the French Husband", fr: "Pour le mari français" },
  quiz: { vi: "Quiz luyện phản xạ", en: "Practice Quiz", fr: "Quiz d'entraînement" },
  printables: { vi: "Fiches có thể in", en: "Printable Sheets", fr: "Fiches imprimables" },
  sources: { vi: "Nguồn chính thức", en: "Official Sources", fr: "Sources officielles" },
};

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-4xl font-bold leading-tight text-ink md:text-6xl">{title}</h1>
      {subtitle && <p className="mt-3 max-w-3xl text-lg leading-8 text-ink/70">{subtitle}</p>}
    </div>
  );
}

function App() {
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage());
  const [active, setActive] = useState<ModuleId>("home");

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    saveLanguage(lang);
  }

  function navigate(id: ModuleId) {
    setActive(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Layout language={language} active={active} onLanguageChange={setLanguage} onNavigate={navigate}>
      {active === "home" && <Home language={language} onNavigate={navigate} />}
      {active === "legal" && <Legal language={language} />}
      {active === "driving" && <Driving language={language} />}
      {active === "vietnam-france" && <VietnamFrance language={language} />}
      {active === "commands" && <Commands language={language} />}
      {active === "vocabulary" && <Vocabulary language={language} />}
      {active === "automatic" && <Automatic language={language} />}
      {active === "training" && <Training language={language} />}
      {active === "husband" && <Husband language={language} />}
      {active === "quiz" && <QuizPage language={language} />}
      {active === "printables" && <Printables language={language} />}
      {active === "sources" && <Sources language={language} />}
    </Layout>
  );
}

function Home({ language, onNavigate }: { language: Language; onNavigate: (id: ModuleId) => void }) {
  return (
    <div>
      <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <SectionTitle
            title={pageTitles.home[language]}
            subtitle={{
              vi: "Dành cho một học viên Việt Nam đang học xe số tự động và muốn hiểu cách lái xe hợp pháp, an toàn ở Pháp.",
              en: "For a Vietnamese learner practicing automatic driving and preparing to understand legal, safe driving in France.",
              fr: "Pour une apprenante vietnamienne en boîte automatique qui veut comprendre la conduite légale et sûre en France.",
            }[language]}
          />
          <SafetyWarning language={language} />
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => onNavigate("legal")} className="focus-ring rounded-full bg-moss px-5 py-3 font-extrabold text-white">
              {ui.startLearning[language]}
            </button>
            <button type="button" onClick={() => onNavigate("commands")} className="focus-ring rounded-full bg-white px-5 py-3 font-extrabold text-moss shadow-sm">
              Essential commands
            </button>
          </div>
        </div>
        <div className="rounded-[2rem] bg-white/80 p-5 shadow-soft ring-1 ring-moss/10">
          <div className="rounded-[1.5rem] bg-mint p-6">
            <p className="font-display text-3xl font-bold text-moss">
              {language === "vi" ? "Mục tiêu: hiểu trước khi lái." : language === "en" ? "Goal: understand before driving." : "Objectif : comprendre avant de conduire."}
            </p>
            <p className="mt-4 leading-7 text-moss/80">
              {language === "vi"
                ? "Trang này giúp học luật cơ bản, từ vựng, phản xạ an toàn và chuẩn bị buổi tập với auto-école hoặc xe double commande khi đúng pháp luật."
                : language === "en"
                  ? "This site helps learn basic rules, vocabulary, safety reflexes and prepare sessions with a driving school or dual-control car when legally allowed."
                  : "Ce site aide à apprendre les règles, le vocabulaire, les réflexes et à préparer des séances en auto-école ou double commande quand c'est légal."}
            </p>
          </div>
        </div>
      </section>
      <section className="mt-10 card-grid">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} language={language} onOpen={() => onNavigate(module.id)} />
        ))}
      </section>
    </div>
  );
}

function Legal({ language }: { language: Language }) {
  const items = [
    {
      vi: "Không lái xe ở Pháp trên đường mở nếu không có bằng lái hợp lệ hoặc khung học lái hợp pháp.",
      en: "Do not drive on public roads in France without a valid licence or legal learning framework.",
      fr: "Ne pas conduire en France sur route ouverte sans permis valide ou cadre légal d'apprentissage.",
    },
    {
      vi: "Rủi ro có thể gồm phạt, trách nhiệm hình sự/civil và vấn đề bảo hiểm nghiêm trọng.",
      en: "Risks can include fines, civil/criminal liability and serious insurance issues.",
      fr: "Les risques incluent amendes, responsabilité civile/pénale et problèmes graves d'assurance.",
    },
    {
      vi: "Khung hợp pháp có thể là auto-école, candidat libre, véhicule double commande, accompagnateur autorisé, assurance adaptée và livret d'apprentissage nếu yêu cầu.",
      en: "Legal options may include driving school, independent candidate, dual-control vehicle, authorized accompanying driver, suitable insurance and learning booklet if required.",
      fr: "Les cadres possibles : auto-école, candidat libre, véhicule double commande, accompagnateur autorisé, assurance adaptée et livret d'apprentissage si requis.",
    },
    {
      vi: "Trang này là hỗ trợ học tập đơn giản, không phải tư vấn pháp lý chính thức.",
      en: "This website is a simplified learning support, not official legal advice.",
      fr: "Ce site est un support pédagogique simplifié, pas un conseil juridique officiel.",
    },
  ];
  return (
    <div>
      <SectionTitle title={pageTitles.legal[language]} subtitle={ui.verifyRules[language]} />
      <SafetyWarning language={language} />
      <div className="mt-6 grid gap-4">
        {items.map((item, index) => (
          <div key={item.en} className="rounded-3xl bg-white/90 p-5 shadow-soft ring-1 ring-moss/10">
            <p className="font-extrabold text-clay">0{index + 1}</p>
            <p className="mt-2 text-lg leading-8">{item[language]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Driving({ language }: { language: Language }) {
  return (
    <div>
      <SectionTitle title={pageTitles.driving[language]} subtitle={ui.verifyRules[language]} />
      <div className="grid gap-4 md:grid-cols-2">
        {drivingTopics.map((topic) => (
          <article key={topic.id} className="rounded-3xl bg-white/90 p-5 shadow-soft ring-1 ring-moss/10">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-2xl font-bold">{topic.title[language]}</h2>
              <ProgressBadge value={topic.importance} />
            </div>
            <p className="mt-3 leading-7 text-ink/75">{topic.explanation[language]}</p>
            <dl className="mt-4 grid gap-3 text-sm">
              <div className="rounded-2xl bg-rosewash p-3"><dt className="font-extrabold text-clay">{ui.frequentMistake[language]}</dt><dd>{topic.mistake[language]}</dd></div>
              <div className="rounded-2xl bg-skysoft p-3"><dt className="font-extrabold text-moss">{ui.example[language]}</dt><dd>{topic.example[language]}</dd></div>
              <div className="rounded-2xl bg-mint p-3"><dt className="font-extrabold text-moss">{ui.remember[language]}</dt><dd>{topic.remember[language]}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function VietnamFrance({ language }: { language: Language }) {
  return (
    <div>
      <SectionTitle title={pageTitles["vietnam-france"][language]} subtitle={{
        vi: "Mục tiêu không phải quên kinh nghiệm ở Việt Nam, mà là biết thói quen nào cần chỉnh khi ở Pháp.",
        en: "The goal is not to forget Vietnamese experience, but to know which habits must change in France.",
        fr: "Le but n'est pas d'oublier l'expérience vietnamienne, mais d'adapter les habitudes en France.",
      }[language]} />
      <div className="grid gap-4">
        {vietnamVsFrance.map((item) => (
          <article key={item.id} className="grid gap-3 rounded-3xl bg-white/90 p-5 shadow-soft ring-1 ring-moss/10 md:grid-cols-4">
            <InfoBlock title="Vietnam" text={item.vietnamHabit[language]} tone="cream" />
            <InfoBlock title="France" text={item.franceChange[language]} tone="mint" />
            <InfoBlock title="Risk" text={item.risk[language]} tone="rose" />
            <InfoBlock title="Reflex" text={item.reflex[language]} tone="sky" />
          </article>
        ))}
      </div>
    </div>
  );
}

function InfoBlock({ title, text, tone }: { title: string; text: string; tone: "cream" | "mint" | "rose" | "sky" }) {
  const toneClass = { cream: "bg-cream", mint: "bg-mint", rose: "bg-rosewash", sky: "bg-skysoft" }[tone];
  return <div className={`rounded-2xl ${toneClass} p-4`}><p className="font-extrabold text-moss">{title}</p><p className="mt-2 text-sm leading-6">{text}</p></div>;
}

function Commands({ language }: { language: Language }) {
  return (
    <div>
      <SectionTitle title={pageTitles.commands[language]} subtitle={{
        vi: "Các câu phải ngắn, dễ nhớ và luôn dùng giống nhau trong buổi tập.",
        en: "Instructions must be short, memorable and consistent during practice.",
        fr: "Les consignes doivent être courtes, mémorisables et constantes.",
      }[language]} />
      <Flashcard language={language} />
      <div className="mt-6 overflow-x-auto rounded-3xl bg-white/90 p-4 shadow-soft ring-1 ring-moss/10">
        <table className="w-full min-w-[850px] border-separate border-spacing-y-2 text-left text-sm">
          <thead><tr className="text-ink/60"><th>French</th><th>Simple pronunciation</th><th>English</th><th>Vietnamese</th><th>Gesture / Situation</th></tr></thead>
          <tbody>
            {commands.map((command) => (
              <tr key={command.french} className="bg-cream">
                <td className="rounded-l-2xl px-3 py-3 font-extrabold">{command.french}</td>
                <td className="px-3 py-3">{command.pronunciation}</td>
                <td className="px-3 py-3">{command.english}</td>
                <td className="px-3 py-3">{command.vietnamese}</td>
                <td className="rounded-r-2xl px-3 py-3">{command.situation[language]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Vocabulary({ language }: { language: Language }) {
  return (
    <div>
      <SectionTitle title={pageTitles.vocabulary[language]} subtitle="French | Pronunciation | English | Vietnamese | Category | Example" />
      <VocabularyTable language={language} />
    </div>
  );
}

function Automatic({ language }: { language: Language }) {
  return (
    <div>
      <SectionTitle title={pageTitles.automatic[language]} subtitle={{
        vi: "Xe số tự động dễ bắt đầu, nhưng lỗi nhầm phanh/ga hoặc nhầm D/R có thể rất nguy hiểm.",
        en: "Automatic cars are easier to start, but confusing pedals or D/R can be very dangerous.",
        fr: "La boîte automatique facilite le départ, mais confondre les pédales ou D/R peut être très dangereux.",
      }[language]} />
      <div className="grid gap-4 md:grid-cols-2">
        {automaticBasics.map((item) => (
          <article key={item.title} className={`rounded-3xl p-5 shadow-soft ring-1 ${item.danger ? "bg-rosewash ring-clay/20" : "bg-white/90 ring-moss/10"}`}>
            <h2 className="font-display text-2xl font-bold">{item.title}</h2>
            <p className="mt-2 leading-7 text-ink/75">{item.text[language]}</p>
          </article>
        ))}
      </div>
      <section className="mt-6 rounded-3xl bg-moss p-5 text-white shadow-soft">
        <h2 className="font-display text-3xl font-bold">Checklist</h2>
        <ol className="mt-4 grid gap-2">
          {automaticChecklist.map((item, index) => <li key={item.en} className="rounded-2xl bg-white/10 p-3">{index + 1}. {item[language]}</li>)}
        </ol>
      </section>
    </div>
  );
}

function Training({ language }: { language: Language }) {
  return (
    <div>
      <SectionTitle title={pageTitles.training[language]} subtitle={ui.legalShort[language]} />
      <div className="grid gap-4">
        {trainingPlan.map((session) => (
          <article key={session.session} className="rounded-3xl bg-white/90 p-5 shadow-soft ring-1 ring-moss/10">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-extrabold text-clay">Week {session.week} · Session {session.session} · {session.duration}</p>
                <h2 className="font-display text-2xl font-bold">{session.objective[language]}</h2>
                <p className="mt-1 text-sm font-bold text-moss">{session.level[language]}</p>
              </div>
              <span className="rounded-full bg-skysoft px-3 py-1 text-sm font-extrabold">{session.stress} stress</span>
            </div>
            <p className="mt-3 rounded-2xl bg-rosewash p-3 text-sm font-bold text-clay">{session.legalPlace[language]}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <ListBox title="Exercises" items={session.exercises.map((item) => item[language])} />
              <ListBox title="Vocabulary" items={session.vocabulary} />
              <ListBox title="Watch" items={session.watch.map((item) => item[language])} />
              <ListBox title="Success" items={session.success.map((item) => item[language])} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ListBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-cream p-4">
      <p className="font-extrabold text-moss">{title}</p>
      <ul className="mt-2 grid gap-1 text-sm leading-6">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  );
}

function Husband({ language }: { language: Language }) {
  return (
    <div>
      <SectionTitle title={pageTitles.husband[language]} subtitle={{
        vi: "Vai trò của người đi kèm là giảm stress, nói rõ và không bao giờ luyện ngoài khung pháp lý.",
        en: "The accompanying driver's role is to reduce stress, speak clearly and never practice outside the legal framework.",
        fr: "Le rôle de l'accompagnateur est de réduire le stress, parler clairement et ne jamais sortir du cadre légal.",
      }[language]} />
      <div className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
        <section className="rounded-3xl bg-white/90 p-5 shadow-soft ring-1 ring-moss/10">
          <h2 className="font-display text-2xl font-bold">Coaching rules</h2>
          <ul className="mt-4 grid gap-2">
            {husbandGuidelines.map((item) => <li key={item.en} className="rounded-2xl bg-cream p-3">{item[language]}</li>)}
          </ul>
        </section>
        <section className="rounded-3xl bg-moss p-5 text-white shadow-soft">
          <h2 className="font-display text-2xl font-bold">Feedback scale</h2>
          <div className="mt-4 grid gap-2">
            {husbandScale.map((item) => <p key={item} className="rounded-2xl bg-white/10 p-3 font-extrabold">{item}</p>)}
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold">Useful English phrases</h2>
          <ul className="mt-4 grid gap-2 text-sm">
            {husbandPhrases.map((item) => <li key={item} className="rounded-2xl bg-white/10 p-3">{item}</li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}

function QuizPage({ language }: { language: Language }) {
  return (
    <div>
      <SectionTitle title={pageTitles.quiz[language]} subtitle={{
        vi: "Chọn mức hoặc chủ đề, trả lời, xem giải thích và ôn các lỗi.",
        en: "Choose a level or category, answer, read explanations and review mistakes.",
        fr: "Choisir un niveau ou thème, répondre, lire les corrections et revoir les erreurs.",
      }[language]} />
      <Quiz language={language} />
    </div>
  );
}

function Printables({ language }: { language: Language }) {
  return (
    <div>
      <SectionTitle title={pageTitles.printables[language]} subtitle={{
        vi: "Các trang này được tối ưu để in A4: nền trắng, ít màu, không in thanh điều hướng.",
        en: "These sheets are optimized for A4 print: white background, low color, no navigation.",
        fr: "Ces fiches sont optimisées A4 : fond blanc, peu de couleurs, navigation masquée.",
      }[language]} />
      <div className="grid gap-6">
        {printableSheets.map((sheet) => <PrintableSheet key={sheet.id} sheet={sheet} language={language} />)}
      </div>
    </div>
  );
}

function Sources({ language }: { language: Language }) {
  return (
    <div>
      <SectionTitle title={pageTitles.sources[language]} subtitle={ui.sourceDisclaimer[language]} />
      <div className="grid gap-4">
        {sourceLinks.map((source) => (
          <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="focus-ring rounded-3xl bg-white/90 p-5 shadow-soft ring-1 ring-moss/10 transition hover:-translate-y-1">
            <p className="font-display text-2xl font-bold text-moss">{source.title}</p>
            <p className="mt-2 text-sm leading-6 text-ink/70">{source.note[language]}</p>
            <p className="mt-3 break-all text-sm font-bold text-clay">{source.url}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
