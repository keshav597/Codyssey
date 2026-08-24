import { useState, useEffect, useCallback } from 'react';

/**
 * useLocalStorage
 * Keeps a piece of React state in sync with a single localStorage key.
 * This is the ONLY place in the app that should read/write localStorage
 * directly for stateful data — every other hook/component goes through this.
 */
export function useLocalStorage(key, initialValue) {
  const [storedKey, setStoredKey] = useState(key);
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.warn(`useLocalStorage: failed to read "${key}"`, err);
      return initialValue;
    }
  });

  // Synchronously update value if key changes before effect fires
  if (storedKey !== key) {
    setStoredKey(key);
    let nextVal = initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      nextVal = stored !== null ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.warn(`useLocalStorage: failed to read "${key}"`, err);
    }
    setValue(nextVal);
  }

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`useLocalStorage: failed to write "${key}"`, err);
    }
  }, [key, value]);

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setValue(initialValue);
    } catch (err) {
      console.warn(`useLocalStorage: failed to remove "${key}"`, err);
    }
  }, [key, initialValue]);

  return [value, setValue, remove];
}
