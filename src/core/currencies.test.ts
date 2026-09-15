import { describe, expect, it } from 'vitest';
import { CurrencyMap, currencyOptions, getCurrencyName } from './currencies';

describe('currencies', () => {
  it('CurrencyMap re-exposes CURRENCY_DATA by code', () => {
    expect(CurrencyMap.USD).toEqual({ code: 'USD', base: 10, exponent: 2 });
  });

  it('getCurrencyName returns a human name with the code appended', () => {
    expect(getCurrencyName('USD')).toBe('US Dollar (USD)');
  });

  it('currencyOptions has one entry per supported currency', () => {
    expect(currencyOptions).toHaveLength(156);
  });

  it('currencyOptions sorts popular currencies (USD, EUR, GBP, EGP) first', () => {
    const firstFour = currencyOptions.slice(0, 4).map((o) => o.value);
    expect(firstFour).toEqual(['USD', 'EUR', 'GBP', 'EGP']);
  });
});
