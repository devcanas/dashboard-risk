const prodConfig = (_) => ({
  dateRange: 15,
  rangeFetchPadding: 5,
  dateFormat: "YYYY-MM-DD",
});

const devConfig = (_) => ({
  dateRange: 15,
  rangeFetchPadding: 5,
  dateFormat: "YYYY-MM-DD",
});

// Manually change to produce prod / dev environments for the app
// This changes the endpoints as well as any configs you include in the objects below
// The configs should have parity betwen them
export default devConfig();
