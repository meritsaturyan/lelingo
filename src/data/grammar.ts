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
      "Անձնական դերանունները ցույց են տալիս՝ ով է գործողությունը կատարում։\n\nՀպե՛ք 🔊՝ լսելու համար։",
    rule: "Je, tu, il/elle, nous, vous, ils/elles",
    listenItems: [
      { french: "Je", armenian: "ես" },
      { french: "Tu", armenian: "դու" },
      { french: "Il", armenian: "նա (արական)" },
      { french: "Elle", armenian: "նա (իգական)" },
      { french: "Nous", armenian: "մենք" },
      { french: "Vous", armenian: "դուք" },
      { french: "Ils", armenian: "նրանք (արական)" },
      { french: "Elles", armenian: "նրանք (իգական)" },
    ],
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
    titleFr: "Les articles définis",
    titleHy: "Որոշյալ հոդեր",
    explanation:
      "Որոշյալ հոդեր\n\nՕգտագործվում են, երբ խոսում ենք կոնկրետ կամ արդեն հայտնի անձի/առարկայի մասին։\n\nle → արական եզակի\n\nla → իգական եզակի\n\nl’ → ձայնավորից կամ h muet-ից առաջ\n\nles → հոգնակի\n\n⚠️ Կանոն -Ձայնավորից առաջ\n\nle / la → l’\n\nle école ❌\nla école ❌\nl’école ✅",
    rule: "le (m.) · la (f.) · l' (voyelle / h muet) · les (pluriel)",
    tables: [
      {
        title: "Articles définis",
        headers: ["Article", "Օրինակ", "Հայերեն"],
        rows: [
          ["le", "le livre", "գիրքը"],
          ["la", "la table", "սեղանը"],
          ["l'", "l'école", "դպրոցը"],
          ["les", "les livres", "գրքերը"],
        ],
        noteHy: "Ձայնավորից կամ h muet-ից առաջ՝ le / la → l'։",
      },
    ],
    examples: [
      { french: "Le livre est sur la table.", armenian: "Գիրքը սեղանի վրա է։" },
      { french: "L'école est grande.", armenian: "Դպրոցը մեծ է։" },
      { french: "Les enfants jouent.", armenian: "Երեխաները խաղում են։" },
    ],
    exercises: [
      mc("ar1", "___ maison (իգական որոշյալ)", ["le", "la", "les", "un"], "la", "Maison-ը իգական է՝ la։"),
      mc("ar2", "___ école (ձայնավորից առաջ)", ["le", "la", "l'", "les"], "l'", "Ձայնավորից առաջ՝ l'։"),
      mc("ar3", "___ livres (հոգնակի որոշյալ)", ["le", "la", "les", "une"], "les", "Les = հոգնակի որոշյալ։"),
    ],
  },
  {
    id: "a1-negation",
    level: "A1",
    titleFr: "La négation",
    titleHy: "Ժխտական ձև",
    explanation:
      "Ֆրանսերենում հիմնական ժխտական կառուցվածքն է՝ ne + verbe + pas։\n\nԵթե բայը սկսվում է ձայնավորով՝ ne → n'։\nJe n'aime pas.\nJe n'habite pas à Paris.\n\nՀիմնական օրինակներ՝\nJe parle. → Je ne parle pas.\nIl travaille. → Il ne travaille pas.",
    rule: "ne + verbe + pas · devant voyelle : n'",
    examples: [
      { french: "Je parle.", armenian: "Ես խոսում եմ։" },
      { french: "Je ne parle pas.", armenian: "Ես չեմ խոսում։" },
      { french: "Il n'aime pas le café.", armenian: "Նա չի սիրում սուրճը։" },
    ],
    exercises: [
      mc("ng1", "Ժխտական ձևը՝", ["ne … pas", "pas … ne", "no … pas", "non …"], "ne … pas", "ne + verbe + pas"),
      mc("ng2", "Je ___ aime ___ le thé. (ժխտում)", ["ne / pas", "n' / pas", "pas / ne", "no / pas"], "n' / pas", "Ձայնավորից առաջ՝ n'aime pas։"),
      mc("ng3", "Tu ___ travailles ___ ici.", ["ne / pas", "n' / pas", "pas / ne", "no / pas"], "ne / pas", "Tu ne travailles pas…"),
    ],
  },
  {
    id: "a1-questions",
    level: "A1",
    titleFr: "Poser une question",
    titleHy: "Հարցական նախադասություն",
    explanation:
      "Ֆրանսերենում հարցը կարելի է կազմել 3 հիմնական ձևով.\n\n1. L'intonation — ձայնի ինտոնացիայով\nԿառուցվածքը չի փոխվում, ձայնի տոնը բարձրանում է։\nTu habites à Paris ?\nTu travailles ici ?\nՇատ տարածված է առօրյա խոսակցական ֆրանսերենում։\n\n2. Avec « est-ce que »\nEst-ce que + sujet + verbe ?\nEst-ce que tu habites à Paris ?\nEst-ce que-ից հետո՝ sujet + verbe\n❌ Est-ce que habites-tu à Paris ?\n✅ Est-ce que tu habites à Paris ?\n\n3. L'inversion\nVerbe + sujet ?\nHabites-tu à Paris ?\nTravaillez-vous ici ?\nAime-t-elle le français ?\nԱվելի պաշտոնական / գրավոր։\n\nՀամեմատություն՝\nTu travailles ici ? → խոսակցական\nEst-ce que tu travailles ici ? → չեզոք / ամենահեշտ\nTravailles-tu ici ? → պաշտոնական",
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
      "3-րդ խմբում մեկ ընդհանուր վերջավորություն չկա, բայց կան մի քանի կարևոր մոդելներ։\n\nԱյս դասում սովորում ենք՝\n• ընդհանուր տիպեր (terminaisons)\n• PARTIR (և նման բայեր)\n• PRENDRE\n• POUVOIR\n• OUVRIR",
    rule: "3e groupe = formes irrégulières à apprendre",
    tables: [
      {
        title: "Type / Terminaisons",
        headers: ["Type", "Terminaisons"],
        rows: [
          ["3e général", "-s, -s, -t, -ons, -ez, -ent"],
          ["-dre", "-ds, -ds, -d, -ons, -ez, -ent"],
          ["pouvoir / vouloir", "-x, -x, -t, -ons, -ez, -ent"],
          ["ouvrir / offrir", "-e, -es, -e, -ons, -ez, -ent"],
        ],
      },
      {
        title: "PARTIR",
        headers: ["Sujet", "Forme"],
        rows: [
          ["Je", "pars"],
          ["Tu", "pars"],
          ["Il / Elle", "part"],
          ["Nous", "partons"],
          ["Vous", "partez"],
          ["Ils / Elles", "partent"],
        ],
        noteHy: "Նույն մոդելը՝ sortir, dormir, servir։",
      },
      {
        title: "PRENDRE",
        headers: ["Sujet", "Forme"],
        rows: [
          ["Je", "prends"],
          ["Tu", "prends"],
          ["Il / Elle", "prend"],
          ["Nous", "prenons"],
          ["Vous", "prenez"],
          ["Ils / Elles", "prennent"],
        ],
      },
      {
        title: "POUVOIR",
        headers: ["Sujet", "Forme", "Հայերեն"],
        rows: [
          ["Je", "peux", "ես կարող եմ"],
          ["Tu", "peux", "դու կարող ես"],
          ["Il / Elle", "peut", "նա կարող է"],
          ["Nous", "pouvons", "մենք կարող ենք"],
          ["Vous", "pouvez", "դուք կարող եք"],
          ["Ils / Elles", "peuvent", "նրանք կարող են"],
        ],
      },
      {
        title: "OUVRIR",
        headers: ["Sujet", "Forme", "Հայերեն"],
        rows: [
          ["Je", "ouvre", "ես բացում եմ"],
          ["Tu", "ouvres", "դու բացում ես"],
          ["Il / Elle", "ouvre", "նա բացում է"],
          ["Nous", "ouvrons", "մենք բացում ենք"],
          ["Vous", "ouvrez", "դուք բացում եք"],
          ["Ils / Elles", "ouvrent", "նրանք բացում են"],
        ],
        noteHy: "Présent-ում conjugue-վում է ինչպես 1er groupe, բայց բայը 3e groupe է։",
      },
    ],
    examples: [
      { french: "Je pars demain.", armenian: "Ես վաղը մեկնում եմ։" },
      { french: "Je prends le train.", armenian: "Ես գնացք եմ նստում։" },
      { french: "Je peux parler français.", armenian: "Ես կարող եմ ֆրանսերեն խոսել։" },
      { french: "J'ouvre la porte.", armenian: "Ես բացում եմ դուռը։" },
    ],
    exercises: [
      mc("irr1", "Je ___ (pouvoir)", ["peux", "peut", "pouvons", "pouvoir"], "peux", "Je peux"),
      mc("irr2", "Tu ___ la fenêtre. (ouvrir)", ["ouvre", "ouvres", "ouvrons", "ouvrez"], "ouvres", "Tu ouvres"),
      mc("irr3", "Je ___ demain. (partir)", ["pars", "part", "partons", "partez"], "pars", "Je pars"),
      mc("irr4", "Tu ___ le bus. (prendre)", ["prends", "prend", "prenez", "prennent"], "prends", "Tu prends"),
    ],
  },
  {
    id: "a1-articles-indef",
    level: "A1",
    titleFr: "Les articles indéfinis",
    titleHy: "Անորոշ հոդեր",
    explanation:
      "Անորոշ հոդերը (articles indéfinis) ցույց են տալիս ոչ կոնկրետ, առաջին անգամ նշված իր։\n\nՀայերենում հաճախ համապատասխանում են «մի» բառին կամ ընդհանուր հոգնակիին։",
    rule: "un (m.) · une (f.) · des (pluriel)",
    tables: [
      {
        title: "Articles indéfinis",
        headers: ["Article", "Օրինակ", "Հայերեն"],
        rows: [
          ["un", "un livre", "մի գիրք"],
          ["une", "une voiture", "մի մեքենա"],
          ["des", "des livres", "գրքեր"],
        ],
      },
    ],
    examples: [
      { french: "J'ai un livre.", armenian: "Ես ունեմ մի գիրք։" },
      { french: "Elle a une voiture.", armenian: "Նա ունի մի մեքենա։" },
      { french: "Nous avons des amis.", armenian: "Մենք ունենք ընկերներ։" },
    ],
    exercises: [
      mc("ai1", "___ livre (արական անորոշ)", ["un", "une", "le", "des"], "un", "Un livre = մի գիրք։"),
      mc("ai2", "___ voiture (իգական անորոշ)", ["un", "une", "la", "des"], "une", "Une voiture = մի մեքենա։"),
      mc("ai3", "___ livres (հոգնակի անորոշ)", ["un", "une", "les", "des"], "des", "Des = հոգնակի անորոշ։"),
    ],
  },
  {
    id: "a1-articles-part",
    level: "A1",
    titleFr: "Les articles partitifs",
    titleHy: "Մասնատող հոդեր",
    explanation:
      "Partitifs-ը օգտագործվում է չհաշվելի քանակի համար՝ սնունդ, ըմպելիք, նյութ։\n\ndu / de la / de l' / des\n\nԿարևոր տարբերություն՝\n• aimer + défini → ընդհանուր սեր / նախասիրություն\n• manger + partitif → որոշ քանակ\n\nՕրինակ՝\nJe mange du chocolat. (որոշ շոկոլադ եմ ուտում)\nJ'aime le chocolat. (սիրում եմ շոկոլադը ընդհանրապես)\n\nԲայեր՝ aimer, adorer, détester, préférer, apprécier → սովորաբար défini։",
    rule: "du · de la · de l' · des — չհաշվելի քանակ",
    tables: [
      {
        title: "Articles partitifs",
        headers: ["Article", "Օրինակ", "Հայերեն"],
        rows: [
          ["du", "du pain", "հաց (որոշ քանակ)"],
          ["de la", "de la confiture", "մուրաբա"],
          ["de l'", "de l'eau", "ջուր"],
          ["des", "des légumes", "բանջարեղեն"],
        ],
      },
    ],
    examples: [
      { french: "Je mange du chocolat.", armenian: "Ես շոկոլադ եմ ուտում։" },
      { french: "J'aime le chocolat.", armenian: "Ես սիրում եմ շոկոլադը։" },
      { french: "Je bois de l'eau.", armenian: "Ես ջուր եմ խմում։" },
    ],
    exercises: [
      mc("ap1", "Je mange ___ pain.", ["du", "le", "un", "la"], "du", "Manger + partitif։"),
      mc("ap2", "J'aime ___ chocolat.", ["du", "le", "de la", "un"], "le", "Aimer + défini։"),
      mc("ap3", "Je bois ___ eau.", ["du", "de la", "de l'", "des"], "de l'", "Eau-ն սկսվում է ձայնավորով՝ de l'։"),
    ],
  },
  {
    id: "a1-articles-neg",
    level: "A1",
    titleFr: "Les articles dans la négation",
    titleHy: "Հոդերը ժխտականում",
    explanation:
      "Ժխտականում անորոշ և մասնատող հոդերը դառնում են de / d'։\n\nun / une / des / du / de la / de l' → de / d'\n\nԲայց որոշակի հոդերը (le / la / l' / les) չեն փոխվում։\n\nՕրինակներ՝\nJ'ai un livre. → Je n'ai pas de livre.\nJe mange du pain. → Je ne mange pas de pain.\nJ'aime le café. → Je n'aime pas le café.",
    rule: "indéfinis / partitifs → de/d' · définis restent",
    tables: [
      {
        title: "Հոդերը ժխտականում",
        headers: ["Դրական", "Ժխտական"],
        rows: [
          ["un / une / des", "de / d'"],
          ["du / de la / de l'", "de / d'"],
          ["le / la / l' / les", "le / la / l' / les (չեն փոխվում)"],
        ],
      },
    ],
    examples: [
      { french: "Je n'ai pas de livre.", armenian: "Ես գիրք չունեմ։" },
      { french: "Je ne mange pas de pain.", armenian: "Ես հաց չեմ ուտում։" },
      { french: "Je n'aime pas le café.", armenian: "Ես չեմ սիրում սուրճը։" },
    ],
    exercises: [
      mc("an1", "Je n'ai pas ___ voiture.", ["une", "de", "la", "des"], "de", "un/une → de ժխտականում։"),
      mc("an2", "Je ne mange pas ___ pain.", ["du", "de", "le", "un"], "de", "du → de ժխտականում։"),
      mc("an3", "Je n'aime pas ___ café.", ["de", "du", "le", "un"], "le", "Défini-ն չի փոխվում։"),
    ],
  },
  {
    id: "a1-quantite",
    level: "A1",
    titleFr: "Après une quantité",
    titleHy: "Քանակից հետո",
    explanation:
      "Քանակ արտահայտող բառերից հետո օգտագործվում է de / d' (ոչ թե du / des)։\n\nbeaucoup de · peu de · assez de · trop de · un peu de\nձայնավորից առաջ՝ beaucoup d'\n\nՕրինակ՝\nbeaucoup de livres\nbeaucoup d'amis\nun peu de sucre",
    rule: "quantité + de / d'",
    tables: [
      {
        title: "Expressions de quantité",
        headers: ["Expression", "Օրինակ", "Հայերեն"],
        rows: [
          ["beaucoup de", "beaucoup de livres", "շատ գրքեր"],
          ["peu de", "peu de temps", "քիչ ժամանակ"],
          ["assez de", "assez de travail", "բավական աշխատանք"],
          ["trop de", "trop de bruit", "շատ աղմուկ"],
          ["un peu de", "un peu de sucre", "մի քիչ շաքար"],
          ["beaucoup d'", "beaucoup d'amis", "շատ ընկերներ"],
        ],
      },
    ],
    examples: [
      { french: "J'ai beaucoup de livres.", armenian: "Ես շատ գրքեր ունեմ։" },
      { french: "Il y a peu de temps.", armenian: "Քիչ ժամանակ կա։" },
      { french: "Nous avons beaucoup d'amis.", armenian: "Մենք շատ ընկերներ ունենք։" },
    ],
    exercises: [
      mc("qt1", "beaucoup ___ livres", ["de", "des", "du", "les"], "de", "Quantité + de։"),
      mc("qt2", "beaucoup ___ amis", ["de", "d'", "des", "du"], "d'", "Ձայնավորից առաջ՝ d'։"),
      mc("qt3", "un peu ___ sucre", ["de", "du", "des", "le"], "de", "un peu de…"),
    ],
  },
  {
    id: "a1-contraction-a",
    level: "A1",
    titleFr: "Articles contractés avec à",
    titleHy: "Կրճատումներ՝ à-ով",
    explanation:
      "À + որոշակի հոդ կարող է կրճատվել։\n\nԱյս ձևերը հաճախ են հանդիպում aller / être + տեղ անունով։",
    rule: "à + le → au · à + les → aux",
    tables: [
      {
        title: "à + article",
        headers: ["Combinaison", "Résultat"],
        rows: [
          ["à + le", "AU"],
          ["à + les", "AUX"],
          ["à + la", "À LA"],
          ["à + l'", "À L'"],
        ],
      },
    ],
    examples: [
      { french: "Je vais au cinéma.", armenian: "Ես գնում եմ կինո։" },
      { french: "Elle est à la maison.", armenian: "Նա տանն է։" },
      { french: "Nous allons à l'école.", armenian: "Մենք գնում ենք դպրոց։" },
      { french: "Ils vont aux magasins.", armenian: "Նրանք գնում են խանութներ։" },
    ],
    exercises: [
      mc("ca1", "à + le = ", ["au", "aux", "du", "à le"], "au", "à + le → au"),
      mc("ca2", "Je vais ___ cinéma.", ["au", "à la", "à le", "du"], "au", "cinéma = արական՝ au"),
      mc("ca3", "Elle va ___ école.", ["au", "à la", "à l'", "aux"], "à l'", "école-ը սկսվում է ձայնավորով։"),
    ],
  },
  {
    id: "a1-contraction-de",
    level: "A1",
    titleFr: "Articles contractés avec de",
    titleHy: "Կրճատումներ՝ de-ով",
    explanation:
      "De + որոշակի հոդ կարող է կրճատվել։\n\nՀաճախ օգտագործվում է venir / sortir + տեղ։\n\nՀամեմատե՛ք՝\nJe vais au cinéma. (գնում եմ)\nJe viens du cinéma. (գալիս եմ)",
    rule: "de + le → du · de + les → des",
    tables: [
      {
        title: "de + article",
        headers: ["Combinaison", "Résultat"],
        rows: [
          ["de + le", "DU"],
          ["de + les", "DES"],
          ["de + la", "DE LA"],
          ["de + l'", "DE L'"],
        ],
      },
    ],
    examples: [
      { french: "Je viens du cinéma.", armenian: "Ես գալիս եմ կինոյից։" },
      { french: "Elle sort de la maison.", armenian: "Նա դուրս է գալիս տնից։" },
      { french: "Nous venons de l'école.", armenian: "Մենք գալիս ենք դպրոցից։" },
      { french: "Ils sortent des magasins.", armenian: "Նրանք դուրս են գալիս խանութներից։" },
    ],
    exercises: [
      mc("cd1", "de + le = ", ["du", "des", "au", "de le"], "du", "de + le → du"),
      mc("cd2", "Je viens ___ cinéma.", ["du", "au", "de le", "des"], "du", "venir + du"),
      mc("cd3", "Je vais ___ cinéma / Je viens ___ cinéma.", ["au / du", "du / au", "à / de", "au / au"], "au / du", "aller → au, venir → du"),
    ],
  },
];

export function getGrammarByLevel(level: string) {
  return GRAMMAR_LESSONS.filter((g) => g.level === level);
}

export function getGrammarById(id: string) {
  return GRAMMAR_LESSONS.find((g) => g.id === id);
}
