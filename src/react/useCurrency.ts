import { useCallback, useEffect, useRef } from 'react';
import { evaluateNaturalExpression } from '../core/tokenizer';
import { fetchExchangeRates } from '../core/rates';
import type { EvaluatedExpression } from '../core/types';
import { createCurrenciesStore } from './store';

const defaultStore = createCurrenciesStore();

/** Options for {@link useCurrency}. */
export interface UseCurrencyOptions {
  /** The rate-provider endpoint to pass to `fetchExchangeRates` — required, `fx` has no built-in provider. */
  endpoint: string;
  /** A store from `createCurrenciesStore` — defaults to a module-level shared store. Pass your own for multiple independent instances or custom persistence. */
  store?: ReturnType<typeof createCurrenciesStore>;
  /** How often to auto-refresh rates for the current base currency, in milliseconds. Defaults to 5 minutes. */
  pollIntervalMs?: number;
}

/**
 * Headless hook combining live rate fetching, polling, and
 * natural-language expression evaluation. Wire its returned values
 * into any UI.
 */
export function useCurrency(options: UseCurrencyOptions) {
  const { endpoint } = options;
  const store = options.store ?? defaultStore;
  const pollIntervalMs = options.pollIntervalMs ?? 300_000;
  const { rates, addCurrency, baseCurrency, setBaseCurrency } = store();

  const refresh = useCallback(
    (overrideCurrency?: string) => {
      void fetchExchangeRates(endpoint, baseCurrency).then((r) => addCurrency(baseCurrency, r));
      if (overrideCurrency) {
        void fetchExchangeRates(endpoint, overrideCurrency).then((r) => addCurrency(overrideCurrency, r));
      }
    },
    [endpoint, baseCurrency, addCurrency],
  );

  const refreshRef = useRef(refresh);
  refreshRef.current = refresh;

  useEffect(() => {
    const id = setInterval(() => refreshRef.current(), pollIntervalMs);
    return () => clearInterval(id);
  }, [pollIntervalMs]);

  useEffect(() => {
    if (!rates?.[baseCurrency]) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseCurrency, rates]);

  const evaluate = useCallback(
    (expr: string, overrideCurrency?: string): EvaluatedExpression => {
      const targetCurrency = overrideCurrency ?? baseCurrency;
      if (overrideCurrency && !rates?.[overrideCurrency]) {
        refresh(overrideCurrency);
      }
      return evaluateNaturalExpression(expr, targetCurrency, rates[targetCurrency] ?? {});
    },
    [baseCurrency, rates, refresh],
  );

  return { rates, refresh, addCurrency, baseCurrency, setBaseCurrency, evaluate };
}
