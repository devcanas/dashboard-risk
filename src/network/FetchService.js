import { Endpoints } from "../constants";
import { endpointForInit } from "./endpoints/init";
import {
  endpointForConcelhosLayer,
  endpointForRiskLayer,
} from "./endpoints/layers";
import {
  endpointForSahByConcelho,
  endpointForSahByDate,
} from "./endpoints/nos";
import { endpointForPropertiesByDate } from "./endpoints/risk";

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

const availableDates = async (success, fail) => {
  return get(endpointForInit(), success, console.log);
};

const propertiesByDate = async (date, asRange, success, fail) => {
  return get(endpointForPropertiesByDate(date, asRange), success, console.log);
};

const sahByDate = async (date, asRange, success, fail) => {
  return get(endpointForSahByDate(date, asRange), success, console.log);
};

const sahByConcelho = async (concelho, success, fail) => {
  return get(endpointForSahByConcelho(concelho), success, console.log);
};

// Layer requests

export const riskIQDLayer = async (style, cb) =>
  getLayer(endpointForRiskLayer(), style, cb);

export const concelhosLayer = async (style, cb) =>
  getLayer(endpointForConcelhosLayer(), style, cb);

// Exports

const FetchService = {
  availableDates,
  riskIQDLayer,
  concelhosLayer,
  propertiesByDate,
  sahByDate,
  sahByConcelho,
};

export default FetchService;
