---
title: "Function: convertRatesToDineroFormat()"
---

[**@aliraslan/fx**](../../README.md)

***

[@aliraslan/fx](../../README.md) / [core](../README.md) / convertRatesToDineroFormat

# Function: convertRatesToDineroFormat()

> **convertRatesToDineroFormat**(`rates`, `currencyMap`): `Record`\<`string`, [`CurrencyRate`](../interfaces/CurrencyRate.md)\>

Defined in: src/core/money.ts:48

Converts a flat `{ code: rate }` map (as returned by `fetchExchangeRates`)
into Dinero's integer-amount-at-a-scale representation, adding four
extra digits of scale over the currency's own exponent for precision
headroom during multiplication.

## Parameters

### rates

`Record`\<`string`, `number`\>

### currencyMap

`Record`\<`string`, `DineroCurrency`\<`number`\>\>

## Returns

`Record`\<`string`, [`CurrencyRate`](../interfaces/CurrencyRate.md)\>
