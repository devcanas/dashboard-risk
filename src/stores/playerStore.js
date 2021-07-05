import moment from "moment";
import { writable } from "svelte/store";

const initialState = {
  isPlaying: false,
};

const { subscribe, set, update } = writable(initialState);

const playerStore = (_) => ({
  subscribe,
  setIsPlaying: (isPlaying) => update((state) => ({ ...state, isPlaying })),
  reset: () => set(initialState),
});

export default playerStore;
