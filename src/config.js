const prodConfig = (_) => ({
  defaultMapLocationId: "continente",
  dateRange: 15,
  // if selectedDate +- rangeFetchPadding is a cach miss, fetch the dateRange for the selectedDate
  rangeFetchPadding: 5,
  dateFormat: "YYYY-MM-DD",
  api: {
    url: "http://covid.vps.tecnico.ulisboa.pt/api",
    endpoints: endpoints,
  },
  layer: {
    concelho:
      "http://covid.vps.tecnico.ulisboa.pt/data/concelhos-portugal_0_001.js",
    riskIqd: "http://covid.vps.tecnico.ulisboa.pt/build/riskIdq.js",
  },
});

const devConfig = (_) => ({
  defaultMapLocationId: "continente",
  dateRange: 15,
  // if selectedDate +- rangeFetchPadding is a cach miss, fetch the dateRange for the selectedDate
  rangeFetchPadding: 5,
  dateFormat: "YYYY-MM-DD",
  api: {
    url: "http://localhost:9000",
    endpoints: endpoints,
  },
  layer: {
    concelho: `${window.location.href}data/concelhos-portugal_0_001.js`,
    riskIqd: `${window.location.href}build/riskIdq.js`,
  },
});

const endpoints = {
  init: "/init",
  nos: {
    date: {
      placeholders: ["{date}"],
      string: "/nos/date/{date}",
    },
    date_range: {
      placeholders: ["{date}", "{range}"],
      string: `/nos/date/{date}/range/{range}`,
    },
    concelho: {
      placeholders: ["{concelho}"],
      string: "/nos/concelho/{concelho}/",
    },
  },
  risk: {
    date: {
      placeholders: ["{date}"],
      string: "/riskIqd/date/{date}",
    },
    date_range: {
      placeholders: ["{date}", "{range}"],
      string: `/riskIqd/date/{date}/range/{range}`,
    },
  },
};

// Manually change to produce prod / dev environments for the app
// This changes the endpoints as well as any configs you include in the objects below
// The configs should have parity betwen them
export default devConfig();
