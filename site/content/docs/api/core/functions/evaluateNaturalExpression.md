---
title: "Function: evaluateNaturalExpression()"
---

[**@aliraslan/fx**](../../README.md)

***

[@aliraslan/fx](../../README.md) / [core](../README.md) / evaluateNaturalExpression

# Function: evaluateNaturalExpression()

> **evaluateNaturalExpression**(`input`, `baseCurrency`, `rates`): [`EvaluatedExpression`](../interfaces/EvaluatedExpression.md)

Defined in: src/core/tokenizer.ts:136

Parses a natural-language financial expression (currency symbols,
codes, magnitude words/suffixes, and arithmetic) and evaluates it
into a Dinero value in `baseCurrency`, converting any other
currencies mentioned using `rates` (a Dinero-format rate map for
`baseCurrency`, as produced by `convertRatesToDineroFormat`).

## Parameters

### input

`string`

### baseCurrency

`string`

### rates

[`Rates`](../type-aliases/Rates.md)

## Returns

[`EvaluatedExpression`](../interfaces/EvaluatedExpression.md)
