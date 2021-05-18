import { writable } from "svelte/store";

const initialState = {
  isScrubbing: false,
  isAdjustingLowerBound: false,
  isAdjustingUpperBound: false,
};

const { subscribe, set, update } = writable(initialState);

const timelineControlsStore = () => ({
  subscribe,
  setIsScrubbing: (isScrubbing) =>
    update((_) => ({ ...initialState, isScrubbing })),
  setIsAdjustingLowerBound: (isAdjustingLowerBound) =>
    update((_) => ({ ...initialState, isAdjustingLowerBound })),
  setIsAdjustingUpperBound: (isAdjustingUpperBound) =>
    update((_) => ({ ...initialState, isAdjustingUpperBound })),
  reset: () => set(initialState),
});

export default timelineControlsStore;
