import type { Language } from "./types";

export const ui = {
  appName: {
    vi: "Lái xe ở Pháp",
    en: "Driving in France",
    fr: "Conduire en France",
  },
  tagline: {
    vi: "Học luật, từ vựng và phản xạ an toàn trước khi luyện lái trong điều kiện hợp pháp.",
    en: "Learn rules, vocabulary and safety habits before practicing in a legal setting.",
    fr: "Apprendre les règles, le vocabulaire et les réflexes avant de pratiquer dans un cadre légal.",
  },
  legalShort: {
    vi: "Chỉ luyện lái xe trong điều kiện hợp pháp và có bảo hiểm phù hợp.",
    en: "Only practice driving in a legal and insured context.",
    fr: "Ne pratiquer la conduite que dans un cadre légal et assuré.",
  },
  verifyRules: {
    vi: "Luật có thể thay đổi. Hãy kiểm tra trên nguồn chính thức của Pháp trước khi lái hoặc chuẩn bị thi.",
    en: "Rules can change. Check official French sources before driving or preparing an exam.",
    fr: "Les règles peuvent changer. Vérifiez les sources officielles françaises avant de conduire ou de préparer un examen.",
  },
  startLearning: {
    vi: "Bắt đầu học",
    en: "Start learning",
    fr: "Commencer",
  },
  importance: {
    vi: "Mức quan trọng",
    en: "Importance",
    fr: "Importance",
  },
  frequentMistake: {
    vi: "Lỗi thường gặp",
    en: "Common mistake",
    fr: "Erreur fréquente",
  },
  example: {
    vi: "Ví dụ",
    en: "Example",
    fr: "Exemple",
  },
  remember: {
    vi: "Câu cần nhớ",
    en: "Remember",
    fr: "À retenir",
  },
  search: {
    vi: "Tìm kiếm",
    en: "Search",
    fr: "Rechercher",
  },
  category: {
    vi: "Chủ đề",
    en: "Category",
    fr: "Catégorie",
  },
  allCategories: {
    vi: "Tất cả",
    en: "All",
    fr: "Toutes",
  },
  vitalOnly: {
    vi: "Chỉ từ rất quan trọng",
    en: "Vital words only",
    fr: "Mots vitaux seulement",
  },
  hideTranslations: {
    vi: "Ẩn dịch",
    en: "Hide translations",
    fr: "Masquer les traductions",
  },
  showTranslations: {
    vi: "Hiện dịch",
    en: "Show translations",
    fr: "Afficher les traductions",
  },
  reveal: {
    vi: "Xem nghĩa",
    en: "Reveal",
    fr: "Révéler",
  },
  knowIt: {
    vi: "Tôi biết",
    en: "I know it",
    fr: "Je connais",
  },
  reviewAgain: {
    vi: "Ôn lại",
    en: "Review again",
    fr: "À revoir",
  },
  score: {
    vi: "Điểm",
    en: "Score",
    fr: "Score",
  },
  restart: {
    vi: "Làm lại",
    en: "Restart",
    fr: "Recommencer",
  },
  checkAnswer: {
    vi: "Kiểm tra",
    en: "Check answer",
    fr: "Vérifier",
  },
  next: {
    vi: "Tiếp theo",
    en: "Next",
    fr: "Suivant",
  },
  print: {
    vi: "In trang này",
    en: "Print this sheet",
    fr: "Imprimer cette fiche",
  },
  sourceDisclaimer: {
    vi: "Trang web này chỉ là công cụ học tập đơn giản. Luật chính thức luôn cần được kiểm tra trên các nguồn chính phủ Pháp.",
    en: "This website is a simplified learning tool. Official rules must always be checked on French government sources.",
    fr: "Ce site est un support pédagogique simplifié. Les règles officielles doivent toujours être vérifiées sur les sources gouvernementales françaises.",
  },
} satisfies Record<string, Record<Language, string>>;
