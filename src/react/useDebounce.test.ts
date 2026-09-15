import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays invoking the callback by the given delay', () => {
    const { result } = renderHook(() => useDebounce());
    const callback = vi.fn();

    act(() => {
      result.current(callback, 200);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('resets the timer when called again before the delay elapses', () => {
    const { result } = renderHook(() => useDebounce());
    const callback = vi.fn();

    act(() => {
      result.current(callback, 200);
      vi.advanceTimersByTime(100);
      result.current(callback, 200);
      vi.advanceTimersByTime(100);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('defaults to a 100ms delay when none is given', () => {
    const { result } = renderHook(() => useDebounce());
    const callback = vi.fn();

    act(() => {
      result.current(callback);
      vi.advanceTimersByTime(99);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
