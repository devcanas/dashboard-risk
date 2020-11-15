var colors = [
  "#481567",
  "#453781",
  "#39568c",
  "#2d708e",
  "#238a8d",
  "#20a387",
  "#3cbb75",
  "#73d055",
  "#b8de29",
  "#fde725",
];

function getColor(d) {
    return d < 100
    ? colors[0]
    : d < 200
    ? colors[1]
    : d < 300
    ? colors[2]
    : d < 400
    ? colors[3]
    : d < 500
    ? colors[4]
    : d < 600
    ? colors[5]
    : d < 700
    ? colors[6]
    : d < 800
    ? colors[7]
    : d < 900
    ? colors[8]
    : colors[9];
}

function style(feature, isRiskMap) {
    return {
        fillColor: getColorFor(feature.properties, isRiskMap),
        weight: 0,
        dashArray: "0",
        fillOpacity: 0.8,
    };
}

function getColorFor(properties, isRiskMap) {
    return isRiskMap
            ? getColor(properties.Risk)
            : getColor(properties.IQD);
}

module.exports = {
    style,
    getColorFor
}