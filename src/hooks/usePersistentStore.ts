import produce from "immer";
import create from "zustand";
import { PersistentState } from "../types/state";
import { DEFAULT_PERSISTENT_STATE } from "../utils/state";

const LOCAL_STORAGE_KEY = "bcsol-store";

// excludes functions
const saveState = (state: PersistentState) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};

/**
 * Provides access to the LocalStorage Zustand store
 */
export const usePersistentStore = create<PersistentState>((set) => {
  // retrieve local storage
  const existingStateString = localStorage.getItem(LOCAL_STORAGE_KEY);
  const state = existingStateString
    ? JSON.parse(existingStateString)
    : DEFAULT_PERSISTENT_STATE;

  if (!existingStateString) {
    saveState(state);
  }

  return {
    ...state,
    set: (fn) => {
      set(produce(fn));
    },
  };
});

usePersistentStore.subscribe((state) => {
  saveState(state);
});
