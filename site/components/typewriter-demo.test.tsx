import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
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
  it('types the demo equation character by character, then reveals the answer', async () => {
    render(<TypewriterDemo />);

    // Nothing typed yet.
    expect(screen.getByTestId('typewriter-output').textContent).toBe('');

    // Advance past the full typing duration.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
    });

    await waitFor(() =>
      expect(screen.getByTestId('typewriter-output').textContent).toContain(
        '(10k * 2 + 10 * (20k egp + eur10 thousand) / 4 - 5) + 10k',
      ),
    );
    await waitFor(() => expect(screen.getByTestId('typewriter-result')).not.toHaveTextContent(''));
  });
});
