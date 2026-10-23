/**
 * useAsyncData.js — Custom hook for async data fetching with loading/error state
 *
 * This is the standard pattern for async state in React:
 *   - loading: boolean (shows spinner)
 *   - error: string | null (shows error message)
 *   - data: any (the fetched result)
 *
 * In Codyssey the real data comes from localStorage (synchronous), but
 * this hook simulates an API call with a configurable delay.
 * In a real app, you'd swap the fetchFn for a real fetch() call.
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * useAsyncData
 *
 * @param {Function} fetchFn  - An async function that returns the data.
 *                              Receives no arguments. Should return a Promise.
 * @param {any[]} deps        - Dependency array (re-fetches when these change).
 * @param {object} options
 * @param {boolean} options.immediate - Whether to fetch immediately on mount (default: true)
 *
 * @returns {{ data, loading, error, refetch }}
 */
export function useAsyncData(fetchFn, deps = [], { immediate = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate); // start true if fetching immediately
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null); // clear previous error on each attempt
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
      setData(null);
    } finally {
      setLoading(false); // always runs — success OR failure
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute]);

  return { data, loading, error, refetch: execute };
}

/**
 * Fake API utility — simulates network delay
 * Replace this with real fetch() calls in a production app.
 *
 * Usage:
 *   const data = await fakeAPI(() => SHOP_ITEMS, 1200);
 *   // waits 1.2 seconds then returns SHOP_ITEMS
 *
 * Simulating errors:
 *   const data = await fakeAPI(() => { throw new Error('Server error'); }, 800);
 */
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
