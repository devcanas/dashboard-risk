import { writable } from "svelte/store";
import { Locations } from "../constants";

const initialState = Locations.filter((loc) => loc.default)[0];

const { subscribe, set, update } = writable(initialState);

const locationStore = () => ({
  subscribe,
  setState: (newLocation) => update((_) => newLocation),
  reset: () => set(Locations.default.coords),
});

export default locationStore;
