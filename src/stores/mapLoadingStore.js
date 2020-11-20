import { writable } from "svelte/store";

const { subscribe, set, update } = writable(true);

const loadingStore = (_) => ({
  subscribe,
  setState: (newState) => update(() => newState),
  reset: () => set(true),
});

export default loadingStore;
