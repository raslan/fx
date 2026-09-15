---
title: "Interface: CurrenciesState"
---

[**@aliraslan/fx**](../../README.md)

***

[@aliraslan/fx](../../README.md) / [react](../README.md) / CurrenciesState

# Interface: CurrenciesState

Defined in: src/react/store.ts:28

State and actions for the currency rates/base-currency store.

## Properties

### addCurrency

> **addCurrency**: (`currencyCode`, `rates`) => `void`

Defined in: src/react/store.ts:31

#### Parameters

##### currencyCode

`string`

##### rates

[`Rates`](../../core/type-aliases/Rates.md)

#### Returns

`void`

***

### baseCurrency

> **baseCurrency**: `string`

Defined in: src/react/store.ts:30

***

### rates

> **rates**: [`RatesCache`](../type-aliases/RatesCache.md)

Defined in: src/react/store.ts:29

***

### setBaseCurrency

> **setBaseCurrency**: (`currencyCode`) => `void`

Defined in: src/react/store.ts:32

#### Parameters

##### currencyCode

`string`

#### Returns

`void`
