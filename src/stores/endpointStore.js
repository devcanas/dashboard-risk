import { writable } from "svelte/store";

const initialState = {};

const { subscribe, set, update } = writable(initialState);

const endpointStore = () => ({
  subscribe,
  setState: (newState) => update((_) => newState),
  reset: () => set(initialState),
});

export default endpointStore;
