import {
  createAvailableDatesStore,
  createLocationStore,
  createMapInfoStore,
  createLoadingStore,
  createMapModeStore,
  createMapSAHInfoStore,
  createRiskPropertiesStore,
  createSahChartStore,
} from "./stores";

export const loading = createLoadingStore();
export const mapMode = createMapModeStore();
export const mapInfo = createMapInfoStore();
export const sahInfo = createMapSAHInfoStore();
export const availableDates = createAvailableDatesStore();
export const mapLocation = createLocationStore();
export const riskProps = createRiskPropertiesStore();
export const sahChart = createSahChartStore();
