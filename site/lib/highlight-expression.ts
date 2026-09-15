export interface ExpressionToken {
  text: string;
  kind: 'number' | 'currency' | 'operator' | 'text';
}

const TOKEN_RE =
  /(?<number>\d[\d,]*\.?\d*[kKmMbBtT]?|\b(?:thousand|million|billion|trillion)\b)|(?<currency>[$€£]|(?<![A-Za-z])[A-Za-z]{3,4}(?![A-Za-z]))|(?<operator>[+\-*/^%()])/g;

/** Decorative-only approximation of fx's parsing rules, for coloring the landing-page input. */
export function tokenizeExpression(input: string): ExpressionToken[] {
  const tokens: ExpressionToken[] = [];
  let cursor = 0;

  for (const match of input.matchAll(TOKEN_RE)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      tokens.push({ text: input.slice(cursor, index), kind: 'text' });
    }
    const groups = match.groups ?? {};
    const kind = groups.number ? 'number' : groups.currency ? 'currency' : 'operator';
    tokens.push({ text: match[0], kind });
    cursor = index + match[0].length;
  }

  if (cursor < input.length) {
    tokens.push({ text: input.slice(cursor), kind: 'text' });
  }

  return tokens;
}
