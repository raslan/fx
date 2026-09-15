import { describe, expect, it } from 'vitest';
import { prettyPrint } from './money';
import { calculateInputNumber, evaluateNaturalExpression } from './tokenizer';

// Rates here are already in the "inverted" shape fetchExchangeRates
// produces by default: units of the base currency per 1 unit of the
// target currency, e.g. 1 EUR = ~1.087 USD.
const rates = { USD: 1, EUR: 1 / 0.92, JPY: 1 / 150 };

describe('evaluateNaturalExpression', () => {
  it('evaluates a plain number in the base currency', () => {
    const result = evaluateNaturalExpression('20', 'USD', rates);
    expect(result.currency).toBe('USD');
    expect(prettyPrint(result.value)).toBe('$20.00');
  });

  it('converts an amount tagged with a currency code into the base currency', () => {
    const result = evaluateNaturalExpression('100 eur', 'USD', rates);
    expect(result.currency).toBe('USD');
    expect(prettyPrint(result.value)).toBe('$108.70');
  });

  it('resolves currency symbols to codes ($ € £)', () => {
    const result = evaluateNaturalExpression('$20', 'USD', rates);
    expect(prettyPrint(result.value)).toBe('$20.00');
  });

  it('supports arithmetic mixed with a currency amount', () => {
    const result = evaluateNaturalExpression('20 usd + 5', 'USD', rates);
    expect(prettyPrint(result.value)).toBe('$25.00');
  });

  it('supports shorthand magnitude suffixes (k, m)', () => {
    const result = evaluateNaturalExpression('2k', 'USD', rates);
    expect(prettyPrint(result.value)).toBe('$2,000.00');
  });

  it('supports word magnitudes (thousand, million)', () => {
    const result = evaluateNaturalExpression('2 thousand', 'USD', rates);
    expect(prettyPrint(result.value)).toBe('$2,000.00');
  });

  it('throws a descriptive error for an unparseable expression', () => {
    expect(() => evaluateNaturalExpression('not a number', 'USD', rates)).toThrow(
      /An error occurred while evaluating the expression/,
    );
  });
});

describe('calculateInputNumber', () => {
  it('extracts the currency code and numeric amount from a tagged expression', () => {
    expect(calculateInputNumber('100 eur')).toEqual({ currency: 'EUR', amount: 100 });
  });

  it('evaluates arithmetic in the extracted amount', () => {
    expect(calculateInputNumber('usd20 + 5')).toEqual({ currency: 'USD', amount: 25 });
  });
});
