import { writable } from "svelte/store";

const defaultState = {
  concelho: "",
  data: [],
  edited: false,
};

const { subscribe, set, update } = writable(defaultState);

const sahChartStore = (_) => ({
  subscribe,
  setState: (newState) => update(() => ({ ...newState, edited: true })),
  reset: (_) => set(defaultState),
});

export default sahChartStore;
