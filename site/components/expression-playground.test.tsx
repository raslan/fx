import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExpressionPlayground } from './expression-playground';

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () =>
      new Response(
        JSON.stringify({ data: { currency: 'USD', rates: { EUR: '0.9', USD: '1' } } }),
        { status: 200 },
      ),
    ),
  );
});

describe('ExpressionPlayground', () => {
  it('evaluates a preset expression and renders the formatted result', async () => {
    render(<ExpressionPlayground preset="100 + 20" small hideButtons />);
    await waitFor(() => expect(screen.getByText('$120.00')).toBeInTheDocument());
  });

  it('re-evaluates as the user types', async () => {
    const user = userEvent.setup();
    render(<ExpressionPlayground small hideButtons />);
    const input = screen.getByRole('textbox');
    await user.type(input, '50');
    await waitFor(() => expect(screen.getByText('$50.00')).toBeInTheDocument());
  });

  it('shows a base-currency selector when not compact', async () => {
    render(<ExpressionPlayground preset="100" />);
    expect(screen.getByRole('button', { name: 'Base currency' })).toBeInTheDocument();
  });

  it('hides the base-currency selector when hideButtons is set', async () => {
    render(<ExpressionPlayground preset="100" hideButtons />);
    expect(screen.queryByRole('button', { name: 'Base currency' })).not.toBeInTheDocument();
  });

  it('re-evaluates against the newly selected base currency', async () => {
    const user = userEvent.setup();
    render(<ExpressionPlayground preset="100" />);
    await waitFor(() => expect(screen.getByText('$100.00')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Base currency' }));
    await user.type(screen.getByPlaceholderText('Search currencies…'), 'Euro');
    await user.click(await screen.findByText(/Euro \(EUR\)/));
    await waitFor(() => expect(screen.getByText('€100.00')).toBeInTheDocument());
  });
});
