import { createStore } from 'vuex';

export const store = createStore({
 state: {
 colorMap: JSON.parse(localStorage.getItem('colorMap')) || {},
 },
 mutations: {
 setColorMap(state, colorMap) {
 state.colorMap = colorMap;
 localStorage.setItem('colorMap', JSON.stringify(colorMap));
 },
 },
});
    