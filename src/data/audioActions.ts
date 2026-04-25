import type { AudioActionItem } from "./types";

export const actionButtons = [
  { id: "brake", emoji: "🛑", label: { vi: "Phanh", en: "Brake", fr: "Frein" } },
  { id: "accelerate", emoji: "🟢", label: { vi: "Tăng ga", en: "Accelerate", fr: "Accélérer" } },
  { id: "horn", emoji: "📣", label: { vi: "Còi", en: "Horn", fr: "Klaxon" } },
  { id: "indicator", emoji: "↪️", label: { vi: "Xi-nhan", en: "Indicator", fr: "Clignotant" } },
  { id: "mirror", emoji: "🪞", label: { vi: "Gương", en: "Mirror", fr: "Rétroviseur" } },
  { id: "blindspot", emoji: "👀", label: { vi: "Góc chết", en: "Blind spot", fr: "Angle mort" } },
  { id: "stop", emoji: "✋", label: { vi: "Dừng", en: "Stop", fr: "Stop" } },
  { id: "yield", emoji: "🤝", label: { vi: "Nhường", en: "Give way", fr: "Céder" } },
] as const;

export const audioActions: AudioActionItem[] = [
  { id: "freine", promptFrench: "Freine", promptVietnamese: "Phanh", promptEnglish: "Brake", target: "brake", category: "French commands" },
  { id: "freine-maintenant", promptFrench: "Freine maintenant", promptVietnamese: "Phanh ngay", promptEnglish: "Brake now", target: "brake", category: "French commands" },
  { id: "ralentis", promptFrench: "Ralentis", promptVietnamese: "Chậm lại", promptEnglish: "Slow down", target: "brake", category: "French commands" },
  { id: "accelere-doucement", promptFrench: "Accélère doucement", promptVietnamese: "Tăng ga nhẹ", promptEnglish: "Accelerate gently", target: "accelerate", category: "Automatic car basics" },
  { id: "klaxon", promptFrench: "Klaxon", promptVietnamese: "Còi", promptEnglish: "Horn", target: "horn", category: "Vocabulary" },
  { id: "mets-clignotant", promptFrench: "Mets le clignotant", promptVietnamese: "Bật xi-nhan", promptEnglish: "Use the indicator", target: "indicator", category: "French commands" },
  { id: "regarde-retro", promptFrench: "Regarde le rétroviseur", promptVietnamese: "Nhìn gương", promptEnglish: "Check the mirror", target: "mirror", category: "French commands" },
  { id: "controle-angle-mort", promptFrench: "Contrôle l'angle mort", promptVietnamese: "Kiểm tra góc chết", promptEnglish: "Check the blind spot", target: "blindspot", category: "Blind spots" },
  { id: "stop", promptFrench: "Stop", promptVietnamese: "Dừng hẳn", promptEnglish: "Stop", target: "stop", category: "Priority" },
  { id: "attends", promptFrench: "Attends", promptVietnamese: "Chờ", promptEnglish: "Wait", target: "stop", category: "French commands" },
  { id: "laisse-passer", promptFrench: "Laisse passer", promptVietnamese: "Nhường cho họ đi", promptEnglish: "Let them pass", target: "yield", category: "Pedestrians" },
  { id: "cede-passage", promptFrench: "Cède le passage", promptVietnamese: "Nhường đường", promptEnglish: "Give way", target: "yield", category: "Priority" },
];
