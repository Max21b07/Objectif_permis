import type { LocalizedString } from "../locales/types";

export const automaticBasics: Array<{ title: string; text: LocalizedString; danger?: boolean }> = [
  { title: "P = Park", text: { vi: "Dùng khi đỗ xe. Không chọn P khi xe còn đang chạy.", en: "Use when parked. Never select P while the car is moving.", fr: "À utiliser au stationnement. Ne jamais mettre P quand la voiture roule." }, danger: true },
  { title: "R = Reverse", text: { vi: "Số lùi. Luôn giữ chân phanh và kiểm tra phía sau trước khi nhả phanh.", en: "Reverse. Keep the brake pressed and check behind before releasing it.", fr: "Marche arrière. Garder le frein et contrôler derrière avant de relâcher." } },
  { title: "N = Neutral", text: { vi: "Số N. Ít dùng khi học lái; không dùng để trôi xe.", en: "Neutral. Rarely needed for a learner; do not use it to coast.", fr: "Point mort. Rarement utile pour débuter ; ne pas l'utiliser pour rouler en roue libre." } },
  { title: "D = Drive", text: { vi: "Số tiến. Xe có thể tự bò chậm khi nhả phanh.", en: "Forward drive. The car may creep when you release the brake.", fr: "Marche avant. La voiture peut avancer seule au relâchement du frein." } },
  { title: "Frein", text: { vi: "Bàn đạp quan trọng nhất. Khi nghi ngờ, che chân lên phanh.", en: "The most important pedal. When unsure, cover the brake.", fr: "La pédale la plus importante. En cas de doute, pied prêt au frein." }, danger: true },
  { title: "Accélérateur", text: { vi: "Chạm rất nhẹ. Không tăng ga nếu chưa chắc xe đang ở D hay R.", en: "Touch it gently. Do not accelerate until you know whether D or R is selected.", fr: "Très progressif. Ne pas accélérer sans vérifier D ou R." }, danger: true },
  { title: "Frein à main", text: { vi: "Dùng khi đỗ hoặc theo hướng dẫn của xe/giáo viên.", en: "Use when parking or as instructed by the car/instructor.", fr: "À utiliser au stationnement ou selon le véhicule/le moniteur." } },
  { title: "Creep effect", text: { vi: "Xe số tự động có thể tự tiến hoặc lùi chậm khi nhả phanh. Đây là bình thường nhưng cần kiểm soát.", en: "An automatic car can move slowly when the brake is released. This is normal but must be controlled.", fr: "Une automatique peut ramper au relâchement du frein. C'est normal mais à contrôler." } },
  { title: "Pied droit seulement", text: { vi: "Thường dùng chỉ chân phải cho phanh và ga, trừ khi giáo viên dạy phương pháp khác.", en: "Usually use only the right foot for brake and accelerator unless an instructor teaches otherwise.", fr: "Utiliser généralement le pied droit pour frein et accélérateur, sauf méthode contraire du moniteur." }, danger: true },
  { title: "À l'arrêt", text: { vi: "Khi dừng, giữ chân trên phanh để xe không tự bò.", en: "When stopped, keep your foot on the brake so the car does not creep.", fr: "À l'arrêt, garder le pied sur le frein pour éviter le rampage." } },
  { title: "Avant d'accélérer", text: { vi: "Luôn kiểm tra vị trí cần số, hướng xe và môi trường trước khi tăng ga.", en: "Always check selector position, car direction and surroundings before accelerating.", fr: "Toujours vérifier sélecteur, direction et environnement avant d'accélérer." }, danger: true },
];

export const automaticChecklist: LocalizedString[] = [
  { vi: "Ghế đã chỉnh đúng.", en: "Seat adjusted.", fr: "Siège réglé." },
  { vi: "Gương đã chỉnh.", en: "Mirrors adjusted.", fr: "Rétroviseurs réglés." },
  { vi: "Dây an toàn đã cài.", en: "Seat belt fastened.", fr: "Ceinture attachée." },
  { vi: "Chân đặt trên phanh.", en: "Foot on the brake.", fr: "Pied sur le frein." },
  { vi: "Cần số ở D hoặc R đúng nhu cầu.", en: "Selector on D or R as needed.", fr: "Sélecteur sur D ou R selon besoin." },
  { vi: "Môi trường xung quanh đã kiểm tra.", en: "Surroundings checked.", fr: "Environnement vérifié." },
  { vi: "Bật clignotant nếu cần.", en: "Indicator on if needed.", fr: "Clignotant si nécessaire." },
];
