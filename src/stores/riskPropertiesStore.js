import { writable } from "svelte/store";

const initialState = {};

const { subscribe, set, update } = writable(initialState);

const riskPropertiesStore = (_) => ({
  subscribe,
  setState: (newState) => update((_) => newState),
  reset: (_) => set(initialState),
});

export default riskPropertiesStore;
