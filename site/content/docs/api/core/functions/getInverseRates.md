---
title: "Function: getInverseRates()"
---

[**@aliraslan/fx**](../../README.md)

***

[@aliraslan/fx](../../README.md) / [core](../README.md) / getInverseRates

# Function: getInverseRates()

> **getInverseRates**(`targetCurrency`, `baseCurrency`, `rates`): `Record`\<`string`, [`CurrencyRate`](../interfaces/CurrencyRate.md)\>

Defined in: src/core/money.ts:30

Does not invert anything — the actual "1 base = X target" ->
"1 target = Y base" inversion happens upstream in
`fetchExchangeRates`. This just re-keys an already-inverted rate
(already in "1 target = Y base" form) under `baseCurrency`'s code,
the shape Dinero's `convert()` expects its rate map to be in.

## Parameters

### targetCurrency

`string`

### baseCurrency

`string`

### rates

`Record`\<`string`, [`CurrencyRate`](../interfaces/CurrencyRate.md)\>

## Returns

`Record`\<`string`, [`CurrencyRate`](../interfaces/CurrencyRate.md)\>
