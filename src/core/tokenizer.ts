import { type Dinero, toDecimal } from 'dinero.js';
import { evaluate } from 'mathjs';
import { CurrencyMap } from './currencies';
import { convert, convertRatesToDineroFormat, dineroFromFloat, getInverseRates, isDinero } from './money';
import type { CurrencyRate, EvaluatedExpression, ParsedAmount, Rates } from './types';

const SymbolCodeMap: Record<string, string> = { $: 'USD', '€': 'EUR', '£': 'GBP' };

function isNaNValue(input: unknown): boolean {
  return Number.isNaN(Number(input));
}

/** Uppercases a token and moves any trailing currency-code letters to the front (e.g. `"20usd"` -> `"USD20"`). */
function cleanString(inputString: string): string {
  const regex = /[A-Za-z]{3,4}$/;
  const match = inputString.match(regex);
  return (match ? match[0] + inputString.replace(regex, '') : inputString).toUpperCase();
}

/** Rejoins a number and an adjacent currency-code token that whitespace split apart (e.g. `["20", "usd"]` -> `["20usd"]`). */
function handleSpaces(inputArray: string[]): string[] {
  const outputArray: string[] = [];
  for (let i = 0; i < inputArray.length; i++) {
    const current = inputArray[i] as string;
    const next = inputArray[i + 1];
    const prev = inputArray[i - 1];
    if (!isNaNValue(+current)) {
      if (i + 1 < inputArray.length && next !== undefined && /^[A-Za-z]+$/.test(next)) {
        outputArray.push(current + next);
        i++;
      } else {
        outputArray.push(current);
      }
    } else if (/^[A-Za-z]+$/.test(current)) {
      if (i - 1 >= 0 && prev !== undefined && !isNaNValue(+prev)) {
        outputArray[outputArray.length - 1] = prev + current;
      } else if (i + 1 < inputArray.length && next !== undefined && !isNaNValue(+next)) {
        outputArray.push(current + next);
        i++;
      } else {
        outputArray.push(current);
      }
    } else {
      outputArray.push(current);
    }
  }
  return outputArray;
}

function strToDinero(str: string, baseCurrency: string, rates: Record<string, CurrencyRate>): Dinero<number> {
  const reg = /^([A-Z]+)(-?\d+)(?:\.(\d+))?$/;
  const matchString = str.match(reg);
  const currency = CurrencyMap[matchString?.[1] ?? ''];
  if (!currency) {
    throw new Error(`Unrecognized currency code in expression: "${str}"`);
  }
  const amountStr = `${matchString?.[2]}${matchString?.[3] ? `.${matchString[3]}` : ''}`;
  const amount = parseFloat(amountStr);
  const tempDineroObj = dineroFromFloat({ amount, currency });
  if (currency.code === baseCurrency) {
    return tempDineroObj;
  }
  const baseCurrencyDefinition = CurrencyMap[baseCurrency];
  if (!baseCurrencyDefinition) {
    throw new Error(`Unrecognized base currency: "${baseCurrency}"`);
  }
  const currencyRates = getInverseRates(currency.code, baseCurrency, rates);
  return convert(tempDineroObj, baseCurrencyDefinition, currencyRates);
}

function removeCurrencyFromDineroStr(str: string): number {
  const reg = /^([A-Z]+)(-?\d+)(?:\.(\d+))?$/;
  const matchString = str.match(reg);
  const amountStr = `${matchString?.[2]}${matchString?.[3] ? `.${matchString[3]}` : ''}`;
  return parseFloat(amountStr);
}

function extractCurrencyFromDineroStr(str: string): string {
  const reg = /^([A-Z]+)(-?\d+)(?:\.(\d+))?$/;
  const matchString = str.match(reg);
  const currency = CurrencyMap[matchString?.[1] ?? ''];
  if (!currency) {
    throw new Error(`Unrecognized currency code in expression: "${str}"`);
  }
  return currency.code;
}

function tokenizeInput(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/,/g, '')
    .replace(/[$€£]/g, (match) => SymbolCodeMap[match] ?? match)
    .replace(/[()]|\s+/g, (match) => {
      if (match === '(') return '( ';
      if (match === ')') return ' )';
      return ' ';
    })
    .replace(/([^a-zA-Z])([kmbtKMBT])(?![a-zA-Z])/g, (match, p1: string, p2: string) => {
      switch (p2) {
        case 'k':
          return `${p1} * 1000`;
        case 'm':
          return `${p1} * 1000000`;
        case 'b':
          return `${p1} * 1000000000`;
        case 't':
          return `${p1} * 1000000000000`;
        default:
          return match;
      }
    })
    .replace(/\b(thousand|million|billion|trillion)\b/g, (match) => {
      switch (match.toLowerCase()) {
        case 'thousand':
          return ' * 1000';
        case 'million':
          return ' * 1000000';
        case 'billion':
          return ' * 1000000000';
        case 'trillion':
          return ' * 1000000000000';
        default:
          return match;
      }
    })
    .split(' ');
}

/**
 * Parses a natural-language financial expression (currency symbols,
 * codes, magnitude words/suffixes, and arithmetic) and evaluates it
 * into a Dinero value in `baseCurrency`, converting any other
 * currencies mentioned using `rates` (a Dinero-format rate map for
 * `baseCurrency`, as produced by `convertRatesToDineroFormat`).
 */
export function evaluateNaturalExpression(
  input: string,
  baseCurrency: string,
  rates: Rates,
): EvaluatedExpression {
  try {
    const uniformExpression = tokenizeInput(input);
    const tokens = handleSpaces(uniformExpression).map(cleanString);
    const baseCurrencyExchangeRates = convertRatesToDineroFormat(rates, CurrencyMap);
    const formattedTokens = tokens.map((token) =>
      /[A-Z]{3,4}/.test(token) ? strToDinero(token, baseCurrency, baseCurrencyExchangeRates) : token,
    );
    const val = `${baseCurrency}${evaluate(
      formattedTokens
        .map((token) => (isDinero(token) ? toDecimal(token as Dinero<number>) : token))
        .join(' '),
    )}`;
    return {
      value: strToDinero(val, baseCurrency, baseCurrencyExchangeRates),
      currency: baseCurrency,
    };
  } catch (error) {
    throw new Error(`An error occurred while evaluating the expression: ${(error as Error)?.message}`);
  }
}

/**
 * Parses a natural-language expression into a bare `{ currency, amount }`
 * pair without converting currencies — the currency is whatever was
 * detected in the input, and the amount is the raw evaluated number.
 */
export function calculateInputNumber(input: string): ParsedAmount {
  try {
    const uniformExpression = tokenizeInput(input);
    const tokens = handleSpaces(uniformExpression).map(cleanString);
    const currencyToken = tokens.find((token) => /[A-Z]{3,4}/.test(token));
    if (!currencyToken) {
      throw new Error('No currency code found in expression');
    }
    const currency = extractCurrencyFromDineroStr(currencyToken);
    const formattedTokens = tokens.map((token) =>
      /[A-Z]{3,4}/.test(token) ? removeCurrencyFromDineroStr(token) : token,
    );
    const amount = evaluate(formattedTokens.join(' '));
    return { currency, amount };
  } catch (error) {
    throw new Error(`An error occurred while evaluating the expression: ${(error as Error)?.message}`);
  }
}
