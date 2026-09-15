---
title: "Function: createCurrenciesStore()"
---

[**@aliraslan/fx**](../../README.md)

***

[@aliraslan/fx](../../README.md) / [react](../README.md) / createCurrenciesStore

# Function: createCurrenciesStore()

> **createCurrenciesStore**(`adapter?`): `UseBoundStore`\<`WithImmer`\<`Write`\<`StoreApi`\<[`CurrenciesState`](../interfaces/CurrenciesState.md)\>, `StorePersist`\<[`CurrenciesState`](../interfaces/CurrenciesState.md), `unknown`\>\>\>\>

Defined in: src/react/store.ts:36

Creates a fresh currencies store, persisted through `adapter` (defaults to `localStorage`, or a no-op outside the browser).

## Parameters

### adapter?

`StateStorage` = `...`

## Returns

`UseBoundStore`\<`WithImmer`\<`Write`\<`StoreApi`\<[`CurrenciesState`](../interfaces/CurrenciesState.md)\>, `StorePersist`\<[`CurrenciesState`](../interfaces/CurrenciesState.md), `unknown`\>\>\>\>
