import { writable } from "svelte/store";

const defaultState = {
  isPred: false,
  colors: [],
};

const { subscribe, set, update } = writable(defaultState);

const mapDataStore = (_) => ({
  subscribe,
  setState: (newState) => update(() => newState),
  reset: () => set(defaultState),
});

export default mapDataStore;
