import type { Level, LevelInfo } from "@/lib/types";

export const LEVELS: LevelInfo[] = [
  {
    id: "A1",
    titleHy: "Սկսնակ",
    titleFr: "Débutant",
    description:
      "Հիմնական ողջույններ, ներկայացում, պարզ նախադասություններ և առօրյա բառապաշար։",
    difficulty: 1,
    difficultyLabel: "Հեշտ",
    lessonsCount: 48,
    color: "#C7E0E7",
  },
  {
    id: "A2",
    titleHy: "Տարրական",
    titleFr: "Élémentaire",
    description:
      "Առօրյա խոսակցություններ, անցյալ ժամանակներ, ուղևորություն և սովորական իրավիճակներ։",
    difficulty: 2,
    difficultyLabel: "Միջին",
    lessonsCount: 56,
    color: "#C7E0E7",
  },
  {
    id: "B1",
    titleHy: "Միջին",
    titleFr: "Intermédiaire",
    description:
      "Ավելի բարդ քերականություն, կարծիք հայտնելը, պատմություններ և ինքնավստահ խոսակցություն։",
    difficulty: 3,
    difficultyLabel: "Դժվար",
    lessonsCount: 64,
    color: "#C7E0E7",
  },
  {
    id: "B2",
    titleHy: "Վերին միջին",
    titleFr: "Intermédiaire supérieur",
    description:
      "Հարուստ բառապաշար, նրբերանգներ, վիճարկում, պաշտոնական և ոչ պաշտոնական ոճեր։",
    difficulty: 4,
    difficultyLabel: "Շատ դժվար",
    lessonsCount: 72,
    color: "#C7E0E7",
  },
];

export function getLevelInfo(level: Level): LevelInfo {
  return LEVELS.find((l) => l.id === level)!;
}
