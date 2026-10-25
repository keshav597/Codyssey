import { useState, useEffect, useCallback } from 'react';

// This custom hook is used to sync React state with the browser localStorage
export function useLocalStorage(key, initialValue) {
  const [storedKey, setStoredKey] = useState(key);

  // This function is used to read and parse the stored JSON value from localStorage
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.warn(`useLocalStorage: failed to read "${key}"`, err);
      return initialValue;
    }
  });

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

  // This effect is used to serialize and write updated state to localStorage as JSON
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`useLocalStorage: failed to write "${key}"`, err);
    }
  }, [key, value]);

  // This function is used to remove the key from localStorage and reset to initial value
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
