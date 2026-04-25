import type { ComparisonItem } from "./types";

const c = (
  id: string,
  vietnamHabit: ComparisonItem["vietnamHabit"],
  franceChange: ComparisonItem["franceChange"],
  risk: ComparisonItem["risk"],
  reflex: ComparisonItem["reflex"],
): ComparisonItem => ({ id, vietnamHabit, franceChange, risk, reflex });

export const vietnamVsFrance: ComparisonItem[] = [
  c("priority", {
    vi: "Ở Việt Nam, giao thông thường linh hoạt và nhiều người tự thương lượng bằng mắt.",
    en: "In Vietnam, traffic can feel more negotiated and flexible.",
    fr: "Au Vietnam, la circulation peut sembler plus négociée et flexible.",
  }, {
    vi: "Ở Pháp, quyền ưu tiên được áp dụng chặt hơn bằng biển, vạch và quy tắc.",
    en: "In France, priority is stricter and defined by signs, markings and rules.",
    fr: "En France, les priorités sont plus strictes et codifiées.",
  }, {
    vi: "Nếu đoán sai ưu tiên, xe khác có thể không nhường và tai nạn xảy ra nhanh.",
    en: "If you guess priority wrong, other drivers may not yield and a crash can happen quickly.",
    fr: "Une mauvaise priorité peut provoquer un accident très vite.",
  }, {
    vi: "Trước mỗi giao lộ: đọc biển, nhìn phải, nhìn trái, đi khi rõ.",
    en: "At every junction: read signs, check right, check left, go only when clear.",
    fr: "À chaque intersection : lire, droite, gauche, partir si clair.",
  }),
  c("pedestrians", {
    vi: "Người đi bộ ở Việt Nam đôi khi tự tìm khoảng trống để qua đường.",
    en: "In Vietnam, pedestrians may often find their own gap to cross.",
    fr: "Au Vietnam, les piétons cherchent souvent leur espace pour traverser.",
  }, {
    vi: "Ở Pháp, người đi bộ tại vạch qua đường được bảo vệ rất mạnh.",
    en: "In France, pedestrians at crossings are strongly protected.",
    fr: "En France, les piétons au passage sont très protégés.",
  }, {
    vi: "Không nhường người đi bộ là nguy hiểm và có thể bị phạt.",
    en: "Failing to yield is dangerous and can be penalized.",
    fr: "Ne pas céder est dangereux et sanctionnable.",
  }, {
    vi: "Thấy người gần vạch qua đường: giảm tốc và chuẩn bị dừng.",
    en: "See a person near a crossing: slow and prepare to stop.",
    fr: "Voir un piéton près du passage : ralentir et préparer l'arrêt.",
  }),
  c("lanes", {
    vi: "Làn đường ở Việt Nam có thể được dùng linh hoạt hơn.",
    en: "Lane use in Vietnam can feel more flexible.",
    fr: "Les voies peuvent être utilisées plus souplement au Vietnam.",
  }, {
    vi: "Ở Pháp, làn đường, mũi tên và vạch kẻ cần được tôn trọng rõ ràng.",
    en: "In France, lanes, arrows and markings must be followed precisely.",
    fr: "En France, voies, flèches et marquages se respectent précisément.",
  }, {
    vi: "Đi sai làn có thể làm xe khác bất ngờ, đặc biệt ở vòng xuyến.",
    en: "Wrong lane position can surprise others, especially at roundabouts.",
    fr: "Une mauvaise voie surprend, surtout en giratoire.",
  }, {
    vi: "Chọn làn sớm theo hướng cần đi.",
    en: "Choose the correct lane early.",
    fr: "Choisir sa voie tôt selon la direction.",
  }),
  c("indicators", {
    vi: "Ở Việt Nam, một số người chuyển hướng mà báo hiệu rất muộn.",
    en: "In Vietnam, some drivers signal late or not at all.",
    fr: "Au Vietnam, certains signalent tard ou pas du tout.",
  }, {
    vi: "Ở Pháp, clignotant là tín hiệu quan trọng trước khi đổi hướng.",
    en: "In France, indicators are a key signal before changing direction.",
    fr: "En France, le clignotant est un signal essentiel.",
  }, {
    vi: "Báo muộn làm xe sau không có thời gian phản ứng.",
    en: "Late signaling gives following traffic no time to react.",
    fr: "Signaler tard empêche les autres d'anticiper.",
  }, {
    vi: "Gương, clignotant, góc chết, rồi mới di chuyển.",
    en: "Mirror, indicator, blind spot, then move.",
    fr: "Miroir, clignotant, angle mort, puis action.",
  }),
  c("roundabouts", {
    vi: "Vòng xuyến ở Việt Nam có thể đông và linh hoạt.",
    en: "Vietnamese roundabouts can be dense and fluid.",
    fr: "Les giratoires vietnamiens peuvent être denses et fluides.",
  }, {
    vi: "Ở Pháp, cần nhường đúng, chọn làn và báo khi ra.",
    en: "In France, you must yield correctly, choose lanes and signal exits.",
    fr: "En France, il faut céder, choisir sa voie et signaler la sortie.",
  }, {
    vi: "Cắt làn hoặc không xi-nhan làm người khác không hiểu ý định.",
    en: "Cutting lanes or not signaling makes your intention unclear.",
    fr: "Couper une voie ou ne pas signaler rend l'intention floue.",
  }, {
    vi: "Vào chậm, quan sát trái, ra bằng clignotant phải.",
    en: "Enter slowly, check left, exit with right indicator.",
    fr: "Entrer lentement, contrôler à gauche, sortir avec clignotant droit.",
  }),
  c("bikes", {
    vi: "Xe máy ở Việt Nam rất nhiều, nên người lái quen với chuyển động xung quanh.",
    en: "Vietnam has many motorbikes, so drivers expect movement around them.",
    fr: "Au Vietnam, les deux-roues sont partout, donc le mouvement est attendu.",
  }, {
    vi: "Ở Pháp có nhiều xe đạp và trottinette trong làn riêng hoặc góc chết.",
    en: "In France, bikes and scooters may use dedicated lanes or blind spots.",
    fr: "En France, vélos et trottinettes peuvent être en piste ou angle mort.",
  }, {
    vi: "Rẽ phải không kiểm tra có thể cắt đường xe đạp.",
    en: "Turning right without checking can cut across a cyclist.",
    fr: "Tourner sans contrôle peut couper un cycliste.",
  }, {
    vi: "Trước khi rẽ: gương phải và góc chết phải.",
    en: "Before turning: right mirror and right blind spot.",
    fr: "Avant de tourner : miroir droit et angle mort droit.",
  }),
  c("radars", {
    vi: "Ở Việt Nam, kiểm soát có thể khác tùy nơi.",
    en: "Enforcement in Vietnam can vary by place.",
    fr: "Le contrôle au Vietnam peut varier selon l'endroit.",
  }, {
    vi: "Ở Pháp có radar, kiểm tra tốc độ, điện thoại, rượu và giấy tờ.",
    en: "France uses cameras and checks for speed, phone, alcohol and documents.",
    fr: "La France contrôle vitesse, téléphone, alcool et documents.",
  }, {
    vi: "Vi phạm có thể gây phạt, mất điểm, vấn đề bảo hiểm.",
    en: "Violations can mean fines, points and insurance issues.",
    fr: "Les infractions peuvent entraîner amendes, points et assurance.",
  }, {
    vi: "Tuân thủ biển báo, không dùng điện thoại, không uống rượu.",
    en: "Follow signs, no phone, no alcohol.",
    fr: "Respecter les panneaux, pas de téléphone, pas d'alcool.",
  }),
  c("parking", {
    vi: "Ở Việt Nam, việc dừng/đỗ có thể linh hoạt hơn trong một số khu vực.",
    en: "Stopping and parking may be more flexible in some Vietnamese areas.",
    fr: "L'arrêt et le stationnement peuvent être plus souples dans certains lieux au Vietnam.",
  }, {
    vi: "Ở Pháp, đỗ xe phụ thuộc biển, vạch, giờ và thanh toán.",
    en: "In France, parking depends on signs, markings, hours and payment.",
    fr: "En France, stationner dépend des panneaux, marquages, horaires et paiement.",
  }, {
    vi: "Đỗ sai có thể bị phạt, kéo xe hoặc gây nguy hiểm cho người đi bộ.",
    en: "Bad parking can lead to fines, towing or danger for pedestrians.",
    fr: "Mauvais stationnement : amende, fourrière ou danger.",
  }, {
    vi: "Trước khi rời xe, đọc biển và kiểm tra không chặn ai.",
    en: "Before leaving the car, read signs and check you block nobody.",
    fr: "Avant de partir, lire les panneaux et vérifier qu'on ne bloque personne.",
  }),
  c("distance", {
    vi: "Trong giao thông đông, khoảng cách ở Việt Nam thường rất nhỏ.",
    en: "In dense Vietnamese traffic, gaps are often very small.",
    fr: "Dans le trafic dense vietnamien, les écarts sont souvent faibles.",
  }, {
    vi: "Ở Pháp, cần giữ khoảng cách rõ để có thời gian phanh.",
    en: "In France, keep clear distance to allow braking time.",
    fr: "En France, garder une vraie distance pour freiner.",
  }, {
    vi: "Bám sát làm tăng nguy cơ đâm sau.",
    en: "Tailgating increases rear-end crash risk.",
    fr: "Coller augmente le risque de collision arrière.",
  }, {
    vi: "Đếm khoảng hai giây, nhiều hơn khi mưa.",
    en: "Count about two seconds, more in rain.",
    fr: "Compter environ deux secondes, plus sous la pluie.",
  }),
  c("anticipation", {
    vi: "Ở Việt Nam, người lái thường xử lý rất gần tình huống.",
    en: "In Vietnam, drivers often react close to the situation.",
    fr: "Au Vietnam, les réactions peuvent être très proches de l'événement.",
  }, {
    vi: "Ở Pháp, bài thi và lái an toàn đòi hỏi dự đoán sớm.",
    en: "In France, exams and safe driving require early anticipation.",
    fr: "En France, l'examen et la sécurité demandent l'anticipation.",
  }, {
    vi: "Phản ứng muộn gây phanh gấp và stress.",
    en: "Late reactions cause hard braking and stress.",
    fr: "Réagir tard crée freinage fort et stress.",
  }, {
    vi: "Nhìn xa 10-15 giây khi có thể.",
    en: "Look 10-15 seconds ahead when possible.",
    fr: "Regarder 10-15 secondes devant si possible.",
  }),
  c("less-improvised", {
    vi: "Ở Việt Nam, có thể quen với việc ứng biến theo dòng xe.",
    en: "In Vietnam, you may be used to improvising with traffic flow.",
    fr: "Au Vietnam, on peut être habitué à improviser avec le flux.",
  }, {
    vi: "Ở Pháp, người khác mong bạn đi đúng quy trình.",
    en: "In France, others expect predictable procedure.",
    fr: "En France, les autres attendent une conduite prévisible.",
  }, {
    vi: "Ứng biến quá nhiều làm người khác không đoán được bạn.",
    en: "Too much improvisation makes you unpredictable.",
    fr: "Trop d'improvisation vous rend imprévisible.",
  }, {
    vi: "Quy trình cố định: quan sát, báo hiệu, kiểm tra, hành động.",
    en: "Use a fixed process: observe, signal, check, act.",
    fr: "Procédure fixe : observer, signaler, contrôler, agir.",
  }),
  c("speed", {
    vi: "Tốc độ ở Việt Nam có thể thay đổi theo dòng xe.",
    en: "Speed in Vietnam may follow traffic flow strongly.",
    fr: "Au Vietnam, la vitesse suit souvent le flux.",
  }, {
    vi: "Ở Pháp, giới hạn tốc độ và biển báo rất quan trọng.",
    en: "In France, speed limits and signs are very important.",
    fr: "En France, les limitations et panneaux sont essentiels.",
  }, {
    vi: "Quá tốc độ gây phạt và làm giảm thời gian phản ứng.",
    en: "Speeding brings penalties and reduces reaction time.",
    fr: "L'excès de vitesse sanctionne et réduit le temps de réaction.",
  }, {
    vi: "Đọc biển và chọn tốc độ thấp hơn nếu tình huống khó.",
    en: "Read signs and choose lower speed if conditions are difficult.",
    fr: "Lire les panneaux et réduire si la situation est difficile.",
  }),
  c("markings", {
    vi: "Ở Việt Nam, vạch đường đôi khi ít được tôn trọng hơn.",
    en: "Road markings may sometimes be followed less strictly in Vietnam.",
    fr: "Les marquages peuvent être moins strictement suivis au Vietnam.",
  }, {
    vi: "Ở Pháp, vạch liền, mũi tên và làn rẽ có giá trị rõ ràng.",
    en: "In France, solid lines, arrows and turn lanes matter.",
    fr: "En France, lignes continues, flèches et voies de direction comptent.",
  }, {
    vi: "Cắt vạch sai có thể gây nguy hiểm và bị phạt.",
    en: "Crossing incorrectly can be dangerous and penalized.",
    fr: "Franchir mal peut être dangereux et sanctionné.",
  }, {
    vi: "Nhìn mặt đường như nhìn biển báo.",
    en: "Read the road surface like signs.",
    fr: "Lire le sol comme les panneaux.",
  }),
  c("bus-lanes", {
    vi: "Có thể quen đi vào khoảng trống nếu đường đông.",
    en: "You may be used to using available space in dense traffic.",
    fr: "On peut être habitué à utiliser l'espace libre dans le trafic.",
  }, {
    vi: "Ở Pháp, làn bus thường bị cấm cho xe thường.",
    en: "In France, bus lanes are often forbidden to normal cars.",
    fr: "En France, les voies bus sont souvent interdites aux voitures.",
  }, {
    vi: "Đi vào làn bus có thể bị phạt và nguy hiểm khi bus tới.",
    en: "Entering a bus lane can be fined and dangerous when a bus arrives.",
    fr: "Entrer en voie bus peut être sanctionné et dangereux.",
  }, {
    vi: "Không vào nếu biển không cho phép rõ ràng.",
    en: "Do not enter unless signs clearly allow it.",
    fr: "Ne pas entrer sans autorisation claire.",
  }),
  c("crossings", {
    vi: "Người đi bộ có thể qua đường ngoài vạch ở Việt Nam.",
    en: "Pedestrians may cross outside marked crossings in Vietnam.",
    fr: "Les piétons peuvent traverser hors passage au Vietnam.",
  }, {
    vi: "Ở Pháp, vạch qua đường là điểm phải quan sát đặc biệt.",
    en: "In France, crossings are high-attention points.",
    fr: "En France, les passages piétons sont des points de vigilance.",
  }, {
    vi: "Không giảm tốc trước vạch có thể quá muộn để dừng.",
    en: "Not slowing before a crossing may leave no time to stop.",
    fr: "Ne pas ralentir avant peut empêcher l'arrêt.",
  }, {
    vi: "Mỗi vạch qua đường = chuẩn bị phanh.",
    en: "Every crossing = prepare to brake.",
    fr: "Chaque passage = pied prêt au frein.",
  }),
  c("exam", {
    vi: "Lái thực tế ở Việt Nam có thể chấp nhận nhiều cách xử lý.",
    en: "Real traffic in Vietnam may tolerate many driving styles.",
    fr: "La circulation réelle au Vietnam peut tolérer plusieurs styles.",
  }, {
    vi: "Ở Pháp, giám khảo muốn thấy quy trình an toàn rõ ràng.",
    en: "In France, examiners expect visible safe procedure.",
    fr: "En France, l'inspecteur attend une méthode visible et sûre.",
  }, {
    vi: "Nếu không kiểm tra gương/góc chết rõ, có thể bị coi là nguy hiểm.",
    en: "If mirror/blind-spot checks are not clear, it can be judged unsafe.",
    fr: "Des contrôles invisibles peuvent être jugés insuffisants.",
  }, {
    vi: "Làm kiểm tra rõ ràng nhưng không phóng đại.",
    en: "Make checks clear but not exaggerated.",
    fr: "Faire des contrôles visibles sans exagérer.",
  }),
  c("defensive", {
    vi: "Ở môi trường đông, có thể quen chen nhẹ để tiến lên.",
    en: "In dense traffic, you may be used to gently pushing forward.",
    fr: "Dans le trafic dense, on peut être habitué à s'imposer doucement.",
  }, {
    vi: "Ở Pháp, lái phòng thủ và giữ khoảng trống được đánh giá cao.",
    en: "In France, defensive driving and space are valued.",
    fr: "En France, la conduite défensive et l'espace sont valorisés.",
  }, {
    vi: "Chen sai lúc có thể gây xung đột hoặc lỗi ưu tiên.",
    en: "Pushing at the wrong time can create conflict or priority errors.",
    fr: "S'imposer au mauvais moment crée conflit ou refus de priorité.",
  }, {
    vi: "Nếu không chắc, chờ thêm một chút.",
    en: "If unsure, wait a little longer.",
    fr: "Si doute, attendre un peu plus.",
  }),
];
