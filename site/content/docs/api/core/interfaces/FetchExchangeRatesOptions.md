---
title: "Interface: FetchExchangeRatesOptions"
---

[**@aliraslan/fx**](../../README.md)

***

[@aliraslan/fx](../../README.md) / [core](../README.md) / FetchExchangeRatesOptions

# Interface: FetchExchangeRatesOptions

Defined in: src/core/rates.ts:4

Options for [fetchExchangeRates](../functions/fetchExchangeRates.md).

## Properties

### fetchImpl?

> `optional` **fetchImpl?**: \{(`input`, `init?`): `Promise`\<`Response`\>; (`input`, `init?`): `Promise`\<`Response`\>; \}

Defined in: src/core/rates.ts:8

Override the `fetch` implementation (e.g. for testing, or a non-global fetch polyfill). Defaults to the global `fetch`.

#### Call Signature

> (`input`, `init?`): `Promise`\<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

##### Parameters

###### input

`URL` \| `RequestInfo`

###### init?

`RequestInit`

##### Returns

`Promise`\<`Response`\>

#### Call Signature

> (`input`, `init?`): `Promise`\<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

##### Parameters

###### input

`string` \| `URL` \| `Request`

###### init?

`RequestInit`

##### Returns

`Promise`\<`Response`\>

***

### invert?

> `optional` **invert?**: `boolean`

Defined in: src/core/rates.ts:6

Invert the provider's "1 base = X target" rates into "1 target = Y base". Defaults to `true`.
