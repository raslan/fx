import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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
    await waitFor(() => expect(screen.getByText('EUR')).toBeInTheDocument());
    expect(screen.getByText('GBP')).toBeInTheDocument();
    expect(screen.getByText('JPY')).toBeInTheDocument();
  });

  it('filters rows via the search box', async () => {
    render(<RatesTable />);
    await waitFor(() => expect(screen.getByText('EUR')).toBeInTheDocument());
    const search = screen.getByPlaceholderText('Search currencies...');
    search.dispatchEvent(new Event('focus'));
    (search as HTMLInputElement).value = 'JPY';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    await waitFor(() => expect(screen.queryByText('EUR')).not.toBeInTheDocument());
    expect(screen.getByText('JPY')).toBeInTheDocument();
  });
});
