import type { Rates } from './types';

/** Options for {@link fetchExchangeRates}. */
export interface FetchExchangeRatesOptions {
  /** Invert the provider's "1 base = X target" rates into "1 target = Y base". Defaults to `true`. */
  invert?: boolean;
  /** Override the `fetch` implementation (e.g. for testing, or a non-global fetch polyfill). Defaults to the global `fetch`. */
  fetchImpl?: typeof fetch;
}

/** The response shape a rate-provider endpoint must return for {@link fetchExchangeRates} to consume it. */
interface ExchangeRatesResponse {
  data: {
    currency: string;
    rates: Record<string, string>;
  };
}

/**
 * Fetches live exchange rates for `baseCurrency` from `endpoint`,
 * inverting them by default. `endpoint` is always supplied by the
 * caller — this function has no built-in provider — so pointing it
 * at a different rate service later is just a different argument,
 * never a code or docs change here. `endpoint` must respond to
 * `GET {endpoint}?currency={baseCurrency}` with
 * `{ data: { rates: { [code]: string } } }`.
 */
export async function fetchExchangeRates(
  endpoint: string,
  baseCurrency: string,
  opts: FetchExchangeRatesOptions = {},
): Promise<Rates> {
  const { invert = true, fetchImpl = fetch } = opts;
  const response = await fetchImpl(`${endpoint}?currency=${encodeURIComponent(baseCurrency)}`);
  if (!response.ok) {
    throw new Error(`Exchange rate request failed with status ${response.status}`);
  }
  const body = (await response.json()) as ExchangeRatesResponse;
  const rates: Rates = {};
  for (const [code, rateStr] of Object.entries(body.data.rates)) {
    const rate = Number(rateStr);
    rates[code] = invert ? 1 / rate : rate;
  }
  return rates;
}
