const START_ZOOM = 7;
const MIN_ZOOM = 7; // less than 7 the visualization gets bugged (not enough pixels for each square)
const MAX_ZOOM = 11;

export default function createMap() {
    let m = L.map("covid-risk-map", {
        center: [39.38950933, -7.77282714],
        zoom: window.innerWidth < 700 ? START_ZOOM - 1 : START_ZOOM,
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM,
        fullscreenControl: true,
        preferCanvas: true, // without this, rendering 22 000 poligons gets painfully slow, and dragging/zooming the map is slow
    })

    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 21,
        }
    ).addTo(m);
    return m;
}