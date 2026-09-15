import { dinero } from 'dinero.js';
import { describe, expect, it } from 'vitest';
import { CurrencyMap } from './currencies';
import {
  convertRatesToDineroFormat,
  dineroFromFloat,
  getInverseRates,
  isDinero,
  prettyPrint,
} from './money';

describe('money', () => {
  it('isDinero identifies Dinero objects', () => {
    const money = dinero({ amount: 100, currency: CurrencyMap.USD! });
    expect(isDinero(money)).toBe(true);
    expect(isDinero({ amount: 100 })).toBe(false);
    expect(isDinero(null)).toBe(false);
  });

  it('dineroFromFloat converts a float amount into minor units', () => {
    const money = dineroFromFloat({ amount: 19.99, currency: CurrencyMap.USD! });
    expect(money.toJSON()).toMatchObject({ amount: 1999, currency: { code: 'USD' } });
  });

  it('dineroFromFloat handles zero-decimal currencies', () => {
    const money = dineroFromFloat({ amount: 500, currency: CurrencyMap.JPY! });
    expect(money.toJSON()).toMatchObject({ amount: 500, currency: { code: 'JPY' } });
  });

  it('getInverseRates returns the base currency keyed to the target rate', () => {
    const rates = { EUR: { amount: 9200, scale: 6 } };
    expect(getInverseRates('EUR', 'USD', rates)).toEqual({ USD: { amount: 9200, scale: 6 } });
  });

  it('getInverseRates throws when the target currency has no rate', () => {
    expect(() => getInverseRates('EUR', 'USD', {})).toThrow(/Unable to find rate/);
  });

  it('convertRatesToDineroFormat scales a flat rate map into Dinero-compatible rates', () => {
    const result = convertRatesToDineroFormat({ EUR: 0.92 }, CurrencyMap);
    expect(result.EUR).toEqual({ amount: 920000, scale: 6 });
  });

  it('prettyPrint formats a Dinero value as a localized currency string', () => {
    const money = dineroFromFloat({ amount: 19.99, currency: CurrencyMap.USD! });
    expect(prettyPrint(money)).toBe('$19.99');
  });

  it('prettyPrint respects an overrideCurrency', () => {
    const money = dineroFromFloat({ amount: 19.99, currency: CurrencyMap.USD! });
    expect(prettyPrint(money, { overrideCurrency: 'EUR' })).toMatch(/€/);
  });
});
