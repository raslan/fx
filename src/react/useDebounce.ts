import { useCallback, useRef } from 'react';

/**
 * Returns a `debounce(callback, delay?)` function: each call resets a
 * timer, so `callback` only runs once calls stop arriving for `delay`
 * milliseconds (default 100ms).
 */
export function useDebounce(): (callback?: () => void | Promise<void>, delay?: number) => void {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  return useCallback((callback, delay) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      void callback?.();
    }, delay ?? 100);
  }, []);
}
