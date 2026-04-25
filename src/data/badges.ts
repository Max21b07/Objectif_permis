import type { BadgeDefinition } from "./types";

const l = (vi: string, en: string, fr: string) => ({ vi, en, fr });

export const badges: BadgeDefinition[] = [
  {
    id: "first-lesson",
    icon: "🌱",
    title: l("Bài đầu tiên xong", "First lesson completed", "Première leçon terminée"),
    description: l("Hoàn thành một Daily Drive.", "Complete one Daily Drive.", "Terminer un Daily Drive."),
    category: "daily",
  },
  {
    id: "streak-3",
    icon: "🔥",
    title: l("Chuỗi 3 ngày", "3-day streak", "Série de 3 jours"),
    description: l("Học 3 ngày liên tiếp.", "Learn 3 days in a row.", "Étudier 3 jours d'affilée."),
    category: "daily",
  },
  {
    id: "streak-7",
    icon: "🏅",
    title: l("Chuỗi 7 ngày", "7-day streak", "Série de 7 jours"),
    description: l("Giữ thói quen 7 ngày.", "Keep a 7-day habit.", "Garder l'habitude 7 jours."),
    category: "daily",
  },
  {
    id: "words-30",
    icon: "📚",
    title: l("30 từ tiếng Pháp", "30 French words learned", "30 mots français appris"),
    description: l("Đánh dấu 30 flashcards đã biết.", "Mark 30 flashcards as known.", "Marquer 30 cartes comme connues."),
    category: "commands",
  },
  {
    id: "traffic-light",
    icon: "🚦",
    title: l("Bậc thầy đèn giao thông", "Traffic light master", "Maîtrise des feux"),
    description: l("Trả lời đúng câu hỏi về đèn.", "Answer traffic-light questions correctly.", "Répondre aux questions sur les feux."),
    category: "traffic-lights",
  },
  {
    id: "roundabout",
    icon: "🔄",
    title: l("Bắt đầu vòng xuyến", "Roundabout beginner", "Débutante en giratoire"),
    description: l("Hoàn thành tình huống vòng xuyến.", "Complete a roundabout scenario.", "Terminer un scénario de giratoire."),
    category: "roundabouts",
  },
  {
    id: "blind-spot",
    icon: "👀",
    title: l("Kiểm tra góc chết", "Blind spot checker", "Contrôle angle mort"),
    description: l("Ôn góc chết hoặc đổi làn.", "Review blind spots or lane changes.", "Revoir angle mort ou changement de voie."),
    category: "blind-spots",
  },
  {
    id: "pedestrian",
    icon: "🚶",
    title: l("Bảo vệ người đi bộ", "Pedestrian protector", "Protectrice des piétons"),
    description: l("Hoàn thành tình huống người đi bộ.", "Complete a pedestrian scenario.", "Terminer un scénario piéton."),
    category: "pedestrians",
  },
  {
    id: "automatic",
    icon: "⚙️",
    title: l("Cơ bản xe tự động", "Automatic car basics", "Bases boîte automatique"),
    description: l("Ôn kiến thức P, R, N, D và phanh/ga.", "Review P, R, N, D and pedals.", "Revoir P, R, N, D et les pédales."),
    category: "automatic",
  },
  {
    id: "maxime-commands",
    icon: "🗣️",
    title: l("Hiểu consignes của Maxime", "I can understand Maxime's driving commands", "Je comprends les consignes de Maxime"),
    description: l("Hoàn thành Practice with Maxime.", "Complete Practice with Maxime.", "Terminer Practice with Maxime."),
    category: "practice",
  },
];
