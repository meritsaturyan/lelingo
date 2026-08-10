import type { VocabCategory, VocabItem } from "@/lib/types";

export const VOCAB_CATEGORIES: VocabCategory[] = [
  { id: "greetings", nameHy: "Ողջույններ", emoji: "👋", description: "Բարևներ և ներկայացում" },
  { id: "home", nameHy: "Տուն", emoji: "🏠", description: "Տուն և կահույք" },
  { id: "food", nameHy: "Սնունդ", emoji: "🍎", description: "Ուտելիք և խմիչք" },
  { id: "family", nameHy: "Ընտանիք", emoji: "👨‍👩‍👧", description: "Ընտանիքի անդամներ" },
  { id: "work", nameHy: "Աշխատանք", emoji: "💼", description: "Մասնագիտություններ" },
  { id: "education", nameHy: "Կրթություն", emoji: "🏫", description: "Դպրոց և ուսում" },
  { id: "transport", nameHy: "Տրանսպորտ", emoji: "🚗", description: "Տեղաշարժ" },
  { id: "travel", nameHy: "Ճանապարհորդություն", emoji: "✈️", description: "Ուղևորություն" },
  { id: "shopping", nameHy: "Գնումներ", emoji: "🛍", description: "Խանութ և գներ" },
  { id: "feelings", nameHy: "Զգացմունքներ", emoji: "❤️", description: "Հույզեր" },
  { id: "weather", nameHy: "Եղանակ", emoji: "🌦", description: "Եղանակի նկարագրություն" },
  { id: "health", nameHy: "Առողջություն", emoji: "🏥", description: "Մարմին և բժիշկ" },
  { id: "restaurant", nameHy: "Ռեստորան", emoji: "🍽", description: "Պատվիրել և վճարել" },
  { id: "city", nameHy: "Քաղաք", emoji: "🏙", description: "Քաղաքի վայրեր" },
  { id: "time", nameHy: "Ժամանակ", emoji: "🕐", description: "Ժամեր և օրեր" },
  { id: "everyday", nameHy: "Առօրյա արտահայտություններ", emoji: "💬", description: "Օգտակար արտահայտություններ" },
];

export const VOCABULARY: VocabItem[] = [
  // Greetings A1
  { id: "v1", french: "Bonjour", armenian: "Բարև ձեզ", pronunciation: "բոնժուր", exampleFr: "Bonjour, madame.", exampleHy: "Բարև ձեզ, տիկին։", category: "greetings", level: "A1" },
  { id: "v2", french: "Salut", armenian: "Բարև (ընկերական)", pronunciation: "սալյու", exampleFr: "Salut, ça va ?", exampleHy: "Բարև, ինչպե՞ս ես։", category: "greetings", level: "A1" },
  { id: "v3", french: "Bonsoir", armenian: "Բարի երեկո", pronunciation: "բոնսուար", exampleFr: "Bonsoir, monsieur.", exampleHy: "Բարի երեկո, պարոն։", category: "greetings", level: "A1" },
  { id: "v4", french: "Au revoir", armenian: "Ցտեսություն", pronunciation: "օ ռըվուար", exampleFr: "Au revoir et à bientôt !", exampleHy: "Ցտեսություն և շուտով կտեսնվենք։", category: "greetings", level: "A1" },
  { id: "v5", french: "Enchanté(e)", armenian: "Շատ հաճելի է", pronunciation: "անշանթե", exampleFr: "Enchanté de faire votre connaissance.", exampleHy: "Շատ հաճելի է ձեզ ճանաչել։", category: "greetings", level: "A1" },
  { id: "v6", french: "Merci beaucoup", armenian: "Շատ շնորհակալություն", pronunciation: "մերսի բոկու", exampleFr: "Merci beaucoup pour votre aide.", exampleHy: "Շատ շնորհակալություն ձեր օգնության համար։", category: "everyday", level: "A1" },
  { id: "v7", french: "S'il vous plaît", armenian: "Խնդրում եմ (դուք)", pronunciation: "սիլ վու պլե", exampleFr: "Un café, s'il vous plaît.", exampleHy: "Մի սուրճ, խնդրում եմ։", category: "everyday", level: "A1" },
  { id: "v8", french: "Pardon", armenian: "Ներողություն", pronunciation: "պարդոն", exampleFr: "Pardon, je suis en retard.", exampleHy: "Ներողություն, ես ուշացել եմ։", category: "everyday", level: "A1" },
  // Family
  { id: "v9", french: "La famille", armenian: "Ընտանիք", pronunciation: "լա ֆամիյ", exampleFr: "J'aime ma famille.", exampleHy: "Ես սիրում եմ իմ ընտանիքը։", category: "family", level: "A1" },
  { id: "v10", french: "Le père", armenian: "Հայր", pronunciation: "լը պեր", exampleFr: "Mon père travaille.", exampleHy: "Իմ հայրը աշխատում է։", category: "family", level: "A1" },
  { id: "v11", french: "La mère", armenian: "Մայր", pronunciation: "լա մեր", exampleFr: "Ma mère cuisine bien.", exampleHy: "Իմ մայրը լավ է պատրաստում։", category: "family", level: "A1" },
  { id: "v12", french: "Le frère", armenian: "Եղբայր", pronunciation: "լը ֆրեր", exampleFr: "Mon frère a 20 ans.", exampleHy: "Իմ եղբայրը 20 տարեկան է։", category: "family", level: "A1" },
  { id: "v13", french: "La sœur", armenian: "Քույր", pronunciation: "լա սյոր", exampleFr: "Ma sœur habite à Lyon.", exampleHy: "Իմ քույրը ապրում է Լիոնում։", category: "family", level: "A1" },
  // Food
  { id: "v14", french: "Le pain", armenian: "Հաց", pronunciation: "լը պեն", exampleFr: "Je mange du pain.", exampleHy: "Ես հաց եմ ուտում։", category: "food", level: "A1" },
  { id: "v15", french: "L'eau", armenian: "Ջուր", pronunciation: "լո", exampleFr: "Je bois de l'eau.", exampleHy: "Ես ջուր եմ խմում։", category: "food", level: "A1" },
  { id: "v16", french: "Le café", armenian: "Սուրճ", pronunciation: "լը կաֆե", exampleFr: "Un café, s'il vous plaît.", exampleHy: "Մի սուրճ, խնդրում եմ։", category: "food", level: "A1" },
  { id: "v17", french: "Le fromage", armenian: "Պանիր", pronunciation: "լը ֆրոմաժ", exampleFr: "J'adore le fromage français.", exampleHy: "Ես շատ եմ սիրում ֆրանսիական պանիր։", category: "food", level: "A2" },
  { id: "v18", french: "Le restaurant", armenian: "Ռեստորան", pronunciation: "լը ռեստորան", exampleFr: "Nous allons au restaurant.", exampleHy: "Մենք գնում ենք ռեստորան։", category: "restaurant", level: "A1" },
  // Home
  { id: "v19", french: "La maison", armenian: "Տուն", pronunciation: "լա մեզոն", exampleFr: "Ma maison est grande.", exampleHy: "Իմ տունը մեծ է։", category: "home", level: "A1" },
  { id: "v20", french: "La chambre", armenian: "Ննջասենյակ", pronunciation: "լա շամբր", exampleFr: "Ma chambre est petite.", exampleHy: "Իմ ննջասենյակը փոքր է։", category: "home", level: "A1" },
  { id: "v21", french: "La cuisine", armenian: "Խոհանոց", pronunciation: "լա կյուզին", exampleFr: "Je suis dans la cuisine.", exampleHy: "Ես խոհանոցում եմ։", category: "home", level: "A1" },
  // Work
  { id: "v22", french: "Le travail", armenian: "Աշխատանք", pronunciation: "լը տրավայ", exampleFr: "J'aime mon travail.", exampleHy: "Ես սիրում եմ իմ աշխատանքը։", category: "work", level: "A2" },
  { id: "v23", french: "Le bureau", armenian: "Գրասենյակ", pronunciation: "լը բյուրո", exampleFr: "Je travaille au bureau.", exampleHy: "Ես աշխատում եմ գրասենյակում։", category: "work", level: "A2" },
  { id: "v24", french: "L'étudiant(e)", armenian: "Ուսանող(ուհի)", pronunciation: "լեթյուդյան", exampleFr: "Je suis étudiant.", exampleHy: "Ես ուսանող եմ։", category: "education", level: "A1" },
  // Travel / transport
  { id: "v25", french: "Le train", armenian: "Գնացք", pronunciation: "լը տրեն", exampleFr: "Je prends le train.", exampleHy: "Ես գնացք եմ նստում։", category: "transport", level: "A1" },
  { id: "v26", french: "L'avion", armenian: "Ինքնաթիռ", pronunciation: "լավյոն", exampleFr: "L'avion part à midi.", exampleHy: "Ինքնաթիռը մեկնում է կեսօրին։", category: "travel", level: "A2" },
  { id: "v27", french: "L'hôtel", armenian: "Հյուրանոց", pronunciation: "լոթել", exampleFr: "Nous réservons un hôtel.", exampleHy: "Մենք հյուրանոց ենք ամրագրում։", category: "travel", level: "A2" },
  // Feelings
  { id: "v28", french: "Content(e)", armenian: "Ուրախ", pronunciation: "կոնտան", exampleFr: "Je suis content.", exampleHy: "Ես ուրախ եմ։", category: "feelings", level: "A1" },
  { id: "v29", french: "Fatigué(e)", armenian: "Հոգնած", pronunciation: "ֆատիգե", exampleFr: "Je suis fatigué aujourd'hui.", exampleHy: "Այսօր հոգնած եմ։", category: "feelings", level: "A1" },
  { id: "v30", french: "Triste", armenian: "Տխուր", pronunciation: "տրիստ", exampleFr: "Elle est triste.", exampleHy: "Նա տխուր է։", category: "feelings", level: "A1" },
  // Weather
  { id: "v31", french: "Il fait beau", armenian: "Գեղեցիկ եղանակ է", pronunciation: "իլ ֆե բո", exampleFr: "Il fait beau aujourd'hui.", exampleHy: "Այսօր գեղեցիկ եղանակ է։", category: "weather", level: "A1" },
  { id: "v32", french: "Il pleut", armenian: "Անձրևում է", pronunciation: "իլ պլո", exampleFr: "Il pleut beaucoup.", exampleHy: "Շատ է անձրևում։", category: "weather", level: "A1" },
  // Time
  { id: "v33", french: "Aujourd'hui", armenian: "Այսօր", pronunciation: "օժուրդյուի", exampleFr: "Aujourd'hui, je travaille.", exampleHy: "Այսօր ես աշխատում եմ։", category: "time", level: "A1" },
  { id: "v34", french: "Demain", armenian: "Վաղը", pronunciation: "դըմեն", exampleFr: "À demain !", exampleHy: "Վաղը կտեսնվենք։", category: "time", level: "A1" },
  { id: "v35", french: "Hier", armenian: "Երեկ", pronunciation: "յեր", exampleFr: "Hier, j'ai étudié.", exampleHy: "Երեկ ես սովորել եմ։", category: "time", level: "A2" },
  // City
  { id: "v36", french: "La rue", armenian: "Փողոց", pronunciation: "լա ռյու", exampleFr: "J'habite dans cette rue.", exampleHy: "Ես ապրում եմ այս փողոցում։", category: "city", level: "A1" },
  { id: "v37", french: "Le magasin", armenian: "Խանութ", pronunciation: "լը մագազեն", exampleFr: "Le magasin est ouvert.", exampleHy: "Խանութը բաց է։", category: "shopping", level: "A1" },
  { id: "v38", french: "Combien ça coûte ?", armenian: "Որքա՞ն արժե", pronunciation: "կոմբյեն սա կուտ", exampleFr: "Combien ça coûte ?", exampleHy: "Որքա՞ն է արժե սա։", category: "shopping", level: "A2" },
  // Health
  { id: "v39", french: "Le médecin", armenian: "Բժիշկ", pronunciation: "լը մեդսեն", exampleFr: "Je vais chez le médecin.", exampleHy: "Ես գնում եմ բժշկի մոտ։", category: "health", level: "A2" },
  { id: "v40", french: "J'ai mal à la tête", armenian: "Գլուխս ցավում է", pronunciation: "ժե մալ ա լա տետ", exampleFr: "J'ai mal à la tête.", exampleHy: "Գլուխս ցավում է։", category: "health", level: "A2" },
  // B1/B2
  { id: "v41", french: "Néanmoins", armenian: "Այնուամենայնիվ", pronunciation: "նեանմուեն", exampleFr: "Néanmoins, je continue.", exampleHy: "Այնուամենայնիվ, շարունակում եմ։", category: "everyday", level: "B1" },
  { id: "v42", french: "En revanche", armenian: "Ի հակառակը", pronunciation: "ան ռըվանշ", exampleFr: "En revanche, elle est ponctuelle.", exampleHy: "Ի հակառակը, նա ժամանակին է։", category: "everyday", level: "B1" },
  { id: "v43", french: "À mon avis", armenian: "Իմ կարծիքով", pronunciation: "ա մոն ավի", exampleFr: "À mon avis, c'est important.", exampleHy: "Իմ կարծիքով սա կարևոր է։", category: "everyday", level: "B1" },
  { id: "v44", french: "Il convient de", armenian: "Պատշաճ է / պետք է", pronunciation: "իլ կոնվյեն դը", exampleFr: "Il convient de réfléchir.", exampleHy: "Պետք է մտածել։", category: "everyday", level: "B2" },
  { id: "v45", french: "Par conséquent", armenian: "Հետևաբար", pronunciation: "պար կոնսեկան", exampleFr: "Par conséquent, nous partons.", exampleHy: "Հետևաբար մենք մեկնում ենք։", category: "everyday", level: "B2" },
];
