import type { DayLesson, Level, WeeklyTestSection } from "@/lib/types";

const mondayA1: DayLesson = {
  day: "monday",
  dayLabelHy: "Երկուշաբթի",
  dayLabelFr: "Lundi",
  type: "vocabulary",
  themeFr: "Jour 1 : Saluer et se présenter",
  themeHy: "1-ին օր․ Ողջունել և ներկայանալ",
  level: "A1",
  expressions: [
    { french: "Bonjour", armenian: "Բարև ձեզ", pronunciation: "բոնժուր", exampleFr: "Bonjour, madame Dupont.", exampleHy: "Բարև ձեզ, տիկին Դյուպոն։" },
    { french: "Salut", armenian: "Բարև — ընկերական տարբերակ", pronunciation: "սալյու", exampleFr: "Salut, ça va ?", exampleHy: "Բարև, ինչպե՞ս ես։" },
    { french: "Moi, c'est…", armenian: "Ես… եմ / Իմ անունն է…", pronunciation: "մուա սե", exampleFr: "Moi, c'est Anna.", exampleHy: "Ես Աննան եմ։" },
    { french: "Enchanté(e)", armenian: "Շատ հաճելի է", pronunciation: "անշանթե", exampleFr: "Enchanté de vous rencontrer.", exampleHy: "Շատ հաճելի է ձեզ հանդիպել։" },
    { french: "Comment vous appelez-vous ?", armenian: "Ի՞նչ է ձեր անունը", pronunciation: "կոման վուզ ապլե վու", exampleFr: "Comment vous appelez-vous ?", exampleHy: "Ի՞նչ է ձեր անունը։" },
  ],
  rule: "Օգտագործեք «Bonjour» աշխատանքում կամ պաշտոնական տեղերում, իսկ «Salut»՝ միայն ընկերների հետ։",
  exercises: [
    {
      id: "mon-e1",
      type: "multiple-choice",
      questionHy: "Պաշտոնական ողջույնը ո՞րն է։",
      options: ["Salut", "Bonjour", "Ciao"],
      correctAnswer: "Bonjour",
      explanationHy: "«Bonjour»-ը պաշտոնական և ունիվերսալ ողջույն է։",
    },
    {
      id: "mon-e2",
      type: "match",
      questionHy: "Համապատասխանեցրե՛ք",
      pairs: [
        { left: "Bonjour", right: "Բարև ձեզ" },
        { left: "Salut", right: "Բարև (ընկերական)" },
        { left: "Enchanté", right: "Շատ հաճելի է" },
      ],
      correctAnswer: "matched",
      explanationHy: "Լավ է, բառապաշարը ճիշտ է համապատասխանեցված։",
    },
    {
      id: "mon-e3",
      type: "listen-choose",
      questionHy: "Ի՞նչ եք լսում։",
      audioText: "Bonjour, moi c'est Anna.",
      options: ["Bonjour, moi c'est Anna.", "Salut, ça va ?", "Au revoir !"],
      correctAnswer: "Bonjour, moi c'est Anna.",
      explanationHy: "Լսել եք ներկայացման արտահայտություն։",
    },
  ],
};

const wednesdayA1: DayLesson = {
  day: "wednesday",
  dayLabelHy: "Չորեքշաբթի",
  dayLabelFr: "Mercredi",
  type: "conversation",
  themeFr: "Jour 2 : Demander des nouvelles",
  themeHy: "2-րդ օր․ Վիճակի հարցում",
  level: "A1",
  expressions: [
    { french: "Comment ça va ?", armenian: "Ինչպե՞ս եք / Ինչպե՞ս է գործերդ", pronunciation: "կոման սա վա", exampleFr: "Salut ! Comment ça va ?", exampleHy: "Բարև։ Ինչպե՞ս ես։" },
    { french: "Ça va bien, merci.", armenian: "Լավ եմ, շնորհակալություն", pronunciation: "սա վա բյեն մերսի", exampleFr: "Ça va bien, merci. Et toi ?", exampleHy: "Լավ եմ, շնորհակալություն։ Իսկ դո՞ւ։" },
    { french: "Et vous ?", armenian: "Իսկ դուք՞", pronunciation: "ե վու", exampleFr: "Ça va bien, et vous ?", exampleHy: "Լավ եմ, իսկ դո՞ւք։" },
    { french: "Et toi ?", armenian: "Իսկ դու՞", pronunciation: "ե տուա", exampleFr: "Ça va, et toi ?", exampleHy: "Լավ եմ, իսկ դո՞ւ։" },
    { french: "Ça va comme ci, comme ça.", armenian: "Այսպես-այնպես", pronunciation: "սա վա կոմ սի կոմ սա", exampleFr: "Ça va comme ci, comme ça.", exampleHy: "Այսպես-այնպես է։" },
  ],
  rule: "Օգտագործեք «Et vous ?» աշխատավայրում կամ պաշտոնական շփման ժամանակ (հարգանքով «դուք»), իսկ «Et toi ?»՝ միայն մտերիմների հետ։",
  exercises: [
    {
      id: "wed-e1",
      type: "multiple-choice",
      questionHy: "Պաշտոնական իրավիճակում ի՞նչ կասեք։",
      options: ["Et toi ?", "Et vous ?", "Salut toi"],
      correctAnswer: "Et vous ?",
      explanationHy: "Պաշտոնական շփման ժամանակ՝ Et vous ?",
    },
    {
      id: "wed-e2",
      type: "listen-choose",
      questionHy: "Լսե՛ք և ընտրե՛ք ճիշտ պատասխանը։",
      audioText: "Comment ça va ?",
      options: ["Ça va bien, merci.", "Bonjour.", "Au revoir."],
      correctAnswer: "Ça va bien, merci.",
      explanationHy: "«Comment ça va ?»-ին պատասխանում ենք վիճակով։",
    },
    {
      id: "wed-e3",
      type: "translate",
      questionHy: "Թարգմանե՛ք ֆրանսերեն․ «Լավ եմ, շնորհակալություն։»",
      correctAnswer: "Ça va bien, merci",
      explanationHy: "Ça va bien, merci.",
    },
  ],
};

const fridayA1: DayLesson = {
  day: "friday",
  dayLabelHy: "Ուրբաթ",
  dayLabelFr: "Vendredi",
  type: "vocabulary",
  themeFr: "Jour 3 : Dire merci, s'excuser et réagir poliment",
  themeHy: "3-րդ օր․ Շնորհակալություն և ներողություն",
  level: "A1",
  expressions: [
    { french: "Merci (beaucoup)", armenian: "Շնորհակալություն (շատ)", pronunciation: "մերսի բոկու", exampleFr: "Merci beaucoup pour votre aide.", exampleHy: "Շատ շնորհակալություն ձեր օգնության համար։" },
    { french: "De rien / Avec plaisir", armenian: "Խնդրեմ / Սիրով", pronunciation: "դը ռյեն / ավեկ պլեզիր", exampleFr: "De rien, monsieur.", exampleHy: "Խնդրեմ, պարոն։" },
    { french: "Pardon / Désolé(e)", armenian: "Ներողություն / ներողություն եմ խնդրում", pronunciation: "պարդոն / դեզոլե", exampleFr: "Pardon, je suis en retard.", exampleHy: "Ներողություն, ես ուշացել եմ։" },
    { french: "Je vous en prie", armenian: "Խնդրեմ (պաշտոնական)", pronunciation: "ժը վուզ ան պրի", exampleFr: "Je vous en prie.", exampleHy: "Խնդրեմ։" },
  ],
  rule: "Օգտագործեք «Désolé»-ն, եթե տղամարդ եք, և «Désolée»-ն՝ եթե կին եք։",
  exercises: [
    {
      id: "fri-e1",
      type: "multiple-choice",
      questionHy: "Ինչպե՞ս պատասխանել «Merci»-ին։",
      options: ["De rien", "Bonjour", "Au revoir"],
      correctAnswer: "De rien",
      explanationHy: "«De rien» կամ «Avec plaisir» նշանակում է «խնդրեմ»։",
    },
    {
      id: "fri-e2",
      type: "fill-blank",
      questionHy: "Լրացրե՛ք․ ___, je suis en retard.",
      promptFr: "___, je suis en retard.",
      correctAnswer: "Pardon",
      explanationHy: "Ուշանալիս ասում ենք Pardon կամ Désolé(e)։",
    },
    {
      id: "fri-e3",
      type: "listen-choose",
      questionHy: "Ի՞նչ եք լսում։",
      audioText: "Merci beaucoup pour votre aide.",
      options: [
        "Merci beaucoup pour votre aide.",
        "Comment ça va ?",
        "Moi, c'est Anna.",
      ],
      correctAnswer: "Merci beaucoup pour votre aide.",
      explanationHy: "Սա շնորհակալության արտահայտություն է։",
    },
  ],
};

function grammarDay(
  day: DayLesson["day"],
  dayLabelHy: string,
  dayLabelFr: string,
  level: Level,
  grammarId: string,
  themeFr: string,
  themeHy: string
): DayLesson {
  return {
    day,
    dayLabelHy,
    dayLabelFr,
    type: "grammar",
    themeFr,
    themeHy,
    level,
    grammarId,
  };
}

const sundayTest: DayLesson = {
  day: "sunday",
  dayLabelHy: "Կիրակի",
  dayLabelFr: "Dimanche",
  type: "weekly-test",
  themeFr: "Test hebdomadaire",
  themeHy: "Շաբաթվա թեստ",
  level: "A1",
};

function buildWeek(level: Level): DayLesson[] {
  const grammarMap: Record<Level, [string, string, string]> = {
    A1: ["a1-pronoms", "a1-etre", "a1-er-verbs"],
    A2: ["a1-articles", "a1-questions", "a1-aller"],
    B1: ["a1-negation", "a1-ir-verbs", "a1-irregular"],
    B2: ["a1-irregular", "a1-aller", "a1-questions"],
  };
  const [g1, g2, g3] = grammarMap[level];

  const mon =
    level === "A1"
      ? mondayA1
      : {
          ...mondayA1,
          level,
          themeFr:
            level === "A2"
              ? "Jour 1 : Parler de sa routine"
              : level === "B1"
                ? "Jour 1 : Exprimer son opinion"
                : "Jour 1 : Argumenter avec nuance",
          themeHy:
            level === "A2"
              ? "1-ին օր․ Առօրյա ռեժիմ"
              : level === "B1"
                ? "1-ին օր․ Կարծիք հայտնել"
                : "1-ին օր․ Նրբերանգներով փաստարկել",
          expressions:
            level === "A2"
              ? [
                  { french: "Je me lève à…", armenian: "Ես վեր եմ կենում…-ին", exampleFr: "Je me lève à 7 heures.", exampleHy: "Ես վեր եմ կենում ժամը 7-ին։" },
                  { french: "Ensuite", armenian: "Այնուհետև", exampleFr: "Ensuite, je prends mon café.", exampleHy: "Այնուհետև սուրճ եմ խմում։" },
                  { french: "D'habitude", armenian: "Սովորաբար", exampleFr: "D'habitude, je marche.", exampleHy: "Սովորաբար ես քայլում եմ։" },
                ]
              : level === "B1"
                ? [
                    { french: "À mon avis", armenian: "Իմ կարծիքով", exampleFr: "À mon avis, c'est utile.", exampleHy: "Իմ կարծիքով սա օգտակար է։" },
                    { french: "Je pense que…", armenian: "Կարծում եմ, որ…", exampleFr: "Je pense que tu as raison.", exampleHy: "Կարծում եմ՝ դու ճիշտ ես։" },
                    { french: "Selon moi", armenian: "Ըստ իս", exampleFr: "Selon moi, il faut essayer.", exampleHy: "Ըստ իս՝ պետք է փորձել։" },
                  ]
                : [
                    { french: "Il convient de noter que…", armenian: "Հարկ է նշել, որ…", exampleFr: "Il convient de noter que c'est complexe.", exampleHy: "Հարկ է նշել, որ սա բարդ է։" },
                    { french: "En revanche", armenian: "Ի հակառակը", exampleFr: "En revanche, les résultats sont bons.", exampleHy: "Ի հակառակը՝ արդյունքները լավ են։" },
                    { french: "Néanmoins", armenian: "Այնուամենայնիվ", exampleFr: "Néanmoins, je reste optimiste.", exampleHy: "Այնուամենայնիվ՝ ես լավատես եմ։" },
                  ],
        };

  const wed =
    level === "A1"
      ? wednesdayA1
      : { ...wednesdayA1, level };

  const fri =
    level === "A1"
      ? fridayA1
      : { ...fridayA1, level };

  return [
    { ...mon, level },
    grammarDay("tuesday", "Երեքշաբթի", "Mardi", level, g1, "Grammaire", "Քերականություն"),
    { ...wed, level },
    grammarDay("thursday", "Հինգշաբթի", "Jeudi", level, g2, "Grammaire", "Քերականություն"),
    { ...fri, level },
    grammarDay("saturday", "Շաբաթ", "Samedi", level, g3, "Grammaire — révision", "Քերականություն — կրկնություն"),
    { ...sundayTest, level },
  ];
}

export const WEEKLY_SCHEDULE: Record<Level, DayLesson[]> = {
  A1: buildWeek("A1"),
  A2: buildWeek("A2"),
  B1: buildWeek("B1"),
  B2: buildWeek("B2"),
};

export function getWeeklySchedule(level: Level): DayLesson[] {
  return WEEKLY_SCHEDULE[level];
}

export function getDayLesson(level: Level, day: string): DayLesson | undefined {
  return WEEKLY_SCHEDULE[level].find((d) => d.day === day);
}

export const WEEKLY_TEST_A1: WeeklyTestSection[] = [
  {
    id: "vocab",
    titleHy: "Բառապաշար",
    skill: "vocabulary",
    exercises: [
      {
        id: "wt-v1",
        type: "multiple-choice",
        questionHy: "«Bonjour» նշանակում է՝",
        options: ["Ցտեսություն", "Բարև ձեզ", "Շնորհակալություն"],
        correctAnswer: "Բարև ձեզ",
        explanationHy: "Bonjour = Բարև ձեզ։",
      },
      {
        id: "wt-v2",
        type: "multiple-choice",
        questionHy: "Ընկերական ողջույնը՝",
        options: ["Bonjour", "Salut", "Monsieur"],
        correctAnswer: "Salut",
        explanationHy: "Salut-ը ընկերական է։",
      },
    ],
  },
  {
    id: "grammar",
    titleHy: "Քերականություն",
    skill: "grammar",
    exercises: [
      {
        id: "wt-g1",
        type: "multiple-choice",
        questionHy: "Je ___ français.",
        options: ["parle", "parles", "parlons"],
        correctAnswer: "parle",
        explanationHy: "Je + -e → parle։",
      },
      {
        id: "wt-g2",
        type: "multiple-choice",
        questionHy: "___ maison est belle.",
        options: ["Le", "La", "Les"],
        correctAnswer: "La",
        explanationHy: "Maison-ը իգական է։",
      },
    ],
  },
  {
    id: "listening",
    titleHy: "Լսել",
    skill: "listening",
    exercises: [
      {
        id: "wt-l1",
        type: "listen-choose",
        questionHy: "Ի՞նչ եք լսում։",
        audioText: "Comment ça va ?",
        options: ["Comment ça va ?", "Bonjour", "Merci"],
        correctAnswer: "Comment ça va ?",
        explanationHy: "Լսել եք վիճակի հարցում։",
      },
    ],
  },
  {
    id: "reading",
    titleHy: "Ընթերցանություն",
    skill: "reading",
    exercises: [
      {
        id: "wt-r1",
        type: "multiple-choice",
        questionHy: "«Moi, c'est Anna.» ի՞նչ է նշանակում։",
        options: ["Ես Աննան եմ", "Ինչպե՞ս ես", "Շնորհակալություն"],
        correctAnswer: "Ես Աննան եմ",
        explanationHy: "Moi, c'est… = Ես… եմ։",
      },
    ],
  },
  {
    id: "dictation",
    titleHy: "Թելադրություն",
    skill: "dictation",
    exercises: [
      {
        id: "wt-d1",
        type: "dictation",
        questionHy: "Լսե՛ք և գրե՛ք այն, ինչ լսում եք։",
        audioText: "Bonjour, comment ça va ?",
        correctAnswer: "Bonjour, comment ça va ?",
        explanationHy: "Ստուգե՛ք շեշտանիշները և կետադրությունը։",
      },
    ],
  },
  {
    id: "speaking",
    titleHy: "Խոսել",
    skill: "speaking",
    exercises: [
      {
        id: "wt-s1",
        type: "speaking",
        questionHy: "Ներկայացրե՛ք ձեզ ֆրանսերեն։",
        promptFr: "Présentez-vous.",
        correctAnswer: "Je m'appelle",
        explanationHy: "Օգտագործեք Je m'appelle… կամ Moi, c'est…",
      },
    ],
  },
];
