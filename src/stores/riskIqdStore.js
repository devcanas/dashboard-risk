import { writable } from "svelte/store";

const initialState = {
  date: "",
  values: [],
  colors: {
    risk: [],
    iqd: [],
  },
};

const { subscribe, set, update } = writable(initialState);

const riskIqdStore = (_) => ({
  subscribe,
  setState: (newState) => update((_) => newState),
  reset: () => set(initialState),
});

export default riskIqdStore;
