import { writable } from "svelte/store";
import { MapModes } from "../constants";

const defaultState = MapModes.filter((mm) => mm.default)[0];

const { subscribe, set, update } = writable(defaultState);

const mapModeStore = () => ({
  subscribe,
  setState: (newMode) => update((_) => newMode),
  reset: () => set(defaultState),
});

export default mapModeStore;
