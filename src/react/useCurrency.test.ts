import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as rates from '../core/rates';
import { createCurrenciesStore, type PersistenceAdapter } from './store';
import { useCurrency } from './useCurrency';

const TEST_ENDPOINT = 'https://example.test/rates';

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

describe('useCurrency', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.spyOn(rates, 'fetchExchangeRates').mockResolvedValue({ EUR: 0.92, USD: 1 });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('fetches rates for the base currency on mount, using the given endpoint', async () => {
    const store = createCurrenciesStore(memoryAdapter());
    renderHook(() => useCurrency({ store, endpoint: TEST_ENDPOINT }));

    await act(async () => {
      await Promise.resolve();
    });

    expect(rates.fetchExchangeRates).toHaveBeenCalledWith(TEST_ENDPOINT, 'USD');
    await waitFor(() => expect(store.getState().rates.USD).toEqual({ EUR: 0.92, USD: 1 }));
  });

  it('evaluate() converts a natural-language expression using the fetched rates', async () => {
    const store = createCurrenciesStore(memoryAdapter());
    const { result } = renderHook(() => useCurrency({ store, endpoint: TEST_ENDPOINT }));

    await waitFor(() => expect(store.getState().rates.USD).toBeDefined());

    const evaluated = result.current.evaluate('100 eur');
    expect(evaluated.currency).toBe('USD');
  });

  it('setBaseCurrency updates the store\'s base currency', async () => {
    const store = createCurrenciesStore(memoryAdapter());
    const { result } = renderHook(() => useCurrency({ store, endpoint: TEST_ENDPOINT }));

    await waitFor(() => expect(store.getState().rates.USD).toBeDefined());

    act(() => {
      result.current.setBaseCurrency('EUR');
    });
    expect(store.getState().baseCurrency).toBe('EUR');
  });

  it('refresh() re-fetches rates for the current base currency', async () => {
    const store = createCurrenciesStore(memoryAdapter());
    const { result } = renderHook(() => useCurrency({ store, endpoint: TEST_ENDPOINT }));

    await waitFor(() => expect(rates.fetchExchangeRates).toHaveBeenCalledTimes(1));

    act(() => {
      result.current.refresh();
    });
    await waitFor(() => expect(rates.fetchExchangeRates).toHaveBeenCalledTimes(2));
  });
});
