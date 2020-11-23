import { Endpoints } from "./constants";

const get = (endpoint, success, failure = (_) => {}) => {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => success(data))
    .catch((err) => failure(err, endpoint));
};

const getAvailableDates = (success, fail) => {
  get(Endpoints.availableDates, success, console.log);
};

const getSah = (date, success, fail) => {
  get(`${Endpoints.sah}${date}`, success, console.log);
};

const getLayer = (endpoint = Endpoints.concelhos, style, cb) => {
  get(
    endpoint,
    (data) => {
      cb(L.geoJSON(data, { style }));
    },
    console.log
  );
};
const getProperties = (success, fail) =>
  get(Endpoints.properties, success, console.log);

export const getRiskIQDLayer = (style, cb) =>
  getLayer(Endpoints.risk, style, cb);
export const getConcelhosLayer = (style, cb) =>
  getLayer(Endpoints.concelhos, style, cb);

const FetchService = {
  getAvailableDates,
  getSah,
  getRiskIQDLayer,
  getConcelhosLayer,
  getProperties,
};

export default FetchService;
