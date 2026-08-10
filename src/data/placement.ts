import type { PlacementQuestion } from "@/lib/types";

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: "p1",
    type: "multiple-choice",
    level: "A1",
    skill: "vocabulary",
    questionHy: "«Bonjour» նշանակում է՝",
    options: ["Բարև ձեզ", "Ցտեսություն", "Խնդրեմ", "Խնդրում եմ"],
    correctAnswer: "Բարև ձեզ",
    explanationHy: "Bonjour = Բարև ձեզ։",
  },
  {
    id: "p2",
    type: "multiple-choice",
    level: "A1",
    skill: "grammar",
    questionHy: "Ընտրե՛ք ճիշտ ձևը․ Je ___ étudiant.",
    options: ["suis", "es", "sont", "avons"],
    correctAnswer: "suis",
    explanationHy: "Être բայի je ձևը՝ suis։",
  },
  {
    id: "p3",
    type: "listen-choose",
    level: "A1",
    skill: "listening",
    questionHy: "Լսե՛ք և ընտրե՛ք։",
    audioText: "Merci beaucoup",
    options: ["Merci beaucoup", "Bonsoir", "Au revoir", "Pardon"],
    correctAnswer: "Merci beaucoup",
    explanationHy: "Լսել եք շնորհակալություն։",
  },
  {
    id: "p4",
    type: "multiple-choice",
    level: "A1",
    skill: "translation",
    questionHy: "Ինչպե՞ս ասել «Շնորհակալություն» ֆրանսերեն։",
    options: ["Merci", "Pardon", "Salut", "Oui"],
    correctAnswer: "Merci",
    explanationHy: "Merci = Շնորհակալություն։",
  },
  {
    id: "p5",
    type: "fill-blank",
    level: "A1",
    skill: "grammar",
    questionHy: "Լրացրե՛ք․ ___ livre (արական որոշակի հոդ)",
    promptFr: "___ livre",
    correctAnswer: "Le",
    explanationHy: "Արական որոշակի հոդը՝ Le։",
  },
  {
    id: "p6",
    type: "multiple-choice",
    level: "A1",
    skill: "reading",
    questionHy: "«Comment ça va ?» նշանակում է՝",
    options: ["Ինչպե՞ս եք", "Որտե՞ղ եք", "Ո՞վ եք", "Ինչո՞ւ"],
    correctAnswer: "Ինչպե՞ս եք",
    explanationHy: "Comment ça va ? = Ինչպե՞ս եք։",
  },
  {
    id: "p7",
    type: "multiple-choice",
    level: "A2",
    skill: "grammar",
    questionHy: "Hier, j'___ mangé une pomme.",
    options: ["ai", "suis", "avoir", "est"],
    correctAnswer: "ai",
    explanationHy: "Passé composé՝ j'ai mangé։",
  },
  {
    id: "p8",
    type: "multiple-choice",
    level: "A2",
    skill: "vocabulary",
    questionHy: "«Demain» նշանակում է՝",
    options: ["Վաղը", "Երեկ", "Այսօր", "Հիմա"],
    correctAnswer: "Վաղը",
    explanationHy: "Demain = վաղը։",
  },
  {
    id: "p9",
    type: "listen-choose",
    level: "A2",
    skill: "listening",
    questionHy: "Ի՞նչ եք լսում։",
    audioText: "Je vais au marché demain.",
    options: [
      "Je vais au marché demain.",
      "J'ai mangé une pizza.",
      "Bonjour madame.",
      "Il fait beau.",
    ],
    correctAnswer: "Je vais au marché demain.",
    explanationHy: "Նախադասությունը մոտ ապագայի մասին է։",
  },
  {
    id: "p10",
    type: "multiple-choice",
    level: "A2",
    skill: "grammar",
    questionHy: "Elle ___ allée à Lyon.",
    options: ["est", "a", "sont", "ont"],
    correctAnswer: "est",
    explanationHy: "Aller-ը conjugé է être-ով։",
  },
  {
    id: "p11",
    type: "translate",
    level: "A2",
    skill: "translation",
    questionHy: "Թարգմանե՛ք․ «Ես պատրաստվում եմ սովորել։»",
    correctAnswer: "Je vais étudier",
    explanationHy: "Futur proche․ Je vais étudier.",
  },
  {
    id: "p12",
    type: "multiple-choice",
    level: "A2",
    skill: "reading",
    questionHy: "«Combien ça coûte ?» նշանակում է՝",
    options: ["Որքա՞ն արժե", "Որտե՞ղ է", "Ե՞րբ է", "Ո՞վ է"],
    correctAnswer: "Որքա՞ն արժե",
    explanationHy: "Combien ça coûte ? = Որքա՞ն արժե։",
  },
  {
    id: "p13",
    type: "multiple-choice",
    level: "B1",
    skill: "grammar",
    questionHy: "Il faut que tu ___.",
    options: ["viennes", "viens", "venir", "viendra"],
    correctAnswer: "viennes",
    explanationHy: "Il faut que + subjonctif․ viennes։",
  },
  {
    id: "p14",
    type: "multiple-choice",
    level: "B1",
    skill: "vocabulary",
    questionHy: "«À mon avis» նշանակում է՝",
    options: ["Իմ կարծիքով", "Հետևաբար", "Չնայած", "Միգուցե"],
    correctAnswer: "Իմ կարծիքով",
    explanationHy: "À mon avis = իմ կարծիքով։",
  },
  {
    id: "p15",
    type: "multiple-choice",
    level: "B1",
    skill: "grammar",
    questionHy: "Քաղաքավարի խնդրանք․ Je ___ un café.",
    options: ["voudrais", "veux", "voudra", "vouloir"],
    correctAnswer: "voudrais",
    explanationHy: "Conditionnel․ Je voudrais…",
  },
  {
    id: "p16",
    type: "listen-choose",
    level: "B1",
    skill: "listening",
    questionHy: "Լսե՛ք և ընտրե՛ք իմաստը։",
    audioText: "Je pense que c'est une bonne idée.",
    options: [
      "Կարծում եմ՝ սա լավ գաղափար է",
      "Ես ուզում եմ սուրճ",
      "Ես հոգնած եմ",
      "Վաղը կգամ",
    ],
    correctAnswer: "Կարծում եմ՝ սա լավ գաղափար է",
    explanationHy: "Je pense que… = Կարծում եմ, որ…",
  },
  {
    id: "p17",
    type: "multiple-choice",
    level: "B2",
    skill: "vocabulary",
    questionHy: "«Néanmoins» նշանակում է՝",
    options: ["Այնուամենայնիվ", "Ուրեմն", "Քանի որ", "Նախքան"],
    correctAnswer: "Այնուամենայնիվ",
    explanationHy: "Néanmoins = այնուամենայնիվ։",
  },
  {
    id: "p18",
    type: "multiple-choice",
    level: "B2",
    skill: "grammar",
    questionHy: "Il dit : « Je suis prêt. » → Il dit qu'il ___ prêt.",
    options: ["est", "était", "sera", "soit"],
    correctAnswer: "est",
    explanationHy: "Ներկայում discours rapporté․ présent → présent։",
  },
  {
    id: "p19",
    type: "multiple-choice",
    level: "B2",
    skill: "reading",
    questionHy: "«Il convient de réfléchir» նշանակում է՝",
    options: ["Պետք է մտածել", "Ես ուզում եմ գնալ", "Սա հեշտ է", "Շնորհակալություն"],
    correctAnswer: "Պետք է մտածել",
    explanationHy: "Il convient de = պատշաճ է / պետք է։",
  },
  {
    id: "p20",
    type: "fill-blank",
    level: "B2",
    skill: "grammar",
    questionHy: "Par ___, nous partons. (հետևաբար)",
    promptFr: "Par ___, nous partons.",
    correctAnswer: "conséquent",
    explanationHy: "Par conséquent = հետևաբար։",
  },
];

export function scorePlacement(answers: Record<string, string>): {
  level: "A1" | "A2" | "B1" | "B2";
  score: number;
  strengths: string[];
  weaknesses: string[];
  bySkill: Record<string, { correct: number; total: number }>;
} {
  let correct = 0;
  const bySkill: Record<string, { correct: number; total: number }> = {};
  const byLevel: Record<string, { correct: number; total: number }> = {
    A1: { correct: 0, total: 0 },
    A2: { correct: 0, total: 0 },
    B1: { correct: 0, total: 0 },
    B2: { correct: 0, total: 0 },
  };

  for (const q of PLACEMENT_QUESTIONS) {
    if (!bySkill[q.skill]) bySkill[q.skill] = { correct: 0, total: 0 };
    bySkill[q.skill].total++;
    byLevel[q.level].total++;

    const ans = (answers[q.id] || "").trim();
    const ok =
      ans.toLowerCase() === q.correctAnswer.toLowerCase() ||
      ans.toLowerCase().includes(q.correctAnswer.toLowerCase());

    if (ok) {
      correct++;
      bySkill[q.skill].correct++;
      byLevel[q.level].correct++;
    }
  }

  const skillNames: Record<string, string> = {
    vocabulary: "Բառապաշար",
    grammar: "Քերականություն",
    reading: "Ընթերցանություն",
    listening: "Լսել",
    translation: "Թարգմանություն",
  };

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  for (const [skill, data] of Object.entries(bySkill)) {
    const pct = data.total ? data.correct / data.total : 0;
    if (pct >= 0.7) strengths.push(skillNames[skill] || skill);
    else if (pct < 0.5) weaknesses.push(skillNames[skill] || skill);
  }
  if (!strengths.length) strengths.push("Հիմնական բառապաշար");
  if (!weaknesses.length) weaknesses.push("Խորացված քերականություն");

  let level: "A1" | "A2" | "B1" | "B2" = "A1";
  const a1pct = byLevel.A1.correct / byLevel.A1.total;
  const a2pct = byLevel.A2.correct / byLevel.A2.total;
  const b1pct = byLevel.B1.correct / byLevel.B1.total;
  const b2pct = byLevel.B2.correct / byLevel.B2.total;

  if (a1pct >= 0.6 && a2pct >= 0.6 && b1pct >= 0.5 && b2pct >= 0.5) level = "B2";
  else if (a1pct >= 0.6 && a2pct >= 0.6 && b1pct >= 0.5) level = "B1";
  else if (a1pct >= 0.7 && a2pct >= 0.5) level = "A2";
  else level = "A1";

  return {
    level,
    score: Math.round((correct / PLACEMENT_QUESTIONS.length) * 100),
    strengths,
    weaknesses,
    bySkill,
  };
}
