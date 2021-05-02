import { index } from "d3-array";

const range = 10;
let apiEndpoints;

const get = async (endpoint) => {
  const res = await fetch(endpoint);
  const value = await res.json();

  if (res.ok) return value;
  else throw new Error(`Failed request with URL: ${endpoint}`);
};

const getLayers = async () => {
  const risk = await get(apiEndpoints.layers.riskIqd);
  const concelhos = await get(apiEndpoints.layers.concelho);
  return {
    risk,
    concelhos,
  };
};

const buildRequestURL = (value, asRange, { date, date_range }) => {
  const pathObj = asRange ? date_range : date;
  const path = pathObj.string;
  const values = asRange ? [value, range] : [value];
  const urlWithPlaceholders = `${apiEndpoints.url}${path}`;

  let url = urlWithPlaceholders;
  pathObj.placeholders.forEach((placeholder, index) => {
    url = url.replace(placeholder, values[index]);
  });

  return url;
};

// API requests

// covid-vps-.... when running in the server;
const configEndpoint = "http://localhost:9000/init";
const initialConfiguration = () => {
  return get(configEndpoint);
};

const riskIqd = async (date, asRange = false) => {
  if (!date) {
    console.error(`Invalid date for request: ${date}`);
  }

  return get(buildRequestURL(date, asRange, apiEndpoints.data.risk));
};

const sahByDate = async (date, asRange = false) => {
  if (!date) {
    console.error(`Invalid date for request: ${date}`);
  }

  return get(buildRequestURL(date, asRange, apiEndpoints.data.nos));
};

const sahByConcelho = async (concelho) => {
  if (!concelho) {
    console.error(`Invalid concelho for request: ${concelho}`);
  }

  const pathObj = apiEndpoints.data.nos.concelho;
  const urlWithPlaceholders = `${apiEndpoints.url}${pathObj.string}`;
  const url = urlWithPlaceholders.replace(pathObj.placeholders[0], concelho);
  return get(url);
};

const init = (endpoints) => {
  if (!apiEndpoints) {
    apiEndpoints = endpoints;
  }
};

// Exports

const FetchService = {
  initialConfiguration,
  riskIqd,
  sahByDate,
  sahByConcelho,
  getLayers,
  init,
};

export default FetchService;
