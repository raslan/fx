'use client';

import { currencyOptions } from '@aliraslan/fx';
import { Command } from 'cmdk';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/lib/use-media-query';

export interface CurrencySelectProps {
  value: string;
  onChange: (code: string) => void;
  className?: string;
  /** `inline`: compact, code-only — for the landing page's `fx(USD)` prompt. */
  variant?: 'boxed' | 'inline';
}

const MOBILE_QUERY = '(max-width: 640px)';

export function CurrencySelect({
  value,
  onChange,
  className = '',
  variant = 'boxed',
}: CurrencySelectProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const domRef = useRef<HTMLDivElement>(null);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open || isMobile) return;
    function onPointerDown(e: MouseEvent) {
      if (domRef.current && !domRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, isMobile]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const selected = currencyOptions.find((option) => option.value === value);
  // Intl.DisplayNames can differ server/client for rare codes — bare code until mount avoids a hydration mismatch.
  const triggerLabel = variant === 'inline' ? value : mounted ? (selected?.label ?? value) : value;

  const triggerClassName =
    variant === 'inline'
      ? 'gap-1 rounded border border-fd-border bg-fd-secondary py-0.5 pl-1.5 pr-1 text-ayu-orange'
      : 'w-48 max-w-full justify-between gap-2 truncate rounded-md border border-fd-border bg-fd-secondary px-3 py-2 text-sm text-fd-secondary-foreground';

  function select(code: string) {
    onChange(code);
    setOpen(false);
  }

  const list = (
    <>
      <Command.Input
        autoFocus={!isMobile}
        placeholder="Search currencies…"
        className="w-full border-b border-fd-border bg-transparent px-3 py-3 text-base text-fd-popover-foreground outline-none placeholder:text-fd-muted-foreground sm:py-2 sm:text-sm"
      />
      <Command.List className="overflow-y-auto p-1">
        <Command.Empty className="px-3 py-6 text-center text-sm text-fd-muted-foreground">
          No currencies found.
        </Command.Empty>
        {currencyOptions.map((option) => (
          <Command.Item
            key={option.value}
            value={option.label}
            onSelect={() => select(option.value)}
            className="cursor-pointer rounded-md px-3 py-2.5 text-base text-fd-popover-foreground data-[selected=true]:bg-fd-accent data-[selected=true]:text-fd-accent-foreground sm:py-1.5 sm:text-sm"
          >
            {option.label}
          </Command.Item>
        ))}
      </Command.List>
    </>
  );

  return (
    <div ref={domRef} className={`relative inline-block font-mono ${className}`}>
      <button
        type="button"
        aria-label="Base currency"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex cursor-pointer items-center outline-none focus-visible:border-fd-primary ${triggerClassName}`}
      >
        <span className="truncate">{triggerLabel}</span>
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className={`h-3 w-3 shrink-0 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M2.5 4.5L6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && isMobile && (
        <>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/50"
          />
          <Command className="fixed inset-x-0 bottom-0 z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-t-xl border-t border-fd-border bg-fd-popover text-fd-popover-foreground">
            {list}
          </Command>
        </>
      )}

      {open && !isMobile && (
        <Command className="absolute z-50 mt-1 flex max-h-64 w-64 flex-col overflow-hidden rounded-lg border border-fd-border bg-fd-popover text-fd-popover-foreground shadow-xl">
          {list}
        </Command>
      )}
    </div>
  );
}
