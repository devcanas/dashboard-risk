import config from "../../config";

export const endpointForConcelhosLayer = () => {
  return config.layer.concelho;
};

export const endpointForRiskLayer = () => {
  return config.layer.riskIqd;
};
