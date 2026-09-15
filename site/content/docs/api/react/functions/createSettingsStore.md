---
title: "Function: createSettingsStore()"
---

[**@aliraslan/fx**](../../README.md)

***

[@aliraslan/fx](../../README.md) / [react](../README.md) / createSettingsStore

# Function: createSettingsStore()

> **createSettingsStore**(`adapter?`): `UseBoundStore`\<`WithImmer`\<`Write`\<`StoreApi`\<[`SettingsState`](../interfaces/SettingsState.md)\>, `StorePersist`\<[`SettingsState`](../interfaces/SettingsState.md), `unknown`\>\>\>\>

Defined in: src/react/store.ts:66

Creates a fresh settings store, persisted through `adapter` (defaults to `localStorage`, or a no-op outside the browser).

## Parameters

### adapter?

`StateStorage` = `...`

## Returns

`UseBoundStore`\<`WithImmer`\<`Write`\<`StoreApi`\<[`SettingsState`](../interfaces/SettingsState.md)\>, `StorePersist`\<[`SettingsState`](../interfaces/SettingsState.md), `unknown`\>\>\>\>
