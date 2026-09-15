---
title: "Function: useCurrency()"
---

[**@aliraslan/fx**](../../README.md)

***

[@aliraslan/fx](../../README.md) / [react](../README.md) / useCurrency

# Function: useCurrency()

> **useCurrency**(`options`): `object`

Defined in: src/react/useCurrency.ts:24

Headless hook combining live rate fetching, polling, and
natural-language expression evaluation. Wire its returned values
into any UI.

## Parameters

### options

[`UseCurrencyOptions`](../interfaces/UseCurrencyOptions.md)

## Returns

`object`

### addCurrency

> **addCurrency**: (`currencyCode`, `rates`) => `void`

#### Parameters

##### currencyCode

`string`

##### rates

[`Rates`](../../core/type-aliases/Rates.md)

#### Returns

`void`

### baseCurrency

> **baseCurrency**: `string`

### error

> **error**: `Error` \| `null`

### evaluate

> **evaluate**: (`expr`, `overrideCurrency?`) => [`EvaluatedExpression`](../../core/interfaces/EvaluatedExpression.md)

#### Parameters

##### expr

`string`

##### overrideCurrency?

`string`

#### Returns

[`EvaluatedExpression`](../../core/interfaces/EvaluatedExpression.md)

### rates

> **rates**: [`RatesCache`](../type-aliases/RatesCache.md)

### refresh

> **refresh**: (`overrideCurrency?`) => `void`

#### Parameters

##### overrideCurrency?

`string`

#### Returns

`void`

### setBaseCurrency

> **setBaseCurrency**: (`currencyCode`) => `void`

#### Parameters

##### currencyCode

`string`

#### Returns

`void`
