import { writable } from 'svelte/store';
import { MapModes } from "../constants";

const initialState = {
    isRiskMap: true,
    isIDQMap: false,
    isSAHMap: false
}

const { subscribe, set, update } = writable(initialState);

const mapModeStore = () => ({
    subscribe,
    setMapMode: newMode => update(_ => ({
        isRiskMap: newMode === MapModes.riskMap,
        isIDQMap: newMode === MapModes.idqMap,
        isSAHMap: newMode === MapModes.sahMap
    })),
    reset: () => set(MapModes.default)
});

export default mapModeStore;