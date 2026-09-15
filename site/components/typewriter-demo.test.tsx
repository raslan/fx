import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TypewriterDemo } from './typewriter-demo';

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  vi.stubGlobal(
    'fetch',
    vi.fn(async () =>
      new Response(
        JSON.stringify({ data: { currency: 'USD', rates: { EGP: '0.02', EUR: '0.9', USD: '1' } } }),
        { status: 200 },
      ),
    ),
  );
});

describe('TypewriterDemo', () => {
  it('types the demo equation into the real input, then evaluates it', async () => {
    render(<TypewriterDemo />);
    const input = screen.getByRole('textbox', { name: 'Enter an expression to evaluate' });

    // Nothing typed yet.
    expect(input).toHaveValue('');

    // Advance past the full typing duration.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
    });

    await waitFor(() =>
      expect(input).toHaveValue('(10k * 2 + 10 * (20k egp + eur10 thousand) / 4 - 5) + 10k'),
    );
    await waitFor(() => expect(screen.getByText(/\$2,557,772\.78/)).toBeInTheDocument());
  });

  it('clicking a history entry fills the same input and re-evaluates', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    render(<TypewriterDemo />);
    const input = screen.getByRole('textbox', { name: 'Enter an expression to evaluate' });

    await user.click(screen.getByRole('button', { name: /usd100 \* 1\.15/ }));

    await waitFor(() => expect(input).toHaveValue('usd100 * 1.15'));
    await waitFor(() => expect(screen.getByText(/\$115\.00/)).toBeInTheDocument());
  });

  it('offers a base-currency selector', () => {
    render(<TypewriterDemo />);
    expect(screen.getByRole('button', { name: 'Base currency' })).toBeInTheDocument();
  });
});
