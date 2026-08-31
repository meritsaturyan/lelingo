import type { DayLesson, MonthWeek } from "@/lib/types";
import { mondayA1Expressions, wednesdayA1Expressions, fridayA1Expressions } from "./weekly-a1-vocab";

function g(
  id: string,
  week: number,
  dayLabelHy: string,
  grammarId: string,
  themeHy: string,
  themeFr: string
): DayLesson {
  return {
    id,
    week,
    day: id,
    dayLabelHy,
    dayLabelFr: `Semaine ${week}`,
    type: "grammar",
    themeFr,
    themeHy,
    level: "A1",
    grammarId,
  };
}

function vocabDay(
  id: string,
  week: number,
  dayLabelHy: string,
  themeFr: string,
  themeHy: string,
  expressions: DayLesson["expressions"],
  rule: string,
  exercises: DayLesson["exercises"]
): DayLesson {
  return {
    id,
    week,
    day: id,
    dayLabelHy,
    dayLabelFr: `Semaine ${week}`,
    type: "vocabulary",
    themeFr,
    themeHy,
    level: "A1",
    expressions,
    rule,
    exercises,
  };
}

export const A1_MONTH: MonthWeek[] = [
  {
    week: 1,
    titleHy: "Շաբաթ 1 · Հիմքեր",
    titleFr: "Semaine 1 — Bases",
    lessons: [
      {
        id: "w1-alphabet",
        week: 1,
        day: "w1-alphabet",
        dayLabelHy: "Օր 1",
        dayLabelFr: "Jour 1",
        type: "alphabet",
        themeFr: "Alphabets",
        themeHy: "Ֆրանսերեն այբուբեն",
        level: "A1",
      },
      {
        id: "w1-combinations",
        week: 1,
        day: "w1-combinations",
        dayLabelHy: "Օր 2",
        dayLabelFr: "Jour 2",
        type: "combinations",
        themeFr: "Combinaisons de lettres",
        themeHy: "Տառային համակցություններ",
        level: "A1",
      },
      vocabDay(
        "w1-greetings",
        1,
        "Օր 3",
        "Saluer et se présenter",
        "Ողջունել և ներկայանալ",
        mondayA1Expressions,
        "Օգտագործեք «Bonjour» պաշտոնական տեղերում, «Salut»՝ ընկերների հետ։",
        [
          {
            id: "w1g-e1",
            type: "multiple-choice",
            questionHy: "Պաշտոնական ողջույնը ո՞րն է։",
            options: ["Salut", "Bonjour", "Ciao"],
            correctAnswer: "Bonjour",
            explanationHy: "«Bonjour»-ը պաշտոնական ողջույն է։",
          },
          {
            id: "w1g-e2",
            type: "match",
            questionHy: "Համապատասխանեցրե՛ք",
            pairs: [
              { left: "Bonjour", right: "Բարև ձեզ" },
              { left: "Salut", right: "Բարև (ընկերական)" },
              { left: "Enchanté", right: "Շատ հաճելի է" },
            ],
            correctAnswer: "matched",
            explanationHy: "Լավ է։",
          },
        ]
      ),
      g("w1-pronoms", 1, "Օր 4", "a1-pronoms", "Անձնական դերանուններ", "Les pronoms personnels"),
      g("w1-etre", 1, "Օր 5", "a1-etre", "« լինել » բայը", "Le verbe être"),
      {
        id: "w1-reading",
        week: 1,
        day: "w1-reading",
        dayLabelHy: "Օր 6",
        dayLabelFr: "Jour 6",
        type: "reading",
        themeFr: "Lecture",
        themeHy: "Ընթերցանություն · Ներկայացում",
        level: "A1",
        readingId: "r1",
      },
      {
        id: "w1-test",
        week: 1,
        day: "w1-test",
        dayLabelHy: "Օր 7",
        dayLabelFr: "Jour 7",
        type: "weekly-test",
        themeFr: "Test semaine 1",
        themeHy: "Շաբաթ 1 · Թեստ",
        level: "A1",
      },
    ],
  },
  {
    week: 2,
    titleHy: "Շաբաթ 2 · Քերականություն",
    titleFr: "Semaine 2 — Grammaire",
    lessons: [
      g("w2-articles", 2, "Օր 8", "a1-articles", "Որոշյալ հոդեր", "Les articles définis"),
      g("w2-negation", 2, "Օր 9", "a1-negation", "Ժխտական ձև", "La négation"),
      g("w2-questions", 2, "Օր 10", "a1-questions", "Հարցական նախադասություն", "Poser une question"),
      vocabDay(
        "w2-news",
        2,
        "Օր 11",
        "Demander des nouvelles",
        "Վիճակի հարցում",
        wednesdayA1Expressions,
        "«Et vous ?»՝ պաշտոնական, «Et toi ?»՝ մտերիմների հետ։",
        [
          {
            id: "w2n-e1",
            type: "multiple-choice",
            questionHy: "Պաշտոնական իրավիճակում ի՞նչ կասեք։",
            options: ["Et toi ?", "Et vous ?", "Salut toi"],
            correctAnswer: "Et vous ?",
            explanationHy: "Պաշտոնական՝ Et vous ?",
          },
        ]
      ),
      vocabDay(
        "w2-family",
        2,
        "Օր 12",
        "La famille",
        "Ընտանիք",
        [
          { french: "La famille", armenian: "Ընտանիք", exampleFr: "J'aime ma famille.", exampleHy: "Ես սիրում եմ իմ ընտանիքը։" },
          { french: "Le père", armenian: "Հայր", exampleFr: "Mon père travaille.", exampleHy: "Իմ հայրը աշխատում է։" },
          { french: "La mère", armenian: "Մայր", exampleFr: "Ma mère cuisine.", exampleHy: "Իմ մայրը պատրաստում է։" },
          { french: "Le frère", armenian: "Եղբայր", exampleFr: "Mon frère a 20 ans.", exampleHy: "Իմ եղբայրը 20 տարեկան է։" },
          { french: "La sœur", armenian: "Քույր", exampleFr: "Ma sœur habite à Lyon.", exampleHy: "Իմ քույրը ապրում է Լիոնում։" },
          { french: "L'enfant", armenian: "Երեխա", exampleFr: "L'enfant joue.", exampleHy: "Երեխան խաղում է։" },
        ],
        "Ընտանիքի անդամների սեռը կարևոր է հոդերի համար։",
        [
          {
            id: "w2f-e1",
            type: "match",
            questionHy: "Համապատասխանեցրե՛ք",
            pairs: [
              { left: "Le père", right: "Հայր" },
              { left: "La mère", right: "Մայր" },
              { left: "La sœur", right: "Քույր" },
            ],
            correctAnswer: "matched",
            explanationHy: "Լավ է։",
          },
        ]
      ),
      {
        id: "w2-reading",
        week: 2,
        day: "w2-reading",
        dayLabelHy: "Օր 13",
        dayLabelFr: "Jour 13",
        type: "reading",
        themeFr: "Lecture — famille",
        themeHy: "Ընթերցանություն · Ընտանիք",
        level: "A1",
        readingId: "r2",
      },
      {
        id: "w2-test",
        week: 2,
        day: "w2-test",
        dayLabelHy: "Օր 14",
        dayLabelFr: "Jour 14",
        type: "weekly-test",
        themeFr: "Test semaine 2",
        themeHy: "Շաբաթ 2 · Թեստ",
        level: "A1",
      },
    ],
  },
  {
    week: 3,
    titleHy: "Շաբաթ 3 · Բայեր և ճանապարհ",
    titleFr: "Semaine 3 — Verbes",
    lessons: [
      g("w3-aller", 3, "Օր 15", "a1-aller", "Գնալ + նախդիրներ", "Aller + destinations"),
      g("w3-er", 3, "Օր 16", "a1-er-verbs", "Առաջին խումբ (-ER)", "1er groupe — -ER"),
      vocabDay(
        "w3-polite",
        3,
        "Օր 17",
        "Merci et s'excuser",
        "Շնորհակալություն և ներողություն",
        fridayA1Expressions,
        "Désolé (տղամարդ) / Désolée (կին)։",
        [
          {
            id: "w3p-e1",
            type: "multiple-choice",
            questionHy: "Ինչպե՞ս պատասխանել «Merci»-ին։",
            options: ["De rien", "Bonjour", "Au revoir"],
            correctAnswer: "De rien",
            explanationHy: "De rien = խնդրեմ։",
          },
        ]
      ),
      vocabDay(
        "w3-time",
        3,
        "Օր 18",
        "Le temps et les moments",
        "Ժամանակ և պահեր",
        [
          { french: "Aujourd'hui", armenian: "Այսօր", exampleFr: "C'est aujourd'hui.", exampleHy: "Դա այսօր է։" },
          { french: "Demain", armenian: "Վաղը", exampleFr: "À demain !", exampleHy: "Մինչ վաղը։" },
          { french: "Hier", armenian: "Երեկ", exampleFr: "Hier, j'ai étudié.", exampleHy: "Երեկ ես սովորել եմ։" },
          { french: "Le matin", armenian: "Առավոտյան", exampleFr: "Le matin, je me lève.", exampleHy: "Առավոտյան վեր եմ կենում։" },
          { french: "L'après-midi", armenian: "Կեսօրից հետո", exampleFr: "L'après-midi, je travaille.", exampleHy: "Կեսօրից հետո աշխատում եմ։" },
          { french: "Le soir", armenian: "Երեկոյան", exampleFr: "Le soir, je lis.", exampleHy: "Երեկոյան կարդում եմ։" },
          { french: "La nuit", armenian: "Գիշերը", exampleFr: "La nuit, je dors.", exampleHy: "Գիշերը քնում եմ։" },
        ],
        "Օգտակար՝ À demain !",
        [
          {
            id: "w3t-e1",
            type: "translate",
            questionHy: "Թարգմանե՛ք․ «Մինչ վաղը։»",
            correctAnswer: "À demain",
            explanationHy: "À demain !",
          },
        ]
      ),
      vocabDay(
        "w3-colors",
        3,
        "Օր 19",
        "Les couleurs",
        "Գույներ",
        [
          { french: "Le bleu", armenian: "Կապույտ", exampleFr: "Bleu clair / bleu foncé", exampleHy: "Բաց / մուգ կապույտ" },
          { french: "Le rouge", armenian: "Կարմիր", exampleFr: "La pomme est rouge.", exampleHy: "Խնձորը կարմիր է։" },
          { french: "Le vert", armenian: "Կանաչ", exampleFr: "L'herbe est verte.", exampleHy: "Խոտը կանաչ է։" },
          { french: "Le jaune", armenian: "Դեղին", exampleFr: "Le soleil est jaune.", exampleHy: "Արևը դեղին է։" },
          { french: "Le blanc", armenian: "Սպիտակ", exampleFr: "La neige est blanche.", exampleHy: "Ձյունը սպիտակ է։" },
          { french: "Le noir", armenian: "Սև", exampleFr: "Le chat est noir.", exampleHy: "Կատուն սև է։" },
          { french: "Le gris", armenian: "Մոխրագույն", exampleFr: "Le ciel est gris.", exampleHy: "Երկինքը մոխրագույն է։" },
          { french: "L'orange", armenian: "Նարնջագույն", exampleFr: "La voiture est orange.", exampleHy: "Մեքենան նարնջագույն է։" },
        ],
        "Clair = բաց, foncé = մուգ։",
        [
          {
            id: "w3c-e1",
            type: "multiple-choice",
            questionHy: "«Կանաչ» ֆրանսերեն՝",
            options: ["Le rouge", "Le vert", "Le bleu"],
            correctAnswer: "Le vert",
            explanationHy: "Le vert = կանաչ։",
          },
        ]
      ),
      {
        id: "w3-reading",
        week: 3,
        day: "w3-reading",
        dayLabelHy: "Օր 20",
        dayLabelFr: "Jour 20",
        type: "reading",
        themeFr: "Lecture — routine",
        themeHy: "Ընթերցանություն · Առօրյա",
        level: "A1",
        readingId: "r3",
      },
      {
        id: "w3-test",
        week: 3,
        day: "w3-test",
        dayLabelHy: "Օր 21",
        dayLabelFr: "Jour 21",
        type: "weekly-test",
        themeFr: "Test semaine 3",
        themeHy: "Շաբաթ 3 · Թեստ",
        level: "A1",
      },
    ],
  },
  {
    week: 4,
    titleHy: "Շաբաթ 4 · Թվեր և 3-րդ խումբ",
    titleFr: "Semaine 4 — Nombres",
    lessons: [
      g("w4-ir", 4, "Օր 22", "a1-ir-verbs", "Երկրորդ խումբ (-IR)", "2e groupe — -IR"),
      g("w4-irr", 4, "Օր 23", "a1-irregular", "Երրորդ խումբ", "3e groupe"),
      vocabDay(
        "w4-num1",
        4,
        "Օր 24",
        "Les chiffres 0–20",
        "Թվեր 0–20",
        [
          { french: "Zéro", armenian: "Զրո (0)" },
          { french: "Un", armenian: "Մեկ (1)" },
          { french: "Deux", armenian: "Երկու (2)" },
          { french: "Trois", armenian: "Երեք (3)" },
          { french: "Quatre", armenian: "Չորս (4)" },
          { french: "Cinq", armenian: "Հինգ (5)" },
          { french: "Six", armenian: "Վեց (6)" },
          { french: "Sept", armenian: "Յոթ (7)" },
          { french: "Huit", armenian: "Ութ (8)" },
          { french: "Neuf", armenian: "Ինը (9)" },
          { french: "Dix", armenian: "Տասը (10)" },
          { french: "Onze", armenian: "Տասնմեկ (11)" },
          { french: "Douze", armenian: "Տասներկու (12)" },
          { french: "Treize", armenian: "Տասներեք (13)" },
          { french: "Quatorze", armenian: "Տասնչորս (14)" },
          { french: "Quinze", armenian: "Տասնհինգ (15)" },
          { french: "Seize", armenian: "Տասնվեց (16)" },
          { french: "Dix-sept", armenian: "Տասնյոթ (17)" },
          { french: "Dix-huit", armenian: "Տասնութ (18)" },
          { french: "Dix-neuf", armenian: "Տասնինը (19)" },
          { french: "Vingt", armenian: "Քսան (20)" },
        ],
        "11–16 ունեն հատուկ ձևեր։",
        [
          {
            id: "w4n1-e1",
            type: "multiple-choice",
            questionHy: "15 ֆրանսերեն՝",
            options: ["Seize", "Quinze", "Quatorze"],
            correctAnswer: "Quinze",
            explanationHy: "Quinze = 15։",
          },
        ]
      ),
      vocabDay(
        "w4-num2",
        4,
        "Օր 25",
        "Les dizaines 30–100",
        "Տասնյակներ 30–100",
        [
          { french: "Trente", armenian: "Երեսուն (30)" },
          { french: "Quarante", armenian: "Քառասուն (40)" },
          { french: "Cinquante", armenian: "Հիսուն (50)" },
          { french: "Soixante", armenian: "Վաթսուն (60)" },
          { french: "Soixante-dix", armenian: "Յոթանասուն (70)" },
          { french: "Quatre-vingts", armenian: "Ութսուն (80)" },
          { french: "Quatre-vingt-dix", armenian: "Իննսուն (90)" },
          { french: "Cent", armenian: "Հարյուր (100)" },
          { french: "Trente et un", armenian: "Երեսունմեկ (31) — et առանց գծիկի" },
          { french: "Soixante-et-onze", armenian: "Յոթանասունմեկ (71)" },
          { french: "Quatre-vingt-un", armenian: "Ութսունմեկ (81)" },
          { french: "Quatre-vingt-onze", armenian: "Իննսունմեկ (91)" },
        ],
        `Երբ թիվը վերջանում է 1-ով (բացի 11-ից), ֆրանսերենում տասնյակի և միավորի միջև դրվում է « et » (և) շաղկապը՝ առանց գծիկների։
Trente et un — Երեսունմեկ (30 և 1)
Quarante et un — Քառասունմեկ (40 և 1)
Cinquante et un — Հիսունմեկ (50 + 1)
Soixante et un — Վաթսունմեկ (60 և 1)

Ուշադրություն. Սա վերաբերում է միայն 1-ին։ 2-ից 9 թվերի դեպքում «et» չի օգտագործվում, այլ դրվում է սովորական գծիկ (-)։
Trente et un (31)
Trente-deux (32)
Trente-trois (33)
…ինչպես նաև մինչև Trente-neuf (39)։

Ֆրանսերենում թվերի կազմությունը 70-ից սկսված ունի առանձնահատկություն. 70-ը կազմվում է «վաթսուն + տասը» (soixante-dix) տրամաբանությամբ, իսկ 80-ը՝ «չորս քսան» (quatre-vingts)։ Իսկ 90-ը՝ «չորս քսան և տասը»։
Soixante-dix — Յոթանասուն (70)
Soixante-et-onze — Յոթանասունմեկ (71)
Quatre-vingts — Ութսուն (80)
Quatre-vingt-un — Ութսունմեկ (81)
Quatre-vingt-dix — Իննսուն (90)
Quatre-vingt-onze — Իննսունմեկ (91)`,
        [
          {
            id: "w4n2-e1",
            type: "multiple-choice",
            questionHy: "70 ֆրանսերեն՝",
            options: ["Soixante-dix", "Septante", "Quatre-vingts"],
            correctAnswer: "Soixante-dix",
            explanationHy: "Ֆրանսիայում՝ soixante-dix։",
          },
          {
            id: "w4n2-e2",
            type: "multiple-choice",
            questionHy: "31 ֆրանսերեն՝",
            options: ["Trente-un", "Trente et un", "Trente un"],
            correctAnswer: "Trente et un",
            explanationHy: "1-ի դեպքում (բացի 11-ից)՝ «et», առանց գծիկի։",
          },
          {
            id: "w4n2-e3",
            type: "multiple-choice",
            questionHy: "80 ֆրանսերեն՝",
            options: ["Huitante", "Quatre-vingts", "Soixante-dix"],
            correctAnswer: "Quatre-vingts",
            explanationHy: "80 = quatre-vingts («չորս քսան»)։",
          },
        ]
      ),
      {
        id: "w4-reading",
        week: 4,
        day: "w4-reading",
        dayLabelHy: "Օր 26",
        dayLabelFr: "Jour 26",
        type: "reading",
        themeFr: "Lecture — voyage",
        themeHy: "Ընթերցանություն · Ճանապարհորդություն",
        level: "A1",
        readingId: "r4",
      },
      {
        id: "w4-review",
        week: 4,
        day: "w4-review",
        dayLabelHy: "Օր 27",
        dayLabelFr: "Jour 27",
        type: "vocabulary",
        themeFr: "Révision du mois",
        themeHy: "Ամսվա կրկնություն",
        level: "A1",
        expressions: [
          { french: "Bonjour", armenian: "Բարև ձեզ" },
          { french: "Je suis", armenian: "Ես եմ" },
          { french: "Je vais à Paris", armenian: "Ես գնում եմ Փարիզ" },
          { french: "Je ne parle pas", armenian: "Ես չեմ խոսում" },
        ],
        rule: "Կրկնե՛ք ամսվա հիմնական արտահայտությունները։",
        exercises: [
          {
            id: "w4r-e1",
            type: "multiple-choice",
            questionHy: "Je ___ français. (être)",
            options: ["suis", "es", "est"],
            correctAnswer: "suis",
            explanationHy: "Je suis…",
          },
        ],
      },
      {
        id: "w4-test",
        week: 4,
        day: "w4-test",
        dayLabelHy: "Օր 28",
        dayLabelFr: "Jour 28",
        type: "weekly-test",
        themeFr: "Test semaine 4",
        themeHy: "Շաբաթ 4 թեստ",
        level: "A1",
      },
    ],
  },
  {
    week: 5,
    titleHy: "Շաբաթ 5 · Հոդեր խորությամբ",
    titleFr: "Semaine 5 — Articles",
    lessons: [
      g("w5-articles-indef", 5, "Օր 29", "a1-articles-indef", "Անորոշ հոդեր", "Les articles indéfinis"),
      g("w5-articles-part", 5, "Օր 30", "a1-articles-part", "Մասնատող հոդեր", "Les articles partitifs"),
      g("w5-articles-neg", 5, "Օր 31", "a1-articles-neg", "Հոդերը ժխտականում", "Articles + négation"),
      g("w5-quantite", 5, "Օր 32", "a1-quantite", "Քանակից հետո", "Après une quantité"),
      {
        id: "w5-reading",
        week: 5,
        day: "w5-reading",
        dayLabelHy: "Օր 33",
        dayLabelFr: "Jour 33",
        type: "reading",
        themeFr: "Lecture — articles",
        themeHy: "Ընթերցանություն · Հոդեր",
        level: "A1",
        readingId: "r2",
      },
      vocabDay(
        "w5-vocab",
        5,
        "Օր 34",
        "Aimer, adorer, détester",
        "Սիրել, պաշտել, ատել",
        [
          { french: "J'aime", armenian: "Ես սիրում եմ", exampleFr: "J'aime le chocolat.", exampleHy: "Ես սիրում եմ շոկոլադը։" },
          { french: "J'adore", armenian: "Ես պաշտում եմ", exampleFr: "J'adore le café.", exampleHy: "Ես պաշտում եմ սուրճը։" },
          { french: "Je déteste", armenian: "Ես ատում եմ", exampleFr: "Je déteste le bruit.", exampleHy: "Ես ատում եմ աղմուկը։" },
          { french: "Je préfère", armenian: "Ես նախընտրում եմ", exampleFr: "Je préfère le thé.", exampleHy: "Ես նախընտրում եմ թեյը։" },
          { french: "J'apprécie", armenian: "Ես գնահատում եմ", exampleFr: "J'apprécie ton aide.", exampleHy: "Ես գնահատում եմ քո օգնությունը։" },
        ],
        "Այս բայերից հետո սովորաբար օգտագործվում է défini (le/la/les)։",
        [
          {
            id: "w5v-e1",
            type: "multiple-choice",
            questionHy: "J'aime ___ chocolat.",
            options: ["du", "le", "un", "de"],
            correctAnswer: "le",
            explanationHy: "Aimer + défini։",
          },
          {
            id: "w5v-e2",
            type: "match",
            questionHy: "Համապատասխանեցրե՛ք",
            pairs: [
              { left: "J'aime", right: "Ես սիրում եմ" },
              { left: "J'adore", right: "Ես պաշտում եմ" },
              { left: "Je déteste", right: "Ես ատում եմ" },
            ],
            correctAnswer: "matched",
            explanationHy: "Լավ է։",
          },
        ]
      ),
      {
        id: "w5-test",
        week: 5,
        day: "w5-test",
        dayLabelHy: "Օր 35",
        dayLabelFr: "Jour 35",
        type: "weekly-test",
        themeFr: "Test semaine 5",
        themeHy: "Շաբաթ 5 · Թեստ",
        level: "A1",
      },
    ],
  },
  {
    week: 6,
    titleHy: "Շաբաթ 6 · Կրճատումներ և 3-րդ խումբ",
    titleFr: "Semaine 6 — Contractions",
    lessons: [
      g("w6-contraction-a", 6, "Օր 36", "a1-contraction-a", "Կրճատումներ՝ à", "Articles contractés avec à"),
      g("w6-contraction-de", 6, "Օր 37", "a1-contraction-de", "Կրճատումներ՝ de", "Articles contractés avec de"),
      vocabDay(
        "w6-review",
        6,
        "Օր 38",
        "Révision au / du / de",
        "Կրկնություն՝ au / du / de",
        [
          { french: "au cinéma", armenian: "կինո (գնալ)", exampleFr: "Je vais au cinéma.", exampleHy: "Ես գնում եմ կինո։" },
          { french: "du cinéma", armenian: "կինոյից (գալ)", exampleFr: "Je viens du cinéma.", exampleHy: "Ես գալիս եմ կինոյից։" },
          { french: "à la maison", armenian: "տանը / տուն", exampleFr: "Je suis à la maison.", exampleHy: "Ես տանն եմ։" },
          { french: "de la maison", armenian: "տնից", exampleFr: "Je sors de la maison.", exampleHy: "Ես դուրս եմ գալիս տնից։" },
          { french: "beaucoup de", armenian: "շատ", exampleFr: "beaucoup de livres", exampleHy: "շատ գրքեր" },
        ],
        "aller → au/à la · venir → du/de la · quantité → de",
        [
          {
            id: "w6r-e1",
            type: "multiple-choice",
            questionHy: "Je vais ___ cinéma.",
            options: ["au", "du", "de", "à le"],
            correctAnswer: "au",
            explanationHy: "aller + au",
          },
          {
            id: "w6r-e2",
            type: "multiple-choice",
            questionHy: "Je viens ___ cinéma.",
            options: ["au", "du", "à", "le"],
            correctAnswer: "du",
            explanationHy: "venir + du",
          },
        ]
      ),
      {
        id: "w6-reading",
        week: 6,
        day: "w6-reading",
        dayLabelHy: "Օր 39",
        dayLabelFr: "Jour 39",
        type: "reading",
        themeFr: "Lecture — voyage",
        themeHy: "Ընթերցանություն · Ճանապարհորդություն",
        level: "A1",
        readingId: "r4",
      },
      {
        id: "w6-test",
        week: 6,
        day: "w6-test",
        dayLabelHy: "Օր 40",
        dayLabelFr: "Jour 40",
        type: "weekly-test",
        themeFr: "Test final A1",
        themeHy: "A1 վերջնական թեստ",
        level: "A1",
      },
    ],
  },
];

export function getA1Month(): MonthWeek[] {
  return A1_MONTH;
}

export function getA1Lesson(lessonId: string): DayLesson | undefined {
  for (const w of A1_MONTH) {
    const found = w.lessons.find((l) => l.id === lessonId || l.day === lessonId);
    if (found) return found;
  }
  return undefined;
}

export function isWeekUnlocked(
  week: number,
  completed: Record<string, boolean>,
  level = "A1"
): boolean {
  // TEMP: open all weeks for preview — restore locking when ready
  void week;
  void completed;
  void level;
  return true;
  /*
  if (week <= 1) return true;
  const prev = A1_MONTH.find((w) => w.week === week - 1);
  if (!prev) return false;
  return prev.lessons.every((l) => completed[`${level}-${l.id}`]);
  */
}

export function isA1CourseComplete(
  completed: Record<string, boolean>,
  level = "A1"
): boolean {
  return A1_MONTH.every((week) =>
    week.lessons.every((l) => completed[`${level}-${l.id}`])
  );
}
