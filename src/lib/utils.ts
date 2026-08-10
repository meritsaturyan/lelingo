export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function normalizeFrench(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "'")
    .replace(/[^\w\s']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function compareDictation(
  expected: string,
  actual: string
): { score: number; mistakes: { expected: string; actual: string; index: number }[]; accentOnly: boolean } {
  const expWords = expected.trim().split(/\s+/);
  const actWords = actual.trim().split(/\s+/);
  const mistakes: { expected: string; actual: string; index: number }[] = [];
  let accentOnly = true;
  const maxLen = Math.max(expWords.length, actWords.length);

  for (let i = 0; i < maxLen; i++) {
    const e = expWords[i] ?? "";
    const a = actWords[i] ?? "";
    if (e !== a) {
      mistakes.push({ expected: e || "(բացակայում է)", actual: a || "(բացակայում է)", index: i });
      if (normalizeFrench(e) !== normalizeFrench(a)) {
        accentOnly = false;
      }
    }
  }

  const correct = maxLen - mistakes.length;
  const score = maxLen === 0 ? 0 : Math.round((correct / maxLen) * 10);
  return { score, mistakes, accentOnly: accentOnly && mistakes.length > 0 };
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getDayOfWeek(): number {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1; // Mon=0 ... Sun=6
}

export function weekDayKeys(): string[] {
  const days = ["Կիր", "Երկ", "Երք", "Չոր", "Հին", "Ուր", "Շաբ"];
  // Return Mon-Sun labels for calendar
  return ["Երկ", "Երք", "Չոր", "Հին", "Ուր", "Շաբ", "Կիր"];
}

export function evaluateSpeaking(
  transcript: string,
  expectedKeywords: string[]
): {
  total: number;
  vocabulary: number;
  grammar: number;
  fluency: number;
  completeness: number;
  corrections: { said: string; correct: string; explanationHy: string }[];
} {
  const normalized = normalizeFrench(transcript);
  const matched = expectedKeywords.filter((k) =>
    normalized.includes(normalizeFrench(k))
  );
  const vocabScore = Math.min(
    10,
    Math.round((matched.length / Math.max(expectedKeywords.length, 1)) * 10) ||
      (normalized.length > 5 ? 4 : 1)
  );

  const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
  const fluency = Math.min(10, Math.max(2, Math.round(wordCount / 2)));
  const completeness = Math.min(
    10,
    Math.round((matched.length / Math.max(expectedKeywords.length, 1)) * 10) || 3
  );

  const corrections: { said: string; correct: string; explanationHy: string }[] = [];
  let grammar = 8;

  if (/je suis habite/i.test(transcript) || /je suis habite/i.test(normalized)) {
    corrections.push({
      said: "Je suis habite",
      correct: "J'habite",
      explanationHy:
        "Ֆրանսերենում «ապրել» բայը conjugé է որպես «j'habite», ոչ թե «je suis habite»։",
    });
    grammar -= 2;
  }
  if (/je suis /i.test(transcript) && /habite/i.test(transcript)) {
    if (!corrections.length) {
      corrections.push({
        said: transcript.slice(0, 40),
        correct: "J'habite à…",
        explanationHy: "Օգտագործեք «j'habite»՝ բնակության վայրը նշելու համար։",
      });
      grammar -= 1;
    }
  }
  if (!transcript.trim()) {
    grammar = 0;
    return {
      total: 0,
      vocabulary: 0,
      grammar: 0,
      fluency: 0,
      completeness: 0,
      corrections: [
        {
          said: "(դատարկ)",
          correct: "Փորձեք կրկին խոսել",
          explanationHy: "Ձայնագրություն չի հայտնաբերվել։ Խնդրում ենք թույլատրել միկրոֆոնը։",
        },
      ],
    };
  }

  const total = Math.round(
    ((vocabScore + grammar + fluency + completeness) / 40) * 100
  );

  return {
    total,
    vocabulary: vocabScore,
    grammar: Math.max(0, grammar),
    fluency,
    completeness,
    corrections,
  };
}

export function motivationalMessage(streak: number): string {
  if (streak === 0) return "Սկսի՛ր այսօր․ ամեն մեծ ճանապարհ սկսվում է առաջին քայլից։";
  if (streak < 3) return "Լավ սկիզբ։ Շարունակի՛ր ամեն օր մի քիչ սովորել։";
  if (streak < 7) return `Շարունակի՛ր, դու արդեն ${streak} օր է սովորում ես։`;
  if (streak < 14) return `Հիանալի՛ է։ ${streak} օր անընդմեջ — դու կայուն ես դառնում։`;
  return `Անհավանական՛։ ${streak} օր անընդմեջ։ Ֆրանսերենը արդեն քո սովորույթն է։`;
}
