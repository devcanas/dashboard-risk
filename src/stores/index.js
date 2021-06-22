import createAvailableDatesStore from "./availableDates";
import loadingStore from "./loadingStore";
import menuStore from "./menus";
import menuSelectionStore from "./menuSelectionStore";
import riskIqdStore from "./riskIqdStore";
import timelineControlsStore from "./timelineControls";
import createColorsStore from "./colors";

export const loading = loadingStore();
export const menuSelection = menuSelectionStore();
export const menus = menuStore();
export const riskIqd = riskIqdStore();
export const timelineControls = timelineControlsStore();
export const availableDatesStore = createAvailableDatesStore();
export const colorsStore = createColorsStore();
