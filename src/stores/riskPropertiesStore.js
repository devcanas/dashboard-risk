import { writable } from "svelte/store";

const initialState = {
  initialRender: true,
};

const { subscribe, set, update } = writable(initialState);

const riskPropertiesStore = (_) => ({
  subscribe,
  setState: (newState) =>
    update(({ initialRender }) => ({ ...newState, initialRender })),
  initialRender: (initialRender) =>
    update((state) => ({ ...state, initialRender })),
  reset: (_) => set(initialState),
});

export default riskPropertiesStore;
