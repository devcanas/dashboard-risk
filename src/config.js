const prodConfig = (_) => ({
  defaultMapLocationId: "continente",
  api: {
    url: "http://covid.vps.tecnico.ulisboa.pt/api",
    endpoints: endpoints,
  },
  layer: {
    concelho: "/data/concelhos-portugal_0_001.js",
    riskIqd: "/build/riskIdq.js",
  },
});

const devConfig = (_) => ({
  defaultMapLocationId: "continente",
  api: {
    url: "http://covid-risk.com:9000",
    endpoints: endpoints,
  },
  layer: {
    concelho: "/data/concelhos-portugal_0_001.js",
    riskIqd: "/build/riskIdq.js",
  },
});

const endpoints = {
  nos: {
    date: {
      placeholders: ["{date}"],
      string: "/nos/date/{date}",
    },
    date_range: {
      placeholders: ["{date}"],
      string: "/nos/date/{date}/range/15",
    },
    concelho: {
      placeholders: ["{concelho}"],
      string: "/nos/concelho/{concelho}/",
    },
  },
  risk: {},
};

// Manually change to produce prod / dev environments for the app
// This changes the endpoints as well as any configs you include in the objects below
// The configs should have parity betwen them
export default devConfig();
