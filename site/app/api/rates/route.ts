import { type NextRequest, NextResponse } from 'next/server';

const COINBASE_ENDPOINT = 'https://api.coinbase.com/v2/exchange-rates';

/**
 * Transparent server-side proxy for Coinbase's exchange-rates endpoint —
 * some browsers/extensions block direct client-side requests to
 * api.coinbase.com. Forwards the same query string, returns the same
 * response body untouched, so `fetchExchangeRates` sees an identical shape
 * whether it talks to Coinbase directly or through this route.
 */
export async function GET(request: NextRequest) {
  const currency = request.nextUrl.searchParams.get('currency');
  const upstream = new URL(COINBASE_ENDPOINT);
  if (currency) {
    upstream.searchParams.set('currency', currency);
  }

  const response = await fetch(upstream);
  const body = await response.text();

  return new NextResponse(body, {
    status: response.status,
    headers: { 'Content-Type': response.headers.get('Content-Type') ?? 'application/json' },
  });
}
