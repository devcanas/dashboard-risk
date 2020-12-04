import { writable } from "svelte/store";

const defaultState = {
  isLayerLoading: false,
  isConcelhoChartLoading: false,
};

const { subscribe, set, update } = writable(defaultState);

const loadingStore = (_) => ({
  subscribe,
  setState: (newState) => update(() => newState),
  reset: () => set(defaultState),
});

export default loadingStore;
