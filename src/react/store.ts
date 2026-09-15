import type { Draft } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Notation, Rates } from '../core/types';

/** A cache of rate maps keyed by the base currency they were fetched for. */
export type RatesCache = Record<string, Rates>;

/** A storage backend for persisting store state. Compatible with `localStorage`/`sessionStorage`. */
export type PersistenceAdapter = StateStorage;

const noopAdapter: PersistenceAdapter = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

/** Uses `window.localStorage` when available (browser), otherwise a no-op adapter safe for SSR/non-browser environments. */
function defaultAdapter(): PersistenceAdapter {
  if (typeof window === 'undefined' || !window.localStorage) {
    return noopAdapter;
  }
  return window.localStorage;
}

/** State and actions for the currency rates/base-currency store. */
export interface CurrenciesState {
  rates: RatesCache;
  baseCurrency: string;
  addCurrency: (currencyCode: string, rates: Rates) => void;
  setBaseCurrency: (currencyCode: string) => void;
}

/** Creates a fresh currencies store, persisted through `adapter` (defaults to `localStorage`, or a no-op outside the browser). */
export function createCurrenciesStore(adapter: PersistenceAdapter = defaultAdapter()) {
  return create<CurrenciesState>()(
    persist(
      immer((set) => ({
        rates: {},
        baseCurrency: 'USD',
        setBaseCurrency: (currency: string) =>
          set((state: Draft<CurrenciesState>) => {
            state.baseCurrency = currency;
          }),
        addCurrency: (currencyCode: string, rates: Rates) =>
          set((state: Draft<CurrenciesState>) => {
            state.rates[currencyCode] = rates;
          }),
      })),
      {
        name: 'fx-currencies',
        storage: createJSONStorage(() => adapter),
      },
    ),
  );
}

/** State and actions for display settings (currently just number notation). */
export interface SettingsState {
  notation: Notation;
  setNotation: (notation: Notation) => void;
}

/** Creates a fresh settings store, persisted through `adapter` (defaults to `localStorage`, or a no-op outside the browser). */
export function createSettingsStore(adapter: PersistenceAdapter = defaultAdapter()) {
  return create<SettingsState>()(
    persist(
      immer((set) => ({
        notation: 'standard' as Notation,
        setNotation: (notation: Notation) =>
          set((state: Draft<SettingsState>) => {
            state.notation = notation;
          }),
      })),
      {
        name: 'fx-settings',
        storage: createJSONStorage(() => adapter),
      },
    ),
  );
}
