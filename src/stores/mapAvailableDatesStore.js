import { writable } from "svelte/store";

const initialState = {
  selectedDate: null,
  dates: [],
};

const { subscribe, set, update } = writable(initialState);

const availableDatesStore = (_) => ({
  subscribe,
  setState: (dates) => update((state) => ({ ...state, dates })),
  selectDate: (selectedDate) => update((state) => ({ ...state, selectedDate })),
  reset: () => set(initialState),
});

export default availableDatesStore;
