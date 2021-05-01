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

const initialConfiguration = async (success, fail) => {
  return get("http://localhost:9000/init", success, console.log);
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

// Exports

const FetchService = {
  initialConfiguration,
  propertiesByDate,
  sahByDate,
  sahByConcelho,
  getLayer,
};

class FetchService {

  static getLayers()

  constructor(config) {
    this.config = config;
  }
}

export default FetchService;
