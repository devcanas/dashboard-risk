import config from "../../config";

export const endpointForConcelhosLayer = async (date, asRange) => {
  const nosConfig = config.api.endpoints.nos;
  const configuration = asRange ? nosConfig.date_range : nosConfig.date;
  return endpointFor(configuration, [date]);
};

export const endpointForRiskLayer = async (concelho) => {
  const configuration = config.api.endpoints.nos.concelho;
  return endpointFor(configuration, [concelho]);
};
