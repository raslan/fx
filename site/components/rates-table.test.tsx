import { describe, expect, it, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RatesTable } from './rates-table';

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () =>
      new Response(
        JSON.stringify({
          data: { currency: 'USD', rates: { EUR: '0.9', GBP: '0.8', JPY: '150' } },
        }),
        { status: 200 },
      ),
    ),
  );
});

describe('RatesTable', () => {
  it('renders one row per currency with a formatted rate', async () => {
    render(<RatesTable />);
    await waitFor(() => expect(screen.getByText('Euro (EUR)')).toBeInTheDocument());
    expect(screen.getByText('British Pound (GBP)')).toBeInTheDocument();
    expect(screen.getByText('Japanese Yen (JPY)')).toBeInTheDocument();
  });

  it('filters rows via the search box', async () => {
    render(<RatesTable />);
    await waitFor(() => expect(screen.getByText('Euro (EUR)')).toBeInTheDocument());
    const search = screen.getByPlaceholderText('Search currencies...');
    fireEvent.change(search, { target: { value: 'JPY' } });
    await waitFor(() => expect(screen.queryByText('Euro (EUR)')).not.toBeInTheDocument());
    expect(screen.getByText('Japanese Yen (JPY)')).toBeInTheDocument();
  });
});
