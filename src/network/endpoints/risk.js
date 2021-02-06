import config from "../../config";

export const endpointForPropertiesByDate = (date, asRange) => {
  const riskIqdConfig = config.api.endpoints.risk;
  const configuration = asRange ? riskIqdConfig.date_range : riskIqdConfig.date;
  return endpointFor(configuration, [date, config.dateRange]);
};

const endpointFor = (endpointConfig, params) => {
  let endpoint = endpointConfig.string;
  endpointConfig.placeholders.forEach((placeholder, index) => {
    endpoint = endpoint.replace(placeholder, params[index]);
  });
  return `${config.api.url}${endpoint}`;
};
