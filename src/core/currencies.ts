import { CURRENCY_DATA } from './currency-data';
import type { CurrencyDefinition, CurrencyOption } from './types';

/** Every currency code this library recognizes, keyed to its Dinero-compatible definition. */
export const CurrencyMap: Record<string, CurrencyDefinition> = CURRENCY_DATA;

/** Union of every supported currency code. */
export type CurrencyCode = keyof typeof CURRENCY_DATA;

/** Shared `Intl.DisplayNames` instance for rendering human-readable currency names. */
export const currencyNameFormatter = new Intl.DisplayNames(['en'], { type: 'currency' });

/** Returns a display name like "US Dollar (USD)" for a supported currency code. */
export function getCurrencyName(code: CurrencyCode): string {
  return `${currencyNameFormatter.of(code)} (${code})`;
}

const popularCurrencies = ['EGP', 'GBP', 'EUR', 'USD'];

/** Every supported currency as a `{ value, label }` option, most popular currencies first. */
export const currencyOptions: CurrencyOption[] = Object.keys(CURRENCY_DATA)
  .map((code) => ({ value: code, label: getCurrencyName(code) }))
  .sort((a, b) => popularCurrencies.indexOf(b.value) - popularCurrencies.indexOf(a.value));
