import { writable } from 'svelte/store';

function createMapModeStore() {
	const { subscribe, set, update } = writable(true);

	return {
		subscribe,
        setTrue: () => update(val => true) ,
        setFalse: () => update(val => false) ,
		reset: () => set(true)
	};
}

function createLoading() {
	const { subscribe, set, update } = writable(true);

	return {
		subscribe,
        setState: (newState) => update(() => newState) ,
		reset: () => set(true)
	};
}

const initialInfoState = {
    concelho: "",
    Risk: 0,
    IQD: 0,
    FicarEmCasa: 0,
    edited: false
}

function createInfoStore() {
    const { subscribe, set, update } = writable(initialInfoState);

	return {
		subscribe,
        setState: (newState) => update(() =>  { return { ...newState, edited: true } }) ,
		reset: () => set(initialInfoState)
	};
}


function createNosInfo() {
    const { subscribe, set, update } = writable([]);

	return {
		subscribe,
        setState: (newState) => update(() =>  { return newState }) ,
		reset: () => set(initialInfoState)
	};
}

export const loading = createLoading();
export const isRiskMap = createMapModeStore();
export const info = createInfoStore();
export const nosInfo = createNosInfo()