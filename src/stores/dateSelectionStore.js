import { writable } from "svelte/store";

const initialState = {
  selectedDate: null,
  startDateOffset: 0,
  metadata: {
    startDate: null,
    dataLength: 0,
  },
};

const { subscribe, set, update } = writable(initialState);

const dateSelectionStore = (_) => ({
  subscribe,
  setState: (newState) => update((_) => newState),
  setMetadata: ({ dataLength, startDate }) =>
    update((state) => ({ ...state, metadata: { dataLength, startDate } })),
  setSelectedDate: (selectedDate, startDateOffset) =>
    update((state) => ({ ...state, selectedDate, startDateOffset })),
  reset: () => set(initialState),
});

export default dateSelectionStore;
