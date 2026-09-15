'use client';

import { prettyPrint } from '@aliraslan/fx';
import { useCurrency } from '@aliraslan/fx/react';
import { useEffect, useRef, useState } from 'react';
import { CurrencySelect } from '@/components/currency-select';
import { tokenizeExpression } from '@/lib/highlight-expression';
import { DEMO_EQUATION, RATES_ENDPOINT } from '@/lib/constants';

const TYPE_INTERVAL_MS = 40;

const history = ['$50 + €20', '10k gbp + 5m usd', '20 thousand + 5 billion', 'usd100 * 1.15'];

const TOKEN_CLASS: Record<string, string> = {
  number: 'text-ayu-orange',
  currency: 'text-ayu-blue',
  operator: 'text-fd-muted-foreground',
  text: 'text-fd-foreground',
};

export function TypewriterDemo() {
  const { evaluate, baseCurrency, setBaseCurrency, rates } = useCurrency({ endpoint: RATES_ENDPOINT });
  const [entry, setEntry] = useState('');
  const typedByUser = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (typedByUser.current) {
        clearInterval(id);
        return;
      }
      i += 1;
      setEntry(DEMO_EQUATION.slice(0, i));
      if (i >= DEMO_EQUATION.length) {
        clearInterval(id);
      }
    }, TYPE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    if (document.activeElement === el) {
      el.setSelectionRange(entry.length, entry.length);
    }
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [entry]);

  function setUserEntry(value: string) {
    typedByUser.current = true;
    setEntry(value);
    inputRef.current?.focus();
  }

  let result: string | null = null;
  if (entry && rates[baseCurrency]) {
    try {
      result = prettyPrint(evaluate(entry).value);
    } catch {
      result = null;
    }
  }

  const tokens = tokenizeExpression(entry);

  return (
    <section className="not-prose w-full max-w-2xl">
      <div className="flex items-center gap-1.5 font-mono text-sm text-fd-muted-foreground">
        <span>fx(</span>
        <CurrencySelect value={baseCurrency} onChange={setBaseCurrency} variant="inline" />
        <span>) evaluates:</span>
      </div>

      <div className="relative mt-2 rounded-lg border border-fd-border bg-fd-card transition-colors focus-within:border-fd-primary">
        {/* Colored overlay behind a transparent textarea, so highlighting doesn't break the native caret. */}
        <div
          aria-hidden
          className="whitespace-pre-wrap break-words px-4 py-4 font-mono text-lg sm:text-xl"
        >
          {tokens.map((token, i) => (
            <span key={i} className={TOKEN_CLASS[token.kind]}>
              {token.text}
            </span>
          ))}
          {entry === '' && ' '}
        </div>
        <textarea
          ref={inputRef}
          autoFocus
          rows={1}
          value={entry}
          onChange={(e) => setUserEntry(e.target.value)}
          placeholder="type an expression…"
          aria-label="Enter an expression to evaluate"
          className="absolute inset-0 w-full resize-none whitespace-pre-wrap break-words bg-transparent px-4 py-4 font-mono text-lg text-transparent caret-fd-primary outline-none placeholder:text-fd-muted-foreground sm:text-xl"
        />
      </div>

      <div
        key={result ?? 'empty'}
        className="mt-3 min-h-[3rem] pl-1 font-mono text-3xl font-bold text-fd-primary sm:text-4xl"
        style={result ? { animation: 'reveal 0.3s ease-out' } : undefined}
      >
        {result && <>=&gt; {result}</>}
      </div>

      <div className="mt-10 flex flex-col gap-1.5 font-mono text-sm">
        {history.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setUserEntry(example)}
            className="w-fit cursor-pointer text-left text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            <span className="text-fd-foreground/40">fx&gt; </span>
            {example}
          </button>
        ))}
      </div>
    </section>
  );
}
