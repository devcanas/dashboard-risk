const tileLayer = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 21,
  }
);

const mapSettings = (
  { coords, zoom } = {
    coords: [39.56827914916011, -9.469218750000001],
    zoom: 7,
  }
) => ({
  center: coords,
  zoom: zoom,
  minZoom: 7, // less zoomed than this and the map gets bugged out
  maxZoom: 11,
  preferCanvas: true,
  zoomControl: false,
});

const createMap = (locationDetails) => {
  const map = L.map("covid-risk-map", mapSettings(locationDetails));
  tileLayer.addTo(map);

  L.control
    .zoom({
      position: "topright",
    })
    .addTo(map);

  return map;
};

export default createMap;
