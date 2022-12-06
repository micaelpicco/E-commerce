import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      return initialValue;
    }
  };
  return [storedValue, setValue];
}

export const setSession = (value) =>
  window.localStorage.setItem("userData", JSON.stringify(value));

export const getUserData = async () =>
  await JSON.parse(window.localStorage.getItem("userData"));
