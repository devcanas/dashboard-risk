import { writable } from "svelte/store";

const initialState = {
  selectedInfoSourceId: "",
  selectedMapLocationId: "",
};

const { subscribe, set, update } = writable(initialState);

const menuSelectionStore = (_) => ({
  subscribe,
  setState: (newState) => update((_) => newState),
  setInfoSourceId: (id) =>
    update((state) => ({ ...state, selectedInfoSourceId: id })),
  setMapLocationId: (id) =>
    update((state) => ({ ...state, selectedMapLocationId: id })),
  reset: () => set(Locations.default.coords),
});

export default menuSelectionStore;
