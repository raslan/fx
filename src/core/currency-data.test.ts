import { describe, expect, it } from 'vitest';
import { CURRENCY_DATA } from './currency-data';

describe('CURRENCY_DATA', () => {
  it('contains exactly 156 currencies', () => {
    expect(Object.keys(CURRENCY_DATA)).toHaveLength(156);
  });

  it('does not include ILS (explicitly unsupported)', () => {
    expect(CURRENCY_DATA.ILS).toBeUndefined();
  });

  it('includes STN, SYP, ZWL (explicitly re-added)', () => {
    expect(CURRENCY_DATA.STN).toEqual({ code: 'STN', base: 10, exponent: 2 });
    expect(CURRENCY_DATA.SYP).toEqual({ code: 'SYP', base: 10, exponent: 2 });
    expect(CURRENCY_DATA.ZWL).toEqual({ code: 'ZWL', base: 10, exponent: 2 });
  });

  it('has base-5 currencies where ISO 4217 specifies base 5 (MGA, MRU)', () => {
    expect(CURRENCY_DATA.MGA).toEqual({ code: 'MGA', base: 5, exponent: 1 });
    expect(CURRENCY_DATA.MRU).toEqual({ code: 'MRU', base: 5, exponent: 1 });
  });

  it('has zero-decimal currencies with exponent 0 (JPY, KRW)', () => {
    expect(CURRENCY_DATA.JPY).toEqual({ code: 'JPY', base: 10, exponent: 0 });
    expect(CURRENCY_DATA.KRW).toEqual({ code: 'KRW', base: 10, exponent: 0 });
  });

  it('every entry\'s code key matches its own code field', () => {
    for (const [key, def] of Object.entries(CURRENCY_DATA)) {
      expect(def.code).toBe(key);
    }
  });
});
