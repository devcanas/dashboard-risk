const MIN_ZOOM = 7; // less than 7 the visualization gets bugged (not enough pixels for each square)
const MAX_ZOOM = 11;

const tileLayer = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 21,
  }
);

const mapSettings = ({ coords, zoom }) => ({
  center: coords,
  zoom: zoom,
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
  // without this, rendering 22 000 poligons
  // gets painfully slow, and dragging/zooming the map is slow
  preferCanvas: true,
});

const createMap = (locationDetails) => {
  const map = L.map("covid-risk-map", mapSettings(locationDetails));
  tileLayer.addTo(map);
  return map;
};

export default createMap;
