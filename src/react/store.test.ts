// src/react/store.test.ts
import { describe, expect, it } from 'vitest';
import { createCurrenciesStore, createSettingsStore, type PersistenceAdapter } from './store';

function memoryAdapter(): PersistenceAdapter {
  const map = new Map<string, string>();
  return {
    getItem: (name) => map.get(name) ?? null,
    setItem: (name, value) => {
      map.set(name, value);
    },
    removeItem: (name) => {
      map.delete(name);
    },
  };
}

describe('createCurrenciesStore', () => {
  it('defaults to USD with no rates', () => {
    const useStore = createCurrenciesStore(memoryAdapter());
    expect(useStore.getState().baseCurrency).toBe('USD');
    expect(useStore.getState().rates).toEqual({});
  });

  it('addCurrency stores a rate map under its currency code', () => {
    const useStore = createCurrenciesStore(memoryAdapter());
    useStore.getState().addCurrency('USD', { EUR: 0.92 });
    expect(useStore.getState().rates.USD).toEqual({ EUR: 0.92 });
  });

  it('setBaseCurrency updates the base currency', () => {
    const useStore = createCurrenciesStore(memoryAdapter());
    useStore.getState().setBaseCurrency('EUR');
    expect(useStore.getState().baseCurrency).toBe('EUR');
  });

  it('persists state through the given adapter', () => {
    const adapter = memoryAdapter();
    const useStore = createCurrenciesStore(adapter);
    useStore.getState().setBaseCurrency('GBP');
    expect(adapter.getItem('fx-currencies')).toContain('GBP');
  });
});

describe('createSettingsStore', () => {
  it('defaults to standard notation', () => {
    const useStore = createSettingsStore(memoryAdapter());
    expect(useStore.getState().notation).toBe('standard');
  });

  it('setNotation updates notation', () => {
    const useStore = createSettingsStore(memoryAdapter());
    useStore.getState().setNotation('compact');
    expect(useStore.getState().notation).toBe('compact');
  });
});
