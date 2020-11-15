export const getRiskIQDLayer = (style, cb) => {
    fetch("/data/2020_10_27_risk_idq.js")
    .then(res => res.json())
    .then(data => {
        cb(L.geoJSON(data, { style }))
    })
}

export const getConcelhosLayer = (cb) => {
    fetch("/data/concelhos-portugal_0_001.js")
    .then(res => res.json())
    .then(data => {
        cb(L.geoJSON(data, {
            style: {
                color: "#000000", // this is border color
                fillColor: "#00000000",
                weight: 0.5, // border
                opacity: 1,
            }
        }))
    })
}