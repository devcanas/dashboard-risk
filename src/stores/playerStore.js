import { writable } from "svelte/store";

const initialState = {
  isScrubbing: false,
  isPlaying: false,
  currentPosition: 0,
};

const { subscribe, set, update } = writable(initialState);

const playerStore = (_) => ({
  subscribe,
  setState: (newState) => update((_) => newState),
  reset: (_) => set(initialState),
});

export default playerStore;
