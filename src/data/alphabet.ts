export const FRENCH_ALPHABET = [
  { letter: "a", name: "a", speak: "a" },
  { letter: "b", name: "bé", speak: "bé" },
  { letter: "c", name: "cé", speak: "cé" },
  { letter: "d", name: "dé", speak: "dé" },
  { letter: "e", name: "e", speak: "e" },
  { letter: "f", name: "effe", speak: "effe" },
  { letter: "g", name: "gé", speak: "gé" },
  { letter: "h", name: "ache", speak: "ache" },
  { letter: "i", name: "i", speak: "i" },
  { letter: "j", name: "ji", speak: "ji" },
  { letter: "k", name: "ka", speak: "ka" },
  { letter: "l", name: "elle", speak: "elle" },
  { letter: "m", name: "emme", speak: "emme" },
  { letter: "n", name: "enne", speak: "enne" },
  { letter: "o", name: "o", speak: "o" },
  { letter: "p", name: "pé", speak: "pé" },
  { letter: "q", name: "ku", speak: "ku" },
  { letter: "r", name: "erre", speak: "erre" },
  { letter: "s", name: "esse", speak: "esse" },
  { letter: "t", name: "té", speak: "té" },
  { letter: "u", name: "u", speak: "u" },
  { letter: "v", name: "vé", speak: "vé" },
  { letter: "w", name: "double vé", speak: "double vé" },
  { letter: "x", name: "ixe", speak: "ixe" },
  { letter: "y", name: "i grec", speak: "i grec" },
  { letter: "z", name: "zède", speak: "zède" },
] as const;

export const LETTER_COMBINATIONS = [
  { combo: "ch", speak: "ch", example: "chat", meaningHy: "կատու" },
  { combo: "ou", speak: "ou", example: "vous", meaningHy: "դուք" },
  { combo: "on", speak: "on", example: "bon", meaningHy: "լավ" },
  { combo: "an", speak: "an", example: "dans", meaningHy: "մեջ" },
  { combo: "en", speak: "en", example: "enfant", meaningHy: "երեխա" },
  { combo: "in", speak: "in", example: "vin", meaningHy: "գինի" },
  { combo: "oi", speak: "oi", example: "moi", meaningHy: "ես (ինձ)" },
  { combo: "eu", speak: "eu", example: "deux", meaningHy: "երկու" },
  { combo: "au", speak: "au", example: "eau", meaningHy: "ջուր" },
  { combo: "eau", speak: "eau", example: "beau", meaningHy: "գեղեցիկ" },
  { combo: "ai", speak: "ai", example: "maison", meaningHy: "տուն" },
  { combo: "ei", speak: "ei", example: "neige", meaningHy: "ձյուն" },
  { combo: "gn", speak: "gn", example: "montagne", meaningHy: "լեռ" },
  { combo: "ill", speak: "ill", example: "fille", meaningHy: "աղջիկ" },
  { combo: "qu", speak: "qu", example: "qui", meaningHy: "ո՞վ" },
  { combo: "ph", speak: "ph", example: "photo", meaningHy: "լուսանկար" },
  { combo: "th", speak: "th", example: "théâtre", meaningHy: "թատրոն" },
  { combo: "tion", speak: "tion", example: "nation", meaningHy: "ազգ" },
] as const;

export const READING_TEXTS = [
  {
    id: "r1",
    level: "A1" as const,
    titleHy: "Ներկայացում",
    french:
      "Bonjour ! Je m'appelle Anna. J'habite à Paris. Je suis étudiante. J'aime le français.",
    armenian:
      "Բարև ձեզ։ Իմ անունը Աննա է։ Ես ապրում եմ Փարիզում։ Ես ուսանող եմ։ Ես սիրում եմ ֆրանսերենը։",
    keywords: ["bonjour", "appelle", "habite", "paris", "etudiante", "aime", "francais"],
  },
  {
    id: "r2",
    level: "A1" as const,
    titleHy: "Ընտանիք",
    french:
      "Voici ma famille. Mon père s'appelle Paul. Ma mère s'appelle Marie. J'ai un frère et une sœur.",
    armenian:
      "Ահա իմ ընտանիքը։ Իմ հոր անունը Պոլ է։ Իմ մոր անունը Մարի է։ Ես ունեմ եղբայր և քույր։",
    keywords: ["famille", "pere", "mere", "frere", "soeur"],
  },
  {
    id: "r3",
    level: "A1" as const,
    titleHy: "Առօրյա",
    french:
      "Aujourd'hui, je vais à l'école. Le matin, je prends un café. Le soir, je lis un livre.",
    armenian:
      "Այսօր ես գնում եմ դպրոց։ Առավոտյան սուրճ եմ խմում։ Երեկոյան գիրք եմ կարդում։",
    keywords: ["aujourd", "vais", "ecole", "matin", "cafe", "soir", "livre"],
  },
  {
    id: "r4",
    level: "A1" as const,
    titleHy: "Ճանապարհորդություն",
    french:
      "Je vais en France. Je vais à Lyon. Demain, nous allons au musée. J'aime voyager.",
    armenian:
      "Ես գնում եմ Ֆրանսիա։ Ես գնում եմ Լիոն։ Վաղը մենք գնում ենք թանգարան։ Ես սիրում եմ ճանապարհորդել։",
    keywords: ["vais", "france", "lyon", "demain", "musee", "voyager"],
  },
];
