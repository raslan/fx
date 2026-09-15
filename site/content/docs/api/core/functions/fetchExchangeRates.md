---
title: "Function: fetchExchangeRates()"
---

[**@aliraslan/fx**](../../README.md)

***

[@aliraslan/fx](../../README.md) / [core](../README.md) / fetchExchangeRates

# Function: fetchExchangeRates()

> **fetchExchangeRates**(`endpoint`, `baseCurrency`, `opts?`): `Promise`\<[`Rates`](../type-aliases/Rates.md)\>

Defined in: src/core/rates.ts:28

Fetches live exchange rates for `baseCurrency` from `endpoint`,
inverting them by default. `endpoint` is always supplied by the
caller — this function has no built-in provider — so pointing it
at a different rate service later is just a different argument,
never a code or docs change here. `endpoint` must respond to
`GET {endpoint}?currency={baseCurrency}` with
`{ data: { rates: { [code]: string } } }`.

## Parameters

### endpoint

`string`

### baseCurrency

`string`

### opts?

[`FetchExchangeRatesOptions`](../interfaces/FetchExchangeRatesOptions.md) = `{}`

## Returns

`Promise`\<[`Rates`](../type-aliases/Rates.md)\>
