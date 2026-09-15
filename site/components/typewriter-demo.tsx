'use client';

import { prettyPrint } from '@aliraslan/fx';
import { useCurrency } from '@aliraslan/fx/react';
import { useEffect, useState } from 'react';
import { DEMO_EQUATION, RATES_ENDPOINT } from '@/lib/constants';

const TYPE_INTERVAL_MS = 40;

export function TypewriterDemo() {
  const { evaluate, baseCurrency, rates } = useCurrency({ endpoint: RATES_ENDPOINT });
  const [typed, setTyped] = useState('');
  const [entry, setEntry] = useState('');

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(DEMO_EQUATION.slice(0, i));
      if (i >= DEMO_EQUATION.length) {
        clearInterval(id);
      }
    }, TYPE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  let result: string | null = null;
  if (typed === DEMO_EQUATION && rates[baseCurrency]) {
    try {
      result = prettyPrint(evaluate(DEMO_EQUATION).value);
    } catch {
      result = null;
    }
  }

  const examples = [
    '$50 + €20',
    '10k gbp + 5m usd',
    '20 thousand + 5 billion',
    'usd100 * 1.15',
  ];

  return (
    <section className="not-prose flex flex-col items-center gap-8 py-16">
      <div className="w-full max-w-2xl rounded-lg border border-fd-border bg-fd-card p-6">
        <div className="font-mono text-lg text-fd-card-foreground sm:text-2xl">
          <span data-testid="typewriter-output">{typed}</span>
          <span className="animate-pulse">|</span>
        </div>
        <div
          data-testid="typewriter-result"
          className="mt-4 font-mono text-3xl font-semibold text-fd-primary"
        >
          {result}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {examples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setEntry(example)}
            className="cursor-pointer rounded-md border border-fd-border bg-fd-muted px-3 py-1.5 font-mono text-sm text-fd-muted-foreground transition-colors hover:border-fd-primary hover:text-fd-foreground"
          >
            {example}
          </button>
        ))}
      </div>

      <div className="w-full max-w-xl">
        <label htmlFor="try-it" className="mb-2 block text-center text-sm text-fd-muted-foreground">
          Try it yourself
        </label>
        <input
          id="try-it"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="e.g. 100 usd + 20"
          className="w-full rounded-md border border-fd-border bg-fd-card px-4 py-3 text-center font-mono text-xl text-fd-card-foreground outline-none focus:border-fd-primary"
        />
        {entry && rates[baseCurrency] && (
          <div className="mt-3 text-center font-mono text-2xl font-semibold text-fd-primary">
            {(() => {
              try {
                return prettyPrint(evaluate(entry).value);
              } catch {
                return null;
              }
            })()}
          </div>
        )}
      </div>
    </section>
  );
}
