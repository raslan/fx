---
title: Expression Syntax
description: What evaluateNaturalExpression and calculateInputNumber understand.
---

`evaluateNaturalExpression` and `calculateInputNumber` both parse the same
natural-language syntax:

- **Plain numbers**: `20`, `-5.5`
- **Currency-tagged amounts**: `20 usd`, `usd20`, `100eur` — the currency
  code can be a 3-4 letter ISO code, in any case, attached before or after
  the number with or without a space.
- **Currency symbols**: `$20`, `€100`, `£50` — resolved to `USD`, `EUR`,
  `GBP` respectively before parsing.
- **Arithmetic**: `20 usd + 5`, `(100 - 20) * 2` — anything
  [mathjs's `evaluate`](https://mathjs.org/docs/expressions/syntax.html)
  supports, mixed freely with currency-tagged terms.
- **Magnitude shorthand**: `2k`, `3m`, `1b`, `4t` (thousand/million/billion/trillion).
- **Magnitude words**: `2 thousand`, `3 million`, `1 billion`, `4 trillion`.

`evaluateNaturalExpression` converts every currency-tagged term into the
expression's base currency before evaluating, using the `rates` you pass
in (see [Getting Started](/getting-started/) for fetching live rates).
`calculateInputNumber` does not convert — it just extracts the first
detected currency code and evaluates the numeric arithmetic as-is.
