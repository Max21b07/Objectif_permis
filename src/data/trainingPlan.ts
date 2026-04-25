import type { TrainingSession } from "./types";

const loc = (vi: string, en: string, fr: string) => ({ vi, en, fr });

const level = [
  loc("Cấp 1: nơi kín hoặc rất an toàn", "Level 1: closed or very secure area", "Niveau 1 : environnement fermé ou très sécurisé"),
  loc("Cấp 2: khu rất yên tĩnh", "Level 2: very calm areas", "Niveau 2 : zones très calmes"),
  loc("Cấp 3: đô thị đơn giản", "Level 3: simple urban traffic", "Niveau 3 : circulation urbaine simple"),
  loc("Cấp 4: giao thông phức tạp hơn", "Level 4: more complex traffic", "Niveau 4 : circulation plus complexe"),
];

const legal = loc(
  "Chỉ trong điều kiện hợp pháp và có bảo hiểm: auto-école, xe double commande hoặc khung pháp lý phù hợp.",
  "Only in a legal and insured context: driving school, dual-control car or suitable legal framework.",
  "Seulement dans un cadre légal et assuré : auto-école, véhicule double commande ou cadre adapté.",
);

const sessionData = [
  ["Ghế, gương, dây an toàn", "45 min", 0, ["Chỉnh ghế", "Chỉnh gương", "Tìm phanh/ga", "Thực hành P-R-N-D khi đứng yên"], ["Không nhìn gương đủ", "Nhầm chân phanh/ga"], ["Tự chuẩn bị vị trí lái không cần trợ giúp"]],
  ["Démarrage / arrêt", "50 min", 0, ["Khởi động", "Dừng nhẹ", "Giữ chân phanh", "Tắt xe an toàn"], ["Nhả phanh quá nhanh", "Quên kiểm tra cần số"], ["Dừng 10 lần êm và thẳng"]],
  ["Dosage frein / accélérateur", "55 min", 0, ["Tiến chậm", "Dừng tại điểm", "Creep effect", "Tăng ga rất nhẹ"], ["Đạp ga quá mạnh", "Phanh giật"], ["Đi chậm ổn định trong 5 phút"]],
  ["Trajectoire lente et marche arrière", "60 min", 0, ["Đi thẳng chậm", "Vòng rộng", "Lùi nhẹ", "Nhìn gương và quay đầu"], ["Chỉ nhìn camera", "Đánh lái quá nhiều"], ["Lùi 20 m có kiểm soát"]],
  ["Stationnement simple", "60 min", 0, ["Đỗ vuông góc", "Đỗ song song mô phỏng", "Kiểm tra xung quanh", "P + frein à main"], ["Quên người đi bộ", "Đỗ lệch quá nhiều"], ["Đỗ an toàn không chạm vật cản"]],
  ["Tenir sa voie", "60 min", 1, ["Giữ làn", "Nhìn xa", "Giữ bên phải", "Tốc độ thấp"], ["Nhìn quá gần", "Lệch làn"], ["Giữ làn ổn định 10 phút"]],
  ["Tourner à droite / gauche", "60 min", 1, ["Préparer tôt", "Gương", "Clignotant", "Góc chết", "Rẽ chậm"], ["Báo muộn", "Cắt góc"], ["Rẽ 12 lần không vội"]],
  ["Stops et cédez-le-passage", "70 min", 1, ["Dừng hẳn", "Nhường đường", "Đọc biển", "Khởi hành lại"], ["STOP không dừng hẳn", "Ép ưu tiên"], ["Không làm xe khác phanh"]],
  ["Angles morts et clignotants", "65 min", 1, ["Đổi làn mô phỏng", "Gương-góc chết", "Bật/tắt clignotant", "Giữ tốc độ"], ["Chuyển làn ngay sau clignotant", "Quên góc chết"], ["Quy trình rõ 10 lần"]],
  ["Priorités simples", "70 min", 2, ["Ưu tiên bên phải", "Đường ưu tiên", "Giao lộ nhỏ", "Tốc độ phù hợp"], ["Nghĩ mình luôn ưu tiên", "Không giảm trước giao lộ"], ["Giải thích được ai đi trước"]],
  ["Piétons, vélos, bus", "70 min", 2, ["Passage piéton", "Làn xe đạp", "Bus dừng", "Khoảng cách bên"], ["Rẽ phải không nhìn xe đạp", "Qua vạch quá nhanh"], ["Chuẩn bị phanh trước mọi vạch"]],
  ["Giratoires simples", "75 min", 2, ["Vào chậm", "Nhường xe trong vòng", "Chọn lối ra", "Clignotant phải"], ["Quên xi-nhan ra", "Vào quá nhanh"], ["Đi 6 vòng xuyến bình tĩnh"]],
  ["Changements de voie", "75 min", 2, ["Gương", "Clignotant", "Góc chết", "Khoảng trống", "Di chuyển nhẹ"], ["Ép xe sau", "Không giữ tốc độ"], ["Đổi làn không làm ai phanh"]],
  ["Zones 30 et pluie", "70 min", 2, ["Tốc độ thấp", "Khoảng cách", "Phanh nhẹ", "Quan sát vỉa hè"], ["Đi 50 trong khu 30", "Bám sát khi mưa"], ["Tự điều chỉnh tốc độ theo nguy cơ"]],
  ["Insertion et voies rapides", "80 min", 3, ["Nếu hợp pháp và đủ trình độ", "Làn tăng tốc", "Gương-góc chết", "Khoảng cách"], ["Dừng ở cuối làn nhập", "Nhập quá chậm"], ["Nhập làn không gây bất ngờ"]],
  ["Trafic dense et stress léger", "80 min", 3, ["Dự đoán", "Giữ khoảng cách", "Quy trình bình tĩnh", "Dừng debrief"], ["Quá tải thông tin", "Sửa nhiều lỗi cùng lúc"], ["Giữ an toàn và bình tĩnh trong 20 phút"]],
];

export const trainingPlan: TrainingSession[] = sessionData.map((item, index) => {
  const [objectiveFr, duration, levelIndex, exercisesFr, watchFr, successFr] = item as [string, string, number, string[], string[], string[]];
  return {
    week: Math.floor(index / 2) + 1,
    session: index + 1,
    level: level[levelIndex],
    objective: loc(objectiveFr, objectiveFr, objectiveFr),
    duration,
    legalPlace: legal,
    exercises: exercisesFr.map((x) => loc(x, x, x)),
    vocabulary: ["Freine", "Doucement", "Regarde loin", "Clignotant", "Angle mort"].slice(0, 3 + (index % 3)),
    watch: watchFr.map((x) => loc(x, x, x)),
    success: successFr.map((x) => loc(x, x, x)),
    stress: index < 5 ? "Low" : index < 13 ? "Medium" : "High",
  };
});
