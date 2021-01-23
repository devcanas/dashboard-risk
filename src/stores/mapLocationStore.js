import { writable } from "svelte/store";
import { defaultLocation } from "../constants";

const initialState = defaultLocation;

const { subscribe, set, update } = writable(initialState);

const locationStore = () => ({
  subscribe,
  setState: (newLocation) => update((_) => newLocation),
  reset: () => set(Locations.default.coords),
});

export default locationStore;
