import type { Dinero } from 'dinero.js';

/** A currency's numeral system: how many minor units make one major unit, and the base of that system. */
export interface CurrencyDefinition {
  code: string;
  base: 5 | 10;
  exponent: number;
}

/** A flat map of currency code to its exchange rate against some implicit base currency. */
export type Rates = Record<string, number>;

/** A Dinero-compatible rate representation: an integer amount at a given decimal scale. */
export interface CurrencyRate {
  amount: number;
  scale: number;
}

/** A single selectable currency, for use in dropdowns/comboboxes. */
export interface CurrencyOption {
  value: string;
  label: string;
}

/** Number formatting style, matching `Intl.NumberFormat`'s `notation` option. */
export type Notation = 'standard' | 'compact';

/** Options controlling how a money value is rendered as a string. */
export interface FormatOptions {
  notation?: Notation;
  currencyDisplay?: 'code' | 'symbol' | 'narrowSymbol' | 'name';
  overrideCurrency?: string;
}

/** The result of evaluating a natural-language financial expression. */
export interface EvaluatedExpression {
  value: Dinero<number>;
  currency: string;
}

/** A bare numeric amount extracted from an expression, with its detected currency (if any). */
export interface ParsedAmount {
  currency: string;
  amount: number;
}
