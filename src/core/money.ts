import { type Dinero, type DineroCurrency, convert, dinero, toDecimal } from 'dinero.js';
import type { CurrencyRate, FormatOptions } from './types';

/** True if `value` looks like a Dinero object (has a `toJSON` method). */
export function isDinero(value: unknown): value is Dinero<number> {
  return !!value && typeof (value as Record<string, unknown>).toJSON === 'function';
}

/** Builds a Dinero value from a human-entered float (e.g. `19.99`), scaling it into the currency's minor units. */
export function dineroFromFloat({
  amount: float,
  currency,
}: {
  amount: number;
  currency: DineroCurrency<number>;
}): Dinero<number> {
  const baseValue = Array.isArray(currency.base) ? currency.base[0] : currency.base;
  const factor = baseValue ** currency.exponent;
  const amount = Math.round(float * factor);
  return dinero({ amount, currency });
}

/**
 * Rate-provider maps are always expressed as "1 base = X target".
 * Dinero's `convert` wants the inverse: "1 target = Y base". This flips
 * a single target currency's rate into that shape.
 */
export function getInverseRates(
  targetCurrency: string,
  baseCurrency: string,
  rates: Record<string, CurrencyRate>,
): Record<string, CurrencyRate> {
  const targetRate = rates[targetCurrency];
  if (!targetRate) {
    throw new Error(`Unable to find rate for target currency: ${targetCurrency}`);
  }
  return { [baseCurrency]: { amount: targetRate.amount, scale: targetRate.scale } };
}

/**
 * Converts a flat `{ code: rate }` map (as returned by `fetchOfficialRates`)
 * into Dinero's integer-amount-at-a-scale representation, adding four
 * extra digits of scale over the currency's own exponent for precision
 * headroom during multiplication.
 */
export function convertRatesToDineroFormat(
  rates: Record<string, number>,
  currencyMap: Record<string, DineroCurrency<number>>,
): Record<string, CurrencyRate> {
  const dineroRates: Record<string, CurrencyRate> = {};
  for (const currencyCode in rates) {
    const rate = rates[currencyCode];
    if (rate === undefined) continue;
    const currency = currencyMap[currencyCode.toUpperCase()];
    if (currency) {
      const scale = currency.exponent || 2;
      const integerRate = Math.round(rate * 10 ** (scale + 4));
      dineroRates[currencyCode] = { amount: integerRate, scale: scale + 4 };
    }
  }
  return dineroRates;
}

function createTransformer(formatOptions?: FormatOptions) {
  return ({ value, currency }: { value: string; currency: { code: string } }) =>
    Number(value).toLocaleString('en-US', {
      style: 'currency',
      currency: formatOptions?.overrideCurrency ?? currency.code,
      ...(formatOptions?.notation && { notation: formatOptions.notation }),
      ...(formatOptions?.currencyDisplay && { currencyDisplay: formatOptions.currencyDisplay }),
    });
}

/** Renders a Dinero value as a localized currency string, e.g. `"$19.99"`. */
export function prettyPrint(value: Dinero<number>, formatOptions?: FormatOptions): string {
  return toDecimal(value, createTransformer(formatOptions));
}

export { convert };
