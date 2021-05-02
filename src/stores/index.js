import {
  createLoadingStore,
  createMenusStore,
  createMenuSelectionStore,
  createRiskIqdStore,
} from "./stores";

export const loading = createLoadingStore();
export const menuSelection = createMenuSelectionStore();
export const menus = createMenusStore();
export const riskIqd = createRiskIqdStore();
