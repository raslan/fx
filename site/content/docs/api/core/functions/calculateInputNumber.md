---
title: "Function: calculateInputNumber()"
---

[**@aliraslan/fx**](../../README.md)

***

[@aliraslan/fx](../../README.md) / [core](../README.md) / calculateInputNumber

# Function: calculateInputNumber()

> **calculateInputNumber**(`input`): [`ParsedAmount`](../interfaces/ParsedAmount.md)

Defined in: src/core/tokenizer.ts:167

Parses a natural-language expression into a bare `{ currency, amount }`
pair without converting currencies — the currency is whatever was
detected in the input, and the amount is the raw evaluated number.

## Parameters

### input

`string`

## Returns

[`ParsedAmount`](../interfaces/ParsedAmount.md)
