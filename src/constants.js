import config from "./config";

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
    isRiskMap: false,
    isIDQMap: false,
    isSAHMap: true,
  },
];

export const Locations = [
  {
    id: "continente",
    label: "Continente",
    coords: [39.38950933, -7.77282714],
    zoom: 7,
  },
  {
    id: "madeira",
    label: "Madeira",
    coords: [32.76071688, -16.60034179],
    zoom: 10,
  },
  {
    id: "acores",
    label: "Açores",
    coords: [38.51378825, -27.90527343],
    zoom: 8,
  },
];

const prod = false;
const devServer = "http://covid-risk.com:8000";
const prodServer = "http://covid.vps.tecnico.ulisboa.pt";
const server = prod ? prodServer : devServer;
const availableDates = `${
  prod ? server : "http://covid-risk.com:8000"
}/dates.php`;
const sahDate = `${prod ? server : "http://covid-risk.com:8000"}/sah.php?date=`;
const sahConcelho = `${
  prod ? server : "http://covid-risk.com:8000"
}/sah.php?concelho_name=`;
const concelhos = `${prod ? server : ""}/data/concelhos-portugal_0_001.js`;
const risk = `${prod ? server : ""}/build/riskIdq.js`;
const properties = `${prod ? server : ""}/build/properties.js`;

export const Endpoints = {
  availableDates,
  sahDate,
  sahConcelho,
  concelhos,
  risk,
  properties,
};

export const defaultLocation = Locations.filter((loc) => {
  return loc.id === config.defaultMapLocationId;
})[0];
