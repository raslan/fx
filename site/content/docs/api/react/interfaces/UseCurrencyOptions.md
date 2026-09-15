---
title: "Interface: UseCurrencyOptions"
---

[**@aliraslan/fx**](../../README.md)

***

[@aliraslan/fx](../../README.md) / [react](../README.md) / UseCurrencyOptions

# Interface: UseCurrencyOptions

Defined in: src/react/useCurrency.ts:10

Options for [useCurrency](../functions/useCurrency.md).

## Properties

### endpoint

> **endpoint**: `string`

Defined in: src/react/useCurrency.ts:12

The rate-provider endpoint to pass to `fetchExchangeRates` — required, `fx` has no built-in provider.

***

### pollIntervalMs?

> `optional` **pollIntervalMs?**: `number`

Defined in: src/react/useCurrency.ts:16

How often to auto-refresh rates for the current base currency, in milliseconds. Defaults to 5 minutes.

***

### store?

> `optional` **store?**: `UseBoundStore`\<`WithImmer`\<`Write`\<`StoreApi`\<[`CurrenciesState`](CurrenciesState.md)\>, `StorePersist`\<[`CurrenciesState`](CurrenciesState.md), `unknown`\>\>\>\>

Defined in: src/react/useCurrency.ts:14

A store from `createCurrenciesStore` — defaults to a module-level shared store. Pass your own for multiple independent instances or custom persistence.
