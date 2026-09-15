---
title: Getting Started
description: Install @raslan/fx and evaluate your first expression.
---

## Install

```
pnpm add @raslan/fx
```

## Evaluate an expression

```ts
import { evaluateNaturalExpression, fetchOfficialRates, prettyPrint } from '@raslan/fx';

const rates = await fetchOfficialRates('USD');
const { value } = evaluateNaturalExpression('100 eur + 20', 'USD', rates);

console.log(prettyPrint(value)); // "$128.70" (using live rates)
```

## With React

```tsx
import { useCurrency } from '@raslan/fx/react';

function Calculator() {
  const { evaluate, baseCurrency, setBaseCurrency } = useCurrency();
  const result = evaluate('50k jpy');
  return <p>{result.currency}: {result.value.toJSON().amount}</p>;
}
```
