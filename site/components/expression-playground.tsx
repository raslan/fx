'use client';

import { prettyPrint } from '@aliraslan/fx';
import { useCurrency } from '@aliraslan/fx/react';
import { useState } from 'react';
import { CurrencySelect } from '@/components/currency-select';
import { RATES_ENDPOINT } from '@/lib/constants';

export interface ExpressionPlaygroundProps {
  /** Expression to pre-fill the input with. */
  preset?: string;
  /** Compact layout — no demo-equation/clear buttons, smaller input. */
  small?: boolean;
  /** Hide the demo-equation button row entirely (implied by `small`, but can be set independently). */
  hideButtons?: boolean;
}

export function ExpressionPlayground({
  preset = '',
  small = false,
  hideButtons = false,
}: ExpressionPlaygroundProps) {
  const { evaluate, baseCurrency, setBaseCurrency, rates } = useCurrency({ endpoint: RATES_ENDPOINT });
  const [entry, setEntry] = useState(preset);

  let output: string | null = null;
  if (entry && baseCurrency && rates && rates[baseCurrency]) {
    try {
      const result = evaluate(entry);
      output = String(prettyPrint(result.value));
    } catch {
      output = null;
    }
  }

  return (
    <div className="not-prose my-4 flex flex-col gap-3">
      {!hideButtons && !small && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="w-fit rounded-md border border-fd-border bg-fd-secondary px-3 py-1.5 text-sm text-fd-secondary-foreground hover:bg-fd-accent"
            onClick={() => setEntry(preset)}
          >
            Reset to example
          </button>
          <CurrencySelect value={baseCurrency} onChange={setBaseCurrency} />
        </div>
      )}
      <input
        aria-label="Enter an expression to evaluate"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="e.g. 100 usd + 20"
        className={
          'w-full rounded-md border border-fd-border bg-fd-card px-4 py-3 font-mono text-fd-card-foreground outline-none focus:border-fd-primary ' +
          (small ? 'text-base' : 'text-xl')
        }
      />
      <div className="font-mono text-2xl font-semibold text-fd-primary">{output ?? ' '}</div>
    </div>
  );
}
