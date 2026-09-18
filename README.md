# fx

natural-language money math. no ui, no opinions, just functions and hooks.

parse "20 usd + 5" into real money. convert currencies with live rates from
whatever provider you point it at. plug it into anything.

## install

```
npm install @aliraslan/fx
```

## quick start

```ts
import { evaluateNaturalExpression, fetchExchangeRates, prettyPrint } from '@aliraslan/fx';

// any endpoint returning { data: { rates: { [code]: string } } } works —
// Coinbase's public, unauthenticated /v2/exchange-rates is one example
const rates = await fetchExchangeRates('https://api.coinbase.com/v2/exchange-rates', 'USD');
const { value } = evaluateNaturalExpression('100 eur + 20', 'USD', rates);

prettyPrint(value); // "$128.70"
```

react, if you want it:

```tsx
import { useCurrency } from '@aliraslan/fx/react';

function Calculator() {
  const { evaluate, baseCurrency, setBaseCurrency } = useCurrency({
    endpoint: 'https://your-rate-provider.example/rates',
  });

  const result = evaluate('50k jpy');
  return <p>{prettyPrint(result.value)}</p>;
}
```

## wire it into an input, with autocomplete

`currencyOptions` gives you a ready-made `{ value, label }` list for any
autocomplete/combobox component. here it is wired into
[`react-autocomplete-input`](https://github.com/yury-dymov/react-autocomplete-input)
the same way the app this library was extracted from actually shipped it:
hit space twice, a searchable currency dropdown pops up, pick one, and it
drops the currency *code* (not the label) straight into the expression.

```tsx
import { useState } from 'react';
import TextInput from 'react-autocomplete-input';
import { currencyOptions } from '@aliraslan/fx';
import { useCurrency } from '@aliraslan/fx/react';

const currencyLabels = currencyOptions.map((c) => c.label);

function labelToCode(label: string) {
  return currencyOptions.find((c) => c.label === label)?.value ?? label;
}

function Calculator() {
  const [entry, setEntry] = useState('');
  const { evaluate, rates, baseCurrency } = useCurrency({
    endpoint: 'https://your-rate-provider.example/rates',
  });

  const result = rates[baseCurrency] ? evaluate(entry) : null;

  return (
    <div>
      <TextInput
        value={entry}
        onChange={setEntry}
        options={currencyLabels}
        trigger={['  ']}
        matchAny
        maxOptions={1000}
        changeOnSelect={(trigger, selected) => labelToCode(selected)}
      />
      {result && <p>{prettyPrint(result.value)}</p>}
    </div>
  );
}
```

no submit button, no debounce needed — `evaluate` is cheap enough to run
on every keystroke.

## what it does

- **parses natural language**: symbols (`$`, `€`, `£`), codes (`usd`, `EUR`),
  magnitude words (`2 million`) and shorthand (`2m`), arithmetic mixed
  freely with money — `evaluate("(100 - 20) * 2 usd")` just works.
- **real money math**: built on [Dinero.js](https://dinerojs.com), no
  float-precision garbage.
- **156 currencies**, hand-rolled from ISO 4217 — no flaky third-party
  currency-data dependency to break your build.
- **provider-agnostic rates**: `fetchExchangeRates` takes *your* endpoint.
  no vendor lock-in, no hardcoded api. point it at anything that returns
  `{ data: { rates: { [code]: string } } }` — Coinbase's public
  `/v2/exchange-rates` is a real, unauthenticated example, or bring your own.
- **react hooks are optional**: `@aliraslan/fx/react` has zero weight in the
  core bundle if you don't import it. `useCurrency` gives you live rates,
  polling, and expression evaluation in one hook.

## api

two entry points:

- `@aliraslan/fx` — the core. framework-agnostic, zero react dependency.
  `evaluateNaturalExpression`, `calculateInputNumber`, `fetchExchangeRates`,
  `prettyPrint`, `currencyOptions`, and the rest of the money/currency
  primitives.
- `@aliraslan/fx/react` — `useCurrency`, `useDebounce`, plus the zustand store
  factories if you want to manage state yourself.

full reference (typedoc-generated, always in sync with the source) is at
the docs site — link coming once it's live.

## license

MIT
