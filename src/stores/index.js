import { 
    createMapInfoStore,
    createMapLoadingStore,
    createMapModeStore,
    createMapSAHInfoStore
} from "./stores";

export const loading = createMapLoadingStore();
export const mapMode = createMapModeStore();
export const mapInfo = createMapInfoStore();
export const sahInfo = createMapSAHInfoStore();