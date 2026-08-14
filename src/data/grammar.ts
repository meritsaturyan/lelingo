import type { GrammarLesson } from "@/lib/types";

function mc(
  id: string,
  questionHy: string,
  options: string[],
  correctAnswer: string,
  explanationHy: string,
  promptFr?: string
) {
  return {
    id,
    type: "multiple-choice" as const,
    questionHy,
    options,
    correctAnswer,
    explanationHy,
    promptFr,
  };
}

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: "a1-pronoms",
    level: "A1",
    titleFr: "Les pronoms personnels",
    titleHy: "Անձնական դերանուններ",
    explanation:
      "Անձնական դերանունները ցույց են տալիս՝ ով է գործողությունը կատարում։\n\nJe → ես\nTu → դու\nIl → նա (արական)\nElle → նա (իգական)\nNous → մենք\nVous → դուք\nIls / Elles → նրանք",
    rule: "Je, tu, il/elle, nous, vous, ils/elles",
    examples: [
      { french: "Je suis étudiant.", armenian: "Ես ուսանող եմ։" },
      { french: "Elle habite à Paris.", armenian: "Նա ապրում է Փարիզում։" },
      { french: "Nous parlons français.", armenian: "Մենք ֆրանսերեն ենք խոսում։" },
    ],
    exercises: [
      mc("pr1", "«Ես» ֆրանսերեն՝", ["Tu", "Je", "Il", "Nous"], "Je", "Je = ես։"),
      mc("pr2", "Elle նշանակում է՝", ["նա (իգական)", "նա (արական)", "դուք", "մենք"], "նա (իգական)", "Elle = նա (իգական)։"),
      mc("pr3", "Nous = ", ["ես", "դու", "մենք", "նրանք"], "մենք", "Nous = մենք։"),
    ],
  },
  {
    id: "a1-etre",
    level: "A1",
    titleFr: "Le verbe « être »",
    titleHy: "« լինել » բայը",
    explanation:
      "Être = լինել։ Սա ամենակարևոր անկանոն բայերից է։\n\nJe suis — Ես եմ\nTu es — Դու ես\nIl / Elle est — Նա է\nNous sommes — Մենք ենք\nVous êtes — Դուք եք\nIls / Elles sont — Նրանք են",
    rule: "je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont",
    examples: [
      { french: "Je suis français.", armenian: "Ես ֆրանսիացի եմ։" },
      { french: "Tu es fatigué.", armenian: "Դու հոգնած ես։" },
      { french: "Nous sommes étudiants.", armenian: "Մենք ուսանողներ ենք։" },
    ],
    exercises: [
      mc("et1", "Je ___ Arménien.", ["suis", "es", "est", "sommes"], "suis", "Je suis…"),
      mc("et2", "Tu ___ étudiant.", ["suis", "es", "êtes", "sont"], "es", "Tu es…"),
      mc("et3", "Nous ___ contents.", ["est", "êtes", "sommes", "suis"], "sommes", "Nous sommes…"),
    ],
  },
  {
    id: "a1-articles",
    level: "A1",
    titleFr: "Les articles",
    titleHy: "Հոդեր",
    explanation:
      "un → մի / արական\nune → մի / իգական\ndes → մի քանի\nle → -ը / արական\nla → -ը / իգական\nles → -ները",
    rule: "un/une/des (անորոշ) · le/la/les (որոշակի)",
    examples: [
      { french: "un livre", armenian: "մի գիրք" },
      { french: "une maison", armenian: "մի տուն" },
      { french: "le livre", armenian: "գիրքը" },
      { french: "la maison", armenian: "տունը" },
      { french: "les livres", armenian: "գրքերը" },
    ],
    exercises: [
      mc("ar1", "___ maison (իգական որոշակի)", ["le", "la", "les", "un"], "la", "Maison-ը իգական է՝ la։"),
      mc("ar2", "___ livre (արական անորոշ)", ["une", "un", "la", "les"], "un", "Un livre = մի գիրք։"),
      mc("ar3", "___ livres (հոգնակի որոշակի)", ["le", "la", "les", "une"], "les", "Les = հոգնակի որոշակի։"),
    ],
  },
  {
    id: "a1-negation",
    level: "A1",
    titleFr: "La négation",
    titleHy: "Ժխտական ձև",
    explanation:
      "Ֆրանսերենում հիմնական ժխտական կառուցվածքն է՝ ne + verbe + pas։\n\nԵթե բայը սկսվում է ձայնավորով՝ ne → n'։\nJe n'aime pas.\nJe n'habite pas à Paris.",
    rule: "ne + verbe + pas · devant voyelle : n'",
    examples: [
      { french: "Je parle.", armenian: "Ես խոսում եմ։" },
      { french: "Je ne parle pas.", armenian: "Ես չեմ խոսում։" },
      { french: "Il n'aime pas le café.", armenian: "Նա չի սիրում սուրճը։" },
    ],
    exercises: [
      mc("ng1", "Ժխտական ձևը՝", ["ne … pas", "pas … ne", "no … pas", "non …"], "ne … pas", "ne + verbe + pas"),
      mc("ng2", "Je ___ aime ___ le thé. (ժխտում)", ["ne / pas", "n' / pas", "pas / ne", "no / pas"], "n' / pas", "Ձայնավորից առաջ՝ n'aime pas։"),
    ],
  },
  {
    id: "a1-questions",
    level: "A1",
    titleFr: "Poser une question",
    titleHy: "Հարցական նախադասություն",
    explanation:
      "Ֆրանսերենում հարցը կարելի է կազմել 3 ձևով.\n\n1) Ինտոնացիա՝ Tu habites à Paris ?\n2) Est-ce que + sujet + verbe ?\nEst-ce que tu habites à Paris ?\n3) Ինվերսիա՝ Habites-tu à Paris ?\n\nԽոսակցական՝ Tu travailles ici ?\nՉեզոք/հեշտ՝ Est-ce que tu travailles ici ?\nՊաշտոնական՝ Travailles-tu ici ?",
    rule: "intonation · est-ce que · inversion",
    examples: [
      { french: "Tu travailles ici ?", armenian: "Դու այստեղ աշխատո՞ւմ ես։ (խոսակցական)" },
      { french: "Est-ce que tu travailles ici ?", armenian: "Դու այստեղ աշխատո՞ւմ ես։ (չեզոք)" },
      { french: "Travailles-tu ici ?", armenian: "Դու այստեղ աշխատո՞ւմ ես։ (պաշտոնական)" },
      { french: "Aime-t-elle le français ?", armenian: "Նա սիրո՞ւմ է ֆրանսերենը։" },
    ],
    exercises: [
      mc("qu1", "Ամենահեշտ/չեզոք ձևը՝", ["Est-ce que…", "միայն ինվերսիա", "առանց բայի", "pas…"], "Est-ce que…", "Est-ce que + sujet + verbe։"),
      mc("qu2", "Ճի՞շտ է․ Est-ce que tu habites à Paris ?", ["Այո", "Ոչ"], "Այո", "Est-ce que-ից հետո՝ sujet + verbe։"),
    ],
  },
  {
    id: "a1-aller",
    level: "A1",
    titleFr: "Aller + destinations",
    titleHy: "Գնալ + նախդիրներ",
    explanation:
      "Aller = գնալ\nJe vais · Tu vas · Il/Elle va · Nous allons · Vous allez · Ils/Elles vont\n\nՔաղաք՝ à (Je vais à Paris.)\nԻգական երկիր՝ en (Je vais en France / en Arménie.)\nԱրական երկիր՝ au (Je vais au Canada.)\nՀոգնակի երկիր՝ aux (Je vais aux États-Unis.)",
    rule: "ville → à · pays f. → en · pays m. → au · pluriel → aux",
    examples: [
      { french: "Je vais à Paris.", armenian: "Ես գնում եմ Փարիզ։" },
      { french: "Je vais en Arménie.", armenian: "Ես գնում եմ Հայաստան։" },
      { french: "Je vais au Japon.", armenian: "Ես գնում եմ Ճապոնիա։" },
      { french: "Je vais aux États-Unis.", armenian: "Ես գնում եմ Միացյալ Նահանգներ։" },
    ],
    exercises: [
      mc("al1", "Je vais ___ Paris.", ["à", "en", "au", "aux"], "à", "Քաղաք՝ à։"),
      mc("al2", "Je vais ___ France.", ["à", "en", "au", "aux"], "en", "Իգական երկիր՝ en։"),
      mc("al3", "Je vais ___ Canada.", ["à", "en", "au", "aux"], "au", "Արական երկիր՝ au։"),
    ],
  },
  {
    id: "a1-er-verbs",
    level: "A1",
    titleFr: "1er groupe — verbes en -ER",
    titleHy: "Առաջին խումբ (-ER)",
    explanation:
      "Առաջին խմբի բայերի մեծ մասը վերջանում է -ER-ով։\nTerminaisons : -e, -es, -e, -ons, -ez, -ent\n\nՕրինակներ՝ parler, aimer, travailler, habiter, regarder, écouter\n⚠️ Բացառություն՝ aller → 3-րդ խումբ։",
    rule: "Je -e · Tu -es · Il/Elle -e · Nous -ons · Vous -ez · Ils/Elles -ent",
    examples: [
      { french: "Je parle", armenian: "ես խոսում եմ" },
      { french: "Tu parles", armenian: "դու խոսում ես" },
      { french: "Il/Elle parle", armenian: "նա խոսում է" },
      { french: "Nous parlons", armenian: "մենք խոսում ենք" },
      { french: "Vous parlez", armenian: "դուք խոսում եք" },
      { french: "Ils/Elles parlent", armenian: "նրանք խոսում են" },
    ],
    exercises: [
      mc("er1", "Je ___ français. (parler)", ["parle", "parles", "parlons", "parlez"], "parle", "Je + -e → parle"),
      mc("er2", "Nous ___ à Yerevan. (habiter)", ["habite", "habites", "habitons", "habitent"], "habitons", "Nous + -ons"),
      mc("er3", "Aller-ը ո՞ր խմբից է։", ["1er", "2e", "3e"], "3e", "Aller-ը բացառություն է՝ 3-րդ խումբ։"),
    ],
  },
  {
    id: "a1-ir-verbs",
    level: "A1",
    titleFr: "2e groupe — verbes en -IR",
    titleHy: "Երկրորդ խումբ (-IR)",
    explanation:
      "Օրինակ՝ finir\nJe finis · Tu finis · Il finit · Nous finissons · Vous finissez · Ils finissent\nTerminaisons : -is, -is, -it, -issons, -issez, -issent\n\n📌 Ոչ բոլոր -IR բայերն են 2-րդ խմբի։\npartir → 3-րդ խումբ (nous partons, ոչ թե partissons)",
    rule: "-is, -is, -it, -issons, -issez, -issent",
    examples: [
      { french: "Je finis mon travail.", armenian: "Ես ավարտում եմ աշխատանքս։" },
      { french: "Nous finissons bientôt.", armenian: "Մենք շուտով կավարտենք։" },
    ],
    exercises: [
      mc("ir1", "Nous ___ (finir)", ["finissons", "finons", "fines", "finir"], "finissons", "2e groupe՝ -issons"),
      mc("ir2", "Partir-ը 2-րդ խո՞ւմբ է։", ["Ոչ", "Այո"], "Ոչ", "Partir → 3e groupe"),
    ],
  },
  {
    id: "a1-irregular",
    level: "A1",
    titleFr: "3e groupe — verbes irréguliers",
    titleHy: "Երրորդ խումբ",
    explanation:
      "3-րդ խմբում մեկ ընդհանուր վերջավորություն չկա։\n\ndormir — Je dors, tu dors, il dort, nous dormons, vous dormez, ils dorment\nprendre — Je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent\nfaire — Je fais, tu fais, il fait, nous faisons, vous faites, ils font\nvenir — Je viens, tu viens, il vient, nous venons, vous venez, ils viennent\nmettre — Je mets, tu mets, il met, nous mettons, vous mettez, ils mettent\nécrire — J'écris … Nous écrivons … Ils écrivent\ndire — Je dis … Vous dites … Ils disent\nboire — Je bois … Nous buvons … Ils boivent\nvoir — Je vois … Nous voyons … Ils voient\n\npouvoir — je peux · vouloir — je veux · devoir — je dois",
    rule: "3e groupe = formes irrégulières à apprendre",
    examples: [
      { french: "Je prends le train.", armenian: "Ես գնացք եմ նստում։" },
      { french: "Nous faisons un exercice.", armenian: "Մենք վարժություն ենք անում։" },
      { french: "Je peux parler français.", armenian: "Ես կարող եմ ֆրանսերեն խոսել։" },
      { french: "Je veux un café.", armenian: "Ես սուրճ եմ ուզում։" },
      { french: "Je dois étudier.", armenian: "Ես պարտավոր եմ սովորել։" },
    ],
    exercises: [
      mc("irr1", "Nous ___ (faire)", ["faisons", "faites", "font", "fais"], "faisons", "Nous faisons"),
      mc("irr2", "Ils ___ (prendre)", ["prennent", "prend", "prenez", "prenons"], "prennent", "Ils prennent"),
      mc("irr3", "Vous ___ (dire)", ["dites", "disez", "disent", "dis"], "dites", "Vous dites (ոչ disez)"),
      mc("irr4", "Je ___ (pouvoir)", ["peux", "peut", "pouvons", "pouvoir"], "peux", "Je peux"),
    ],
  },
];

export function getGrammarByLevel(level: string) {
  return GRAMMAR_LESSONS.filter((g) => g.level === level);
}

export function getGrammarById(id: string) {
  return GRAMMAR_LESSONS.find((g) => g.id === id);
}
