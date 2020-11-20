const layer = (location, style, cb, err) => {
    fetch(location)
    .then(res => res.json())
    .then(data => { cb(L.geoJSON(data, { style })) })
    .catch(_ => err())
}

export const getRiskIQDLayer = (endpoint, style, cb, err) => layer(endpoint, style, cb, err);
export const getConcelhosLayer = (style, cb) => layer("/data/concelhos-portugal_0_001.js", style, cb)

export const tileLayer = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 21,
    }
)