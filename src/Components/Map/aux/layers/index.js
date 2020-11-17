const layer = (location, style, cb) => {
    fetch(location)
    .then(res => res.json())
    .then(data => { cb(L.geoJSON(data, { style })) })
}

export const getRiskIQDLayer = (endpoint, style, cb) => layer(endpoint, style, cb);
export const getConcelhosLayer = (style, cb) => layer("/data/concelhos-portugal_0_001.js", style, cb)

export const tileLayer = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 21,
    }
)