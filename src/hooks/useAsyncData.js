import { useState, useEffect, useCallback } from 'react';

// This custom hook is used to handle asynchronous data fetching with loading and error states
export function useAsyncData(fetchFn, deps = [], { immediate = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  // This function is used to execute the async fetch and manage loading/error state
  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
      setData(null);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // This effect is used to trigger the async fetch on mount if immediate is true
  useEffect(() => {
    if (immediate) {
      execute();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute]);

  return { data, loading, error, refetch: execute };
}

// This function is used to simulate network delay for async operations
export function fakeAPI(fn, delayMs = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(fn());
      } catch (err) {
        reject(err);
      }
    }, delayMs);
  });
}
