import loadingStore from "./loadingStore";
import menuStore from "./menus";
import menuSelectionStore from "./menuSelectionStore";
import riskIqdStore from "./riskIqdStore";
import timelineControlsStore from "./timelineControls";

export const loading = loadingStore();
export const menuSelection = menuSelectionStore();
export const menus = menuStore();
export const riskIqd = riskIqdStore();
export const timelineControls = timelineControlsStore();
