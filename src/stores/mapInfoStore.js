import { writable } from 'svelte/store';

const defaultState = {
    concelho: "",
    Risk: 0,
    IQD: 0,
    sah: 0,
    edited: false
}

const { subscribe, set, update } = writable(defaultState);

const infoStore = _ => ({
    subscribe,
    setState: newState => update(() =>  ({ ...newState, edited: true  })) ,
    reset: _ => set(defaultState)
})

export default infoStore;