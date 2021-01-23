import config from "../configg";
import { Endpoints } from "../constantss";
import {
  endpointForConcelhosLayer,
  endpointForRiskLayer,
} from "./endpoints/layers";
import {
  endpointForSahByConcelho,
  endpointForSahByDate,
} from "./endpoints/nos";

// Helper functions

const get = async (endpoint, success, failure = (_) => {}) => {
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => success(data))
    .catch((err) => failure(err, endpoint));
};

const getLayer = async (endpoint, style, cb) => {
  return get(
    endpoint,
    (data) => {
      cb(L.geoJSON(data, { style }));
    },
    console.log
  );
};

// API requests

const getAvailableDates = async (success, fail) => {
  return get(Endpoints.availableDates, success, console.log);
};

const getProperties = async (success, fail) => {
  return get(Endpoints.properties, success, console.log);
};

const sahByDate = async (date, asRange, success, fail) => {
  return get(endpointForSahByDate(date, asRange), success, console.log);
};

const sahByConcelho = async (concelho, success, fail) => {
  return get(endpointForSahByConcelho(concelho), success, console.log);
};

// Layer requests

export const riskIQDLayer = async (style, cb) =>
  getLayer(endpointForConcelhosLayer(), style, cb);

export const concelhosLayer = async (style, cb) =>
  getLayer(endpointForRiskLayer(), style, cb);

// Exports

const FetchService = {
  getAvailableDates,
  getProperties,

  riskIQDLayer,
  concelhosLayer,
  sahByDate,
  sahByConcelho,
};

export default FetchService;
