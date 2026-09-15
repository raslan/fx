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
import { evaluateNaturalExpression, fetchExchangeRates, prettyPrint } from '@raslan/fx';

// Point this at any endpoint that returns { data: { rates: { [code]: string } } }
const rates = await fetchExchangeRates('https://your-rate-provider.example/rates', 'USD');
const { value } = evaluateNaturalExpression('100 eur + 20', 'USD', rates);

console.log(prettyPrint(value));
```

## With React

```tsx
import { useCurrency } from '@raslan/fx/react';

function Calculator() {
  const { evaluate, baseCurrency, setBaseCurrency } = useCurrency({
    endpoint: 'https://your-rate-provider.example/rates',
  });
  const result = evaluate('50k jpy');
  return <p>{result.currency}: {result.value.toJSON().amount}</p>;
}
```
