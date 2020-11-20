import { writable } from "svelte/store";

const { subscribe, set, update } = writable([]);

const mapSAHInfoStore = (_) => ({
  subscribe,
  setState: (newState) => update((_) => newState),
  reset: (_) => set(initialInfoState),
});

export default mapSAHInfoStore;
