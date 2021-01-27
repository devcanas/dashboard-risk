import config from "../../config";

// stay@home for every concelho for a specific date
// if asRange is specified it will return 15 days forward and back from the
// date passed in as param. This is to avoid doing too many network requests
export const endpointForSahByDate = (date, asRange) => {
  const nosConfig = config.api.endpoints.nos;
  const configuration = asRange ? nosConfig.date_range : nosConfig.date;
  return endpointFor(configuration, [date]);
};

// stay@home values for the last 30 days of records for a specific concelho
export const endpointForSahByConcelho = (concelho) => {
  const configuration = config.api.endpoints.nos.concelho;
  return endpointFor(configuration, [concelho]);
};

const endpointFor = (endpointConfig, params) => {
  let endpoint = endpointConfig.string;
  endpointConfig.placeholders.forEach((placeholder, index) => {
    endpoint = endpoint.replace(placeholder, params[index]);
  });
  return `${config.api.url}${endpoint}`;
};
