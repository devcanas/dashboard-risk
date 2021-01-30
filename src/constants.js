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

export const defaultLocation = Locations.filter((loc) => {
  return loc.id === config.defaultMapLocationId;
})[0];
