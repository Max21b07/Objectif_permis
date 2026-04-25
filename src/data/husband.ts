import type { LocalizedString } from "../locales/types";

const l = (vi: string, en: string, fr: string): LocalizedString => ({ vi, en, fr });

export const husbandGuidelines: LocalizedString[] = [
  l("Ban đầu nói tiếng Anh đơn giản.", "Use simple English at the beginning.", "Parler en anglais simple au début."),
  l("Luôn dùng cùng một từ cho cùng một hành động.", "Use the same words for the same action.", "Utiliser toujours les mêmes mots."),
  l("Nói sớm, trước thao tác.", "Speak early, before the maneuver.", "Parler tôt, avant la manœuvre."),
  l("Không đưa chỉ dẫn vào giây cuối.", "Do not give instructions at the last second.", "Ne pas donner les consignes au dernier moment."),
  l("Tránh câu dài.", "Avoid long sentences.", "Éviter les phrases longues."),
  l("Không la hét.", "Do not shout.", "Ne pas crier."),
  l("Không sửa nhiều lỗi cùng lúc.", "Do not correct several things at once.", "Ne pas corriger plusieurs choses à la fois."),
  l("Dừng xe rồi mới debrief.", "Debrief after stopping.", "Débriefer après l'arrêt."),
  l("Mỗi lần chỉ sửa một điểm.", "Correct one thing at a time.", "Corriger une seule chose à la fois."),
  l("Ghi lại lỗi lặp lại.", "Write down recurring errors.", "Noter les erreurs récurrentes."),
  l("Khen phản xạ đúng.", "Praise good habits.", "Féliciter les bons réflexes."),
  l("Giữ giọng bình tĩnh.", "Keep a calm tone.", "Garder un ton calme."),
  l("Không bao giờ ứng biến ngoài khung pháp lý.", "Never improvise outside the legal framework.", "Ne jamais improviser hors cadre légal."),
];

export const husbandScale = ["Dangerous", "Needs improvement", "Correct", "Good", "Very good"];

export const husbandPhrases = [
  "I will give you the instruction early.",
  "Do not panic.",
  "Brake gently.",
  "Slow down gradually.",
  "We will stop and discuss.",
  "This was not dangerous, but we can improve it.",
  "Good mirror check.",
  "Next time, check the blind spot earlier.",
  "Stay in your lane.",
  "You are too close to the car in front.",
  "Let the pedestrian cross.",
  "Take your time.",
  "We are not in a hurry.",
];
