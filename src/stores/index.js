import {
  createAvailableDatesStore,
  createMapInfoStore,
  createLoadingStore,
  createMapSAHInfoStore,
  createRiskPropertiesStore,
  createSahChartStore,
  createPlayerStore,
  createMenusStore,
  createMenuSelectionStore,
} from "./stores";

export const loading = createLoadingStore();
export const mapInfo = createMapInfoStore();
export const sahInfo = createMapSAHInfoStore();
export const availableDates = createAvailableDatesStore();
export const menuSelection = createMenuSelectionStore();
export const riskProps = createRiskPropertiesStore();
export const sahChart = createSahChartStore();
export const player = createPlayerStore();
export const menus = createMenusStore();
