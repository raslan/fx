import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchExchangeRates } from './rates';

const TEST_ENDPOINT = 'https://example.test/rates';

function mockFetch(rates: Record<string, string>) {
  return vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ data: { currency: 'USD', rates } }),
  });
}

describe('fetchExchangeRates', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('requests the given endpoint with the base currency as a query param', async () => {
    const fetchImpl = mockFetch({ EUR: '0.92' });
    await fetchExchangeRates(TEST_ENDPOINT, 'USD', { fetchImpl });
    expect(fetchImpl).toHaveBeenCalledWith(`${TEST_ENDPOINT}?currency=USD`);
  });

  it('inverts rates by default ("1 base = X target" -> "1 target = Y base")', async () => {
    const fetchImpl = mockFetch({ EUR: '0.92' });
    const rates = await fetchExchangeRates(TEST_ENDPOINT, 'USD', { fetchImpl });
    expect(rates.EUR).toBeCloseTo(1 / 0.92, 10);
  });

  it('returns rates as-is (non-inverted) when invert: false', async () => {
    const fetchImpl = mockFetch({ EUR: '0.92' });
    const rates = await fetchExchangeRates(TEST_ENDPOINT, 'USD', { fetchImpl, invert: false });
    expect(rates.EUR).toBeCloseTo(0.92, 10);
  });

  it('throws with the HTTP status when the request fails', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) });
    await expect(fetchExchangeRates(TEST_ENDPOINT, 'USD', { fetchImpl })).rejects.toThrow(/status 500/);
  });
});
