import { writable } from "svelte/store";

const { subscribe, set, update } = writable(false);

const loadingStore = (_) => ({
  subscribe,
  setState: (newState) => update(() => newState),
  reset: () => set(false),
});

export default loadingStore;
