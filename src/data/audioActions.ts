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
  { id: "right", emoji: "➡️", label: { vi: "Rẽ phải", en: "Right", fr: "Droite" } },
  { id: "left", emoji: "⬅️", label: { vi: "Rẽ trái", en: "Left", fr: "Gauche" } },
  { id: "straight", emoji: "⬆️", label: { vi: "Đi thẳng", en: "Straight", fr: "Tout droit" } },
  { id: "lane", emoji: "🛣️", label: { vi: "Làn đường", en: "Lane", fr: "Voie" } },
  { id: "reverse", emoji: "↩️", label: { vi: "Lùi", en: "Reverse", fr: "Reculer" } },
  { id: "pedestrian", emoji: "🚶", label: { vi: "Người đi bộ", en: "Pedestrian", fr: "Piéton" } },
] as const;

export const audioActions: AudioActionItem[] = [
  { id: "freine", promptFrench: "Freine", promptVietnamese: "Phanh", promptEnglish: "Brake", target: "brake", category: "French commands", audio: { fr: "audio/maxime/01-freine.wav" } },
  { id: "freine-maintenant", promptFrench: "Freine maintenant", promptVietnamese: "Phanh ngay", promptEnglish: "Brake now", target: "brake", category: "French commands", audio: { fr: "audio/maxime/02-freine-maintenant.wav" } },
  { id: "ralentis", promptFrench: "Ralentis", promptVietnamese: "Chậm lại", promptEnglish: "Slow down", target: "brake", category: "French commands", audio: { fr: "audio/maxime/03-ralentis.wav" } },
  { id: "ralentis-doucement", promptFrench: "Ralentis doucement", promptVietnamese: "Chậm lại nhẹ nhàng", promptEnglish: "Slow down gently", target: "brake", category: "French commands", audio: { fr: "audio/maxime/04-ralentis-doucement.wav" } },
  { id: "accelere-doucement", promptFrench: "Accélère doucement", promptVietnamese: "Tăng ga nhẹ", promptEnglish: "Accelerate gently", target: "accelerate", category: "Automatic car basics", audio: { fr: "audio/maxime/05-accelere-doucement.wav" } },
  { id: "tourne-a-droite", promptFrench: "Tourne à droite", promptVietnamese: "Rẽ phải", promptEnglish: "Turn right", target: "right", category: "French commands", audio: { fr: "audio/maxime/06-tourne-a-droite.wav" } },
  { id: "tourne-a-gauche", promptFrench: "Tourne à gauche", promptVietnamese: "Rẽ trái", promptEnglish: "Turn left", target: "left", category: "French commands", audio: { fr: "audio/maxime/07-tourne-a-gauche.wav" } },
  { id: "va-tout-droit", promptFrench: "Va tout droit", promptVietnamese: "Đi thẳng", promptEnglish: "Go straight", target: "straight", category: "French commands", audio: { fr: "audio/maxime/08-va-tout-droit.wav" } },
  { id: "stop", promptFrench: "Stop", promptVietnamese: "Dừng hẳn", promptEnglish: "Stop", target: "stop", category: "Priority", audio: { fr: "audio/maxime/09-stop.wav" } },
  { id: "attends", promptFrench: "Attends", promptVietnamese: "Chờ", promptEnglish: "Wait", target: "stop", category: "French commands", audio: { fr: "audio/maxime/10-attends.wav" } },
  { id: "laisse-passer", promptFrench: "Laisse passer", promptVietnamese: "Nhường cho họ đi", promptEnglish: "Let them pass", target: "yield", category: "Pedestrians", audio: { fr: "audio/maxime/11-laisse-passer.wav" } },
  { id: "mets-clignotant", promptFrench: "Mets le clignotant", promptVietnamese: "Bật xi-nhan", promptEnglish: "Use the indicator", target: "indicator", category: "French commands", audio: { fr: "audio/maxime/12-mets-le-clignotant.wav" } },
  { id: "regarde-retro", promptFrench: "Regarde le rétroviseur", promptVietnamese: "Nhìn gương", promptEnglish: "Check the mirror", target: "mirror", category: "French commands", audio: { fr: "audio/maxime/13-regarde-le-retroviseur.wav" } },
  { id: "controle-angle-mort", promptFrench: "Contrôle l'angle mort", promptVietnamese: "Kiểm tra góc chết", promptEnglish: "Check the blind spot", target: "blindspot", category: "Blind spots", audio: { fr: "audio/maxime/14-controle-angle-mort.wav" } },
  { id: "garde-ta-droite", promptFrench: "Garde ta droite", promptVietnamese: "Giữ bên phải", promptEnglish: "Keep right", target: "right", category: "French commands", audio: { fr: "audio/maxime/15-garde-ta-droite.wav" } },
  { id: "reste-dans-ta-voie", promptFrench: "Reste dans ta voie", promptVietnamese: "Ở trong làn của em", promptEnglish: "Stay in your lane", target: "lane", category: "French commands", audio: { fr: "audio/maxime/16-reste-dans-ta-voie.wav" } },
  { id: "trop-vite", promptFrench: "Trop vite", promptVietnamese: "Quá nhanh", promptEnglish: "Too fast", target: "brake", category: "French commands", audio: { fr: "audio/maxime/17-trop-vite.wav" } },
  { id: "doucement", promptFrench: "Doucement", promptVietnamese: "Nhẹ nhàng / chậm thôi", promptEnglish: "Gently", target: "brake", category: "French commands", audio: { fr: "audio/maxime/18-doucement.wav" } },
  { id: "recule-doucement", promptFrench: "Recule doucement", promptVietnamese: "Lùi nhẹ nhàng", promptEnglish: "Reverse gently", target: "reverse", category: "Automatic car basics", audio: { fr: "audio/maxime/19-recule-doucement.wav" } },
  { id: "pieton", promptFrench: "Piéton", promptVietnamese: "Người đi bộ", promptEnglish: "Pedestrian", target: "pedestrian", category: "Pedestrians", audio: { fr: "audio/maxime/20-pieton.wav" } },
];

const maximeFrenchAudio: Record<string, string> = {
  "freine": "audio/maxime/01-freine.wav",
  "freine maintenant": "audio/maxime/02-freine-maintenant.wav",
  "ralentis": "audio/maxime/03-ralentis.wav",
  "ralentis doucement": "audio/maxime/04-ralentis-doucement.wav",
  "accélère doucement": "audio/maxime/05-accelere-doucement.wav",
  "tourne à droite": "audio/maxime/06-tourne-a-droite.wav",
  "tourne à gauche": "audio/maxime/07-tourne-a-gauche.wav",
  "va tout droit": "audio/maxime/08-va-tout-droit.wav",
  "stop": "audio/maxime/09-stop.wav",
  "attends": "audio/maxime/10-attends.wav",
  "laisse passer": "audio/maxime/11-laisse-passer.wav",
  "mets le clignotant": "audio/maxime/12-mets-le-clignotant.wav",
  "regarde le rétroviseur": "audio/maxime/13-regarde-le-retroviseur.wav",
  "contrôle l'angle mort": "audio/maxime/14-controle-angle-mort.wav",
  "garde ta droite": "audio/maxime/15-garde-ta-droite.wav",
  "reste dans ta voie": "audio/maxime/16-reste-dans-ta-voie.wav",
  "trop vite": "audio/maxime/17-trop-vite.wav",
  "doucement": "audio/maxime/18-doucement.wav",
  "recule doucement": "audio/maxime/19-recule-doucement.wav",
  "piéton": "audio/maxime/20-pieton.wav",
  "vélo": "audio/maxime/21-velo.wav",
  "voiture derrière": "audio/maxime/22-voiture-derriere.wav",
};

export function getMaximeFrenchAudio(french: string): string | undefined {
  return maximeFrenchAudio[french.trim().toLowerCase()];
}
