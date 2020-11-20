export const MapModes = [
  {
    default: true,
    id: "riskMap",
    label: "Risco",
    isRiskMap: true,
    isIDQMap: false,
    isSAHMap: false,
  },
  {
    default: true,
    id: "idqMap",
    label: "Incerteza",
    isRiskMap: false,
    isIDQMap: true,
    isSAHMap: false,
  },
  {
    default: true,
    id: "sahMap",
    label: "Stay@Home",
    isRiskMap: true,
    isIDQMap: false,
    isSAHMap: true,
  },
];

export const Locations = [
  {
    default: true,
    id: "cte",
    label: "Continente",
    coords: [39.38950933, -7.77282714],
    zoom: 7,
  },
  {
    id: "mad",
    label: "Madeira",
    coords: [32.76071688, -16.60034179],
    zoom: 10,
  },
  {
    id: "ac",
    label: "Açores",
    coords: [38.51378825, -27.90527343],
    zoom: 8,
  },
];

const prod = false;
const devServer = "http://localhost:9000";
const prodServer = "http://covid.vps.tecnico.ulisboa.pt";
const server = prod ? prodServer : devServer;
const availableDates = `${server}/dates.php`;
const sah = `${server}/sah.php?date=`;
const concelhos = `${prod ? server : ""}/data/concelhos-portugal_0_001.js`;
const risk = (date) =>
  `${prod ? server : ""}/data/${date.split("-").join("_")}_risk_idq.js`;

export const Endpoints = {
  availableDates,
  sah,
  concelhos,
  risk,
};
