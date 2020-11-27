import { Endpoints } from "./constants";

const get = async (endpoint, success, failure = (_) => {}) => {
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => success(data))
    .catch((err) => failure(err, endpoint));
};

const getAvailableDates = async (success, fail) => {
  return get(Endpoints.availableDates, success, console.log);
};

const getSah = async ({ date, concelho }, success, fail) => {
  date && getSahForDate(date, success, fail);
  concelho && getSahForConcelho(concelho, success, fail);
};

const getSahForDate = async (date, success, fail) => {
  return get(`${Endpoints.sahDate}${date}`, success, console.log);
};

const getSahForConcelho = async (concelho, success, fail) => {
  return get(`${Endpoints.sahConcelho}${concelho}`, success, console.log);
};

const getLayer = async (endpoint = Endpoints.concelhos, style, cb) => {
  return get(
    endpoint,
    (data) => {
      cb(L.geoJSON(data, { style }));
    },
    console.log
  );
};
const getProperties = async (success, fail) => {
  return get(Endpoints.properties, success, console.log);
};

export const getRiskIQDLayer = async (style, cb) =>
  getLayer(Endpoints.risk, style, cb);
export const getConcelhosLayer = async (style, cb) =>
  getLayer(Endpoints.concelhos, style, cb);

const FetchService = {
  getAvailableDates,
  getSah,
  getRiskIQDLayer,
  getConcelhosLayer,
  getProperties,
};

export default FetchService;
