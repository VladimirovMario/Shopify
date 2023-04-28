import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state synchronous function to useState so logic is only executed once
  const [state, setState] = useState(() => {
    // Get from local storage by key
    const persistedStateSerialized = localStorage.getItem(key);

    if (persistedStateSerialized) {
      // Parse stored json
      const persistedState = JSON.parse(persistedStateSerialized);
      return persistedState;
    }
    // or if none return initialValue
    return initialValue;
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setLocalStorageState = (value) => {
    // Allow value to be a function so we have same API as useState
    const valueToStore = value instanceof Function ? value(state) : value;
    // Save state
    setState(valueToStore);
    // Save to local storage
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [state, setLocalStorageState];
};
