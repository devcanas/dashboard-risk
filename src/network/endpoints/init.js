import config from "../../config";

export const endpointForInit = () => {
  return endpointFor(config.api.endpoints.init);
};

const endpointFor = (endpoint) => {
  return `${config.api.url}${endpoint}`;
};
