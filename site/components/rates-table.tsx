'use client';

import { currencyOptions } from '@aliraslan/fx';
import { useCurrency } from '@aliraslan/fx/react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useRef, useState } from 'react';
import { RATES_ENDPOINT } from '@/lib/constants';

interface TableRate {
  code: string;
  currency: string;
  exchangeRate: string;
}

const priorityCodes = ['EGP', 'GBP', 'EUR', 'USD'];

function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(num);
}

const columns: ColumnDef<TableRate>[] = [
  { accessorKey: 'currency', header: 'Currency' },
  { accessorKey: 'exchangeRate', header: 'Exchange Rate' },
];

export function RatesTable() {
  const { rates, baseCurrency } = useCurrency({ endpoint: RATES_ENDPOINT });
  const [search, setSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // A plain onChange handler relies on React's controlled-input value
  // tracker, which only fires when the DOM value differs from the value
  // React last saw — so a directly-assigned `.value` followed by a
  // dispatched 'input' event (as real browsers, and some test setups, do)
  // can be silently ignored. Listening natively side-steps that tracker.
  useEffect(() => {
    const el = searchInputRef.current;
    if (!el) return;
    const handleInput = () => setSearch(el.value);
    el.addEventListener('input', handleInput);
    return () => el.removeEventListener('input', handleInput);
  }, []);

  const data: TableRate[] = useMemo(() => {
    const baseRates = rates[baseCurrency];
    if (!baseRates) return [];
    return Object.entries(baseRates)
      .sort(([a], [b]) => {
        const aPriority = priorityCodes.includes(a);
        const bPriority = priorityCodes.includes(b);
        if (aPriority && bPriority) return a.localeCompare(b);
        if (aPriority) return -1;
        if (bPriority) return 1;
        return a.localeCompare(b);
      })
      .map(([code, rate]) => ({
        code,
        currency: currencyOptions.find((c) => c.value === code)?.value ?? code,
        exchangeRate: formatCompactNumber(rate),
      }));
  }, [rates, baseCurrency]);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter: search },
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="not-prose">
      <input
        ref={searchInputRef}
        placeholder="Search currencies..."
        defaultValue={search}
        className="mb-3 w-full max-w-xs rounded-md border border-fd-border bg-fd-card px-3 py-2 text-sm text-fd-card-foreground outline-none focus:border-fd-primary"
      />
      <table className="w-full border-collapse text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-fd-border">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-3 py-2 text-left text-fd-muted-foreground">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-fd-border/50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-2 font-mono text-fd-card-foreground">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
