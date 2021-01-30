import { writable } from "svelte/store";

const initialState = {
  shouldUpdate: true,
};

const { subscribe, set, update } = writable(initialState);

const riskPropertiesStore = (_) => ({
  subscribe,
  setState: (newState) =>
    update(({ shouldUpdate }) => ({ ...newState, shouldUpdate })),
  setShouldUpdate: (shouldUpdate) =>
    update((state) => ({ ...state, shouldUpdate })),
  reset: (_) => set(initialState),
});

export default riskPropertiesStore;
