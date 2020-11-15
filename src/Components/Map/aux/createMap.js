const START_ZOOM = 7;
const MIN_ZOOM = 7; // less than 7 the visualization gets bugged (not enough pixels for each square)
const MAX_ZOOM = 11;

const createMap = () => 
    L.map("covid-risk-map", {
        center: [39.38950933, -7.77282714],
        zoom: window.innerWidth < 700 ? START_ZOOM - 1 : START_ZOOM,
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM,
        fullscreenControl: true,
        preferCanvas: true, // without this, rendering 22 000 poligons gets painfully slow, and dragging/zooming the map is slow
    })

export default createMap;