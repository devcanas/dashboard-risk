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

function getCColor(d) {
  return d < 0.4
    ? colors[0]
    : d < 0.5
    ? colors[2]
    : d < 0.6
    ? colors[4]
    : d < 0.7
    ? colors[6]
    : colors[8];
}

export const riskIqdStyle = (feature, mode) => ({
  fillColor: colorForRiskIqd(feature.properties, mode),
  weight: 0,
  dashArray: "0",
  fillOpacity: 1,
});

export const colorForRiskIqd = (properties, mode) => {
  return mode.isRiskMap ? getColor(properties.Risk) : getColor(properties.IQD);
};

export const concelhosStyle = (mode, value) => ({
  color: "#ccc",
  fillColor: colorForConcelhos(mode, value),
  fillOpacity: 0.7,
  weight: 0.5,
  opacity: 1,
  interactive: mode.isSAHMap,
});

export const colorForConcelhos = (mode, value) => {
  if (mode.isSAHMap && value !== "N/A") {
    return getCColor(value);
  } else if (mode.isSAHMap && value === "N/A") {
    return "rgb(0,0,0)";
  } else {
    return "rgba(0,0,0,0)";
  }
};

export default {
  riskIqd: {
    getStyle: riskIqdStyle,
    getColor: colorForRiskIqd,
  },
  concelhos: {
    getStyle: concelhosStyle,
    getColor: colorForConcelhos,
  },
};
