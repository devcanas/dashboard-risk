import App from './App/index.svelte';
import './Assets/css/global.css';
require("@babel/polyfill");

const app = new App({
    target: document.body
});

window.app = app;

export default app;
