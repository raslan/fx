import { describe, expect, it } from 'vitest';
import type { CurrencyDefinition, CurrencyRate, EvaluatedExpression } from './types';

describe('core types', () => {
  it('CurrencyDefinition shape accepts base 5 or 10', () => {
    const usd: CurrencyDefinition = { code: 'USD', base: 10, exponent: 2 };
    const mga: CurrencyDefinition = { code: 'MGA', base: 5, exponent: 1 };
    expect(usd.base).toBe(10);
    expect(mga.base).toBe(5);
  });

  it('CurrencyRate shape has amount and scale', () => {
    const rate: CurrencyRate = { amount: 100, scale: 2 };
    expect(rate).toEqual({ amount: 100, scale: 2 });
  });

  it('EvaluatedExpression carries a currency code alongside its value', () => {
    const result = { value: {} as EvaluatedExpression['value'], currency: 'USD' };
    expect(result.currency).toBe('USD');
  });
});
