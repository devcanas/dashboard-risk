import { writable } from "svelte/store";

const initialState = {
  infoSourceMenu: [],
  mapLocationMenu: [],
};

const { subscribe, set, update } = writable(initialState);

const menuStore = () => ({
  subscribe,
  setState: (menus) => update((_) => menus),
  reset: () => set(initialState),
});

export default menuStore;
