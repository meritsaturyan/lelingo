import type { GrammarLesson } from "@/lib/types";

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: "a1-present",
    level: "A1",
    titleFr: "Le présent",
    titleHy: "Ներկա ժամանակ",
    explanation:
      "Ֆրանսերենում ներկա ժամանակը (le présent) օգտագործվում է ներկայում կատարվող գործողությունները նկարագրելու համար։ Կանոնավոր -ER բայերի համար հիմքին ավելացվում են վերջավորություններ՝ -e, -es, -e, -ons, -ez, -ent։",
    rule: "Je travaille, tu travailles, il/elle travaille, nous travaillons, vous travaillez, ils/elles travaillent.",
    examples: [
      { french: "Je travaille à Paris.", armenian: "Ես աշխատում եմ Փարիզում։" },
      { french: "Tu parles français.", armenian: "Դու ֆրանսերեն ես խոսում։" },
      { french: "Nous habitons en Arménie.", armenian: "Մենք ապրում ենք Հայաստանում։" },
    ],
    exercises: [
      {
        id: "g1e1",
        type: "multiple-choice",
        questionHy: "Ընտրե՛ք ճիշտ ձևը․ Je ___ à Paris.",
        promptFr: "Je ___ à Paris.",
        options: ["travaille", "travailles", "travaillons"],
        correctAnswer: "travaille",
        explanationHy: "«Je»-ի հետ -ER բայերը ստանում են -e վերջավորություն․ travaille։",
      },
      {
        id: "g1e2",
        type: "fill-blank",
        questionHy: "Լրացրե՛ք բացը․ Nous ___ français.",
        promptFr: "Nous ___ français.",
        correctAnswer: "parlons",
        explanationHy: "«Nous»-ի հետ վերջավորությունը -ons է․ parlons։",
      },
      {
        id: "g1e3",
        type: "multiple-choice",
        questionHy: "Ո՞րն է ճիշտ․ Tu ___ le café.",
        promptFr: "Tu ___ le café.",
        options: ["aimes", "aime", "aimons"],
        correctAnswer: "aimes",
        explanationHy: "«Tu»-ի հետ վերջավորությունը -es է․ aimes։",
      },
      {
        id: "g1e4",
        type: "reorder",
        questionHy: "Դասավորե՛ք բառերը ճիշտ հերթականությամբ։",
        words: ["habite", "Je", "Yerevan", "à"],
        correctAnswer: "Je habite à Yerevan",
        explanationHy: "Ճիշտ նախադասություն․ Je habite à Yerevan. (կամ J'habite)",
      },
    ],
  },
  {
    id: "a1-articles",
    level: "A1",
    titleFr: "Les articles",
    titleHy: "Հոդեր (le, la, les, un, une)",
    explanation:
      "Ֆրանսերենում գոյականները սեռ ունեն։ Le — արական որոշակի, la — իգական որոշակի, les — հոգնակի։ Un / une — անորոշ հոդեր։",
    rule: "le livre (գիրք), la table (սեղան), les enfants (երեխաներ), un ami, une amie.",
    examples: [
      { french: "Le livre est intéressant.", armenian: "Գիրքը հետաքրքիր է։" },
      { french: "Une pomme, s'il vous plaît.", armenian: "Մի խնձոր, խնդրում եմ։" },
      { french: "Les enfants jouent.", armenian: "Երեխաները խաղում են։" },
    ],
    exercises: [
      {
        id: "g2e1",
        type: "multiple-choice",
        questionHy: "Ընտրե՛ք ճիշտ հոդը․ ___ maison",
        promptFr: "___ maison",
        options: ["le", "la", "les"],
        correctAnswer: "la",
        explanationHy: "«Maison»-ը իգական է, ուստի օգտագործում ենք la։",
      },
      {
        id: "g2e2",
        type: "multiple-choice",
        questionHy: "___ café est chaud.",
        options: ["Le", "La", "Une"],
        correctAnswer: "Le",
        explanationHy: "«Café»-ն արական է․ Le café։",
      },
      {
        id: "g2e3",
        type: "fill-blank",
        questionHy: "Լրացրե՛ք․ J'ai ___ sœur.",
        promptFr: "J'ai ___ sœur.",
        correctAnswer: "une",
        explanationHy: "«Sœur»-ը իգական է, անորոշ հոդը՝ une։",
      },
    ],
  },
  {
    id: "a1-etre-avoir",
    level: "A1",
    titleFr: "Être et avoir",
    titleHy: "Être և avoir բայերը",
    explanation:
      "Être (լինել) և avoir (ունենալ) ամենակարևոր բայերն են։ Դրանք անկանոն են և պետք է անգիր իմանալ։",
    rule: "être: je suis, tu es, il est, nous sommes, vous êtes, ils sont. avoir: j'ai, tu as, il a, nous avons, vous avez, ils ont.",
    examples: [
      { french: "Je suis étudiant.", armenian: "Ես ուսանող եմ։" },
      { french: "J'ai un livre.", armenian: "Ես գիրք ունեմ։" },
      { french: "Nous sommes contents.", armenian: "Մենք ուրախ ենք։" },
    ],
    exercises: [
      {
        id: "g3e1",
        type: "multiple-choice",
        questionHy: "Je ___ Arménien.",
        options: ["suis", "es", "ai"],
        correctAnswer: "suis",
        explanationHy: "«Être» բայի «je» ձևը՝ suis։",
      },
      {
        id: "g3e2",
        type: "multiple-choice",
        questionHy: "Tu ___ un chat ?",
        options: ["as", "es", "a"],
        correctAnswer: "as",
        explanationHy: "«Avoir» բայի «tu» ձևը՝ as։",
      },
      {
        id: "g3e3",
        type: "translate",
        questionHy: "Թարգմանե՛ք ֆրանսերեն․ «Մենք ուրախ ենք։»",
        correctAnswer: "Nous sommes contents",
        explanationHy: "Nous sommes contents / contentes։",
      },
    ],
  },
  {
    id: "a2-passe-compose",
    level: "A2",
    titleFr: "Le passé composé",
    titleHy: "Անցյալ կատարյալ (passé composé)",
    explanation:
      "Passé composé-ն օգտագործվում է անցյալում ավարտված գործողությունների համար։ Կազմվում է avoir կամ être + participe passé։",
    rule: "J'ai mangé. Je suis allé(e). Avec être, le participe s'accorde.",
    examples: [
      { french: "Hier, j'ai mangé une pizza.", armenian: "Երեկ ես պիցցա եմ կերել։" },
      { french: "Elle est allée à Paris.", armenian: "Նա գնացել է Փարիզ։" },
      { french: "Nous avons fini le travail.", armenian: "Մենք ավարտել ենք աշխատանքը։" },
    ],
    exercises: [
      {
        id: "g4e1",
        type: "multiple-choice",
        questionHy: "Hier, je ___ un film.",
        options: ["ai regardé", "regarde", "suis regardé"],
        correctAnswer: "ai regardé",
        explanationHy: "«Regarder»-ը conjugé է avoir-ով․ j'ai regardé։",
      },
      {
        id: "g4e2",
        type: "fill-blank",
        questionHy: "Elle ___ au cinéma. (aller)",
        promptFr: "Elle ___ au cinéma.",
        correctAnswer: "est allée",
        explanationHy: "«Aller»-ը être-ով է, և իգական սեռի համար՝ allée։",
      },
      {
        id: "g4e3",
        type: "multiple-choice",
        questionHy: "Nous ___ le livre.",
        options: ["avons lu", "sommes lu", "avons lire"],
        correctAnswer: "avons lu",
        explanationHy: "«Lire»-ի participe passé-ն՝ lu, օգնական բայը՝ avoir։",
      },
    ],
  },
  {
    id: "a2-futur-proche",
    level: "A2",
    titleFr: "Le futur proche",
    titleHy: "Մոտ ապագա (aller + infinitif)",
    explanation:
      "Futur proche-ը նկարագրում է մոտ ապագայում տեղի ունենալիք գործողություններ․ aller (présent) + infinitif։",
    rule: "Je vais manger. Tu vas partir. Nous allons étudier.",
    examples: [
      { french: "Je vais étudier ce soir.", armenian: "Այս երեկո ես պատրաստվում եմ սովորել։" },
      { french: "Ils vont voyager demain.", armenian: "Նրանք վաղը պատրաստվում են ճանապարհորդել։" },
    ],
    exercises: [
      {
        id: "g5e1",
        type: "multiple-choice",
        questionHy: "Je ___ partir.",
        options: ["vais", "vas", "allons"],
        correctAnswer: "vais",
        explanationHy: "«Je» + aller = vais։",
      },
      {
        id: "g5e2",
        type: "fill-blank",
        questionHy: "Nous ___ manger. (aller)",
        promptFr: "Nous ___ manger.",
        correctAnswer: "allons",
        explanationHy: "«Nous»-ի հետ՝ allons։",
      },
    ],
  },
  {
    id: "b1-subjonctif",
    level: "B1",
    titleFr: "Le subjonctif",
    titleHy: "Ենթադրական եղանակ (subjonctif)",
    explanation:
      "Subjonctif-ը օգտագործվում է ցանկություն, անհրաժեշտություն, զգացմունք կամ անորոշություն արտահայտելիս՝ հաճախ «que»-ից հետո։",
    rule: "Il faut que tu viennes. Je veux que tu sois heureux. Bien que ce soit difficile…",
    examples: [
      { french: "Il faut que j'étudie.", armenian: "Պետք է, որ ես սովորեմ։" },
      { french: "Je veux que tu viennes.", armenian: "Ես ուզում եմ, որ դու գաս։" },
    ],
    exercises: [
      {
        id: "g6e1",
        type: "multiple-choice",
        questionHy: "Il faut que tu ___.",
        options: ["viennes", "viens", "venir"],
        correctAnswer: "viennes",
        explanationHy: "«Il faut que»-ից հետո օգտագործվում է subjonctif․ viennes։",
      },
      {
        id: "g6e2",
        type: "fill-blank",
        questionHy: "Je veux que tu ___ heureux. (être)",
        promptFr: "Je veux que tu ___ heureux.",
        correctAnswer: "sois",
        explanationHy: "Être-ի subjonctif présent՝ sois։",
      },
    ],
  },
  {
    id: "b1-conditionnel",
    level: "B1",
    titleFr: "Le conditionnel",
    titleHy: "Պայմանական եղանակ",
    explanation:
      "Conditionnel-ը օգտագործվում է քաղաքավարի խնդրանքների և հիպոթետիկ իրավիճակների համար։",
    rule: "Je voudrais un café. Si j'avais le temps, je voyagerais.",
    examples: [
      { french: "Je voudrais un thé, s'il vous plaît.", armenian: "Կցանկանայի թեյ, խնդրում եմ։" },
      { french: "Tu pourrais m'aider ?", armenian: "Կարո՞ղ ես օգնել ինձ։" },
    ],
    exercises: [
      {
        id: "g7e1",
        type: "multiple-choice",
        questionHy: "Je ___ un café.",
        options: ["voudrais", "veux", "vouloir"],
        correctAnswer: "voudrais",
        explanationHy: "Քաղաքավարի խնդրանքի համար՝ je voudrais։",
      },
    ],
  },
  {
    id: "b2-discours",
    level: "B2",
    titleFr: "Le discours rapporté",
    titleHy: "Անուղղակի խոսք",
    explanation:
      "Discours rapporté-ում ուղղակի խոսքը վերածվում է անուղղակիի՝ ժամանակների համաձայնությամբ (concordance des temps)։",
    rule: "Il dit : « Je suis fatigué. » → Il dit qu'il est fatigué. Il a dit qu'il était fatigué.",
    examples: [
      { french: "Elle dit qu'elle part demain.", armenian: "Նա ասում է, որ վաղը մեկնում է։" },
      { french: "Il a affirmé qu'il viendrait.", armenian: "Նա պնդել է, որ կգա։" },
    ],
    exercises: [
      {
        id: "g8e1",
        type: "multiple-choice",
        questionHy: "Il dit : « Je suis prêt. » → Il dit qu'il ___ prêt.",
        options: ["est", "était", "sera"],
        correctAnswer: "est",
        explanationHy: "Ներկայում rapporté անելիս présent-ը մնում է présent։",
      },
    ],
  },
];

export function getGrammarByLevel(level: string) {
  return GRAMMAR_LESSONS.filter((g) => g.level === level);
}

export function getGrammarById(id: string) {
  return GRAMMAR_LESSONS.find((g) => g.id === id);
}
