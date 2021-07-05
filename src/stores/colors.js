import { writable } from "svelte/store";

const initialState = {
  all: [],
};

const { subscribe, set, update } = writable(initialState);

const createColorsStore = (_) => ({
  subscribe,
  setAll: (all) => update((state) => ({ ...state, all })),
  reset: () => set(initialState),
});

export default createColorsStore;
