export type QuizItem = {
  id: string;
  image: string;
  french: string;
  armenian: string;
  options: string[];
};

/** Image quiz: what is this in French? */
export const QUIZ_ITEMS: QuizItem[] = [
  {
    id: "q1",
    image: "/caxik.jpg",
    french: "La fleur",
    armenian: "Ծաղիկ",
    options: ["La fleur", "Le livre", "Le chat", "La maison"],
  },
  {
    id: "q2",
    image: "/cafe.jpg",
    french: "Le café",
    armenian: "Սուրճ / սրճարան",
    options: ["Le thé", "Le café", "Le pain", "L'eau"],
  },
  {
    id: "q3",
    image: "/paris.jpg",
    french: "Paris",
    armenian: "Փարիզ",
    options: ["Lyon", "Paris", "Nice", "Marseille"],
  },
  {
    id: "q4",
    image: "/luvr.jpg",
    french: "Le Louvre",
    armenian: "Լուվր",
    options: ["Le Louvre", "La Tour Eiffel", "Notre-Dame", "Le métro"],
  },
  {
    id: "q5",
    image: "/luvr1.jpg",
    french: "Le musée",
    armenian: "Թանգարան",
    options: ["Le magasin", "Le musée", "L'école", "Le parc"],
  },
  {
    id: "q6",
    image: "/luvr2.jpg",
    french: "La pyramide",
    armenian: "Բուրգ",
    options: ["La pyramide", "Le pont", "La rue", "Le jardin"],
  },
  {
    id: "q7",
    image: "/arka.jpg",
    french: "L'Arc de Triomphe",
    armenian: "Հաղթանակի կամար",
    options: ["L'Arc de Triomphe", "La tour", "Le château", "Le port"],
  },
  {
    id: "q8",
    image: "/cafe1.jpg",
    french: "Le restaurant",
    armenian: "Ռեստորան / սրճարան",
    options: ["L'hôtel", "Le restaurant", "La banque", "La gare"],
  },
  {
    id: "q9",
    image: "/dior.jpg",
    french: "Le magasin",
    armenian: "Խանութ",
    options: ["Le magasin", "L'école", "L'hôpital", "Le cinéma"],
  },
  {
    id: "q10",
    image: "/axjikshun.jpg",
    french: "La femme",
    armenian: "Կին / աղջիկ",
    options: ["L'homme", "La femme", "L'enfant", "Le chien"],
  },
  {
    id: "q11",
    image: "/snund.jpg",
    french: "La nourriture",
    armenian: "Սնունդ",
    options: ["La nourriture", "La boisson", "Le sport", "Le livre"],
  },
  {
    id: "q12",
    image: "/tun.jpg",
    french: "La maison",
    armenian: "Տուն",
    options: ["La voiture", "La maison", "L'avion", "Le train"],
  },
];
