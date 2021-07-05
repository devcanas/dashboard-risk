import createAvailableDatesStore from "./availableDates";
import loadingStore from "./loadingStore";
import menuStore from "./menus";
import menuSelectionStore from "./menuSelectionStore";
import timelineControlsStore from "./timelineControls";
import createColorsStore from "./colors";
import dateSelectionStore from "./dateSelectionStore";
import playerStore from "./playerStore";
import mapDataStore from "./mapData";

export const loading = loadingStore();
export const menuSelection = menuSelectionStore();
export const menus = menuStore();
export const timelineControls = timelineControlsStore();
export const availableDatesStore = createAvailableDatesStore();
export const colorsStore = createColorsStore();
export const dateSelection = dateSelectionStore();
export const player = playerStore();
export const mapData = mapDataStore();
