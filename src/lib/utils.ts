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

/** Compare dictation ignoring punctuation (. , ? !) and accents. */
export function compareDictation(
  expected: string,
  actual: string
): { score: number; mistakes: { expected: string; actual: string; index: number }[]; accentOnly: boolean } {
  const stripPunct = (s: string) =>
    s
      .replace(/[.,!?;:…«»"""''()[\]{}]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const expWords = stripPunct(expected).split(/\s+/).filter(Boolean);
  const actWords = stripPunct(actual).split(/\s+/).filter(Boolean);
  const mistakes: { expected: string; actual: string; index: number }[] = [];
  const maxLen = Math.max(expWords.length, actWords.length);

  for (let i = 0; i < maxLen; i++) {
    const e = expWords[i] ?? "";
    const a = actWords[i] ?? "";
    if (normalizeFrench(e) !== normalizeFrench(a)) {
      mistakes.push({
        expected: e || "(բացակայում է)",
        actual: a || "(բացակայում է)",
        index: i,
      });
    }
  }

  const correct = maxLen - mistakes.length;
  const score = maxLen === 0 ? 0 : Math.round((correct / maxLen) * 10);
  return { score, mistakes, accentOnly: false };
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
  const words = normalized.split(/\s+/).filter(Boolean);

  const fuzzyIncludes = (hay: string, needle: string) => {
    const n = normalizeFrench(needle);
    if (!n) return false;
    if (hay.includes(n)) return true;
    // STT often drops apostrophes / merges words
    const compactHay = hay.replace(/'/g, "").replace(/\s+/g, "");
    const compactNeedle = n.replace(/'/g, "").replace(/\s+/g, "");
    if (compactHay.includes(compactNeedle)) return true;
    // Allow small edit distance against any word
    return words.some((w) => {
      if (Math.abs(w.length - n.length) > 2) return false;
      let dist = 0;
      const a = w;
      const b = n;
      const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
        Array(b.length + 1).fill(0)
      );
      for (let i = 0; i <= a.length; i++) dp[i][0] = i;
      for (let j = 0; j <= b.length; j++) dp[0][j] = j;
      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          dp[i][j] =
            a[i - 1] === b[j - 1]
              ? dp[i - 1][j - 1]
              : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
      dist = dp[a.length][b.length];
      const maxLen = Math.max(a.length, b.length);
      return dist <= (maxLen <= 4 ? 1 : 2);
    });
  };

  const matched = expectedKeywords.filter((k) => fuzzyIncludes(normalized, k));
  const vocabScore = Math.min(
    10,
    Math.round((matched.length / Math.max(expectedKeywords.length, 1)) * 10) ||
      (normalized.length > 5 ? 5 : 1)
  );

  const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
  const fluency = Math.min(10, Math.max(2, Math.round(wordCount / 1.6)));
  const completeness = Math.min(
    10,
    Math.round((matched.length / Math.max(expectedKeywords.length, 1)) * 10) || 4
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

  // Missing keywords as soft corrections
  const missing = expectedKeywords.filter((k) => !fuzzyIncludes(normalized, k));
  for (const k of missing.slice(0, 3)) {
    corrections.push({
      said: "(չի լսվել)",
      correct: k,
      explanationHy: `Փորձե՛ք ավելացնել «${k}»՝ ավելի լրիվ պատասխանի համար։`,
    });
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
