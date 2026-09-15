/**
 * Same-origin proxy for Coinbase's exchange-rates endpoint (see
 * app/api/rates/route.ts) — calling Coinbase directly from the browser
 * gets blocked by some ad-blockers/privacy extensions that flag
 * exchange/crypto domains, even though the endpoint itself is public and
 * unauthenticated.
 */
export const RATES_ENDPOINT = '/api/rates';

/** koala's own demo equation — reused verbatim for the landing page's typewriter demo. */
export const DEMO_EQUATION = '(10k * 2 + 10 * (20k egp + eur10 thousand) / 4 - 5) + 10k';
