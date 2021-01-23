import FetchService from "../../FetchService";

const makeVegaJSONFor = (concelhoData) => {
  const concelhoDataPoints = concelhoData.map((data) => {
    return {
      x: data.date,
      y: parseInt(data.percent),
      c: 0,
    };
  });

  const concelhoDataPointsLast30Days = concelhoDataPoints.filter((data) => {
    const [year, month, day] = data.x.split("-");
    const date = new Date(year, month - 1, day);
    const latestDateData = concelhoData[concelhoData.length - 1].date.split(
      "-"
    );
    const latestDate = new Date(
      latestDateData[0],
      latestDateData[1] - 1,
      latestDateData[2]
    );

    const thirtyDaysEarlier = latestDate.setDate(latestDate.getDate() - 30);
    return date >= thirtyDaysEarlier;
  });

  if (concelhoDataPointsLast30Days.length === 0) return null;
  vegaTemplate.data[0].values = concelhoDataPointsLast30Days;
  return vegaTemplate;
};

const showChartFor = (concelho, store, cb) => {
  FetchService.getSah({ concelho }, (concelhoData) => {
    const chartData = makeVegaJSONFor(concelhoData);
    store.setState({
      edited: true,
      concelho: concelho,
      data: chartData,
    });
    cb();
  });
};

export default showChartFor;

const vegaTemplate = {
  $schema: "https://vega.github.io/schema/vega/v5.json",
  description: "A basic line chart example.",
  width: 600,
  height: 200,
  padding: 5,

  signals: [
    {
      name: "interpolate",
      value: "linear",
    },
  ],

  data: [
    {
      name: "table",
      values: [],
    },
  ],

  scales: [
    {
      name: "x",
      type: "point",
      range: "width",
      domain: { data: "table", field: "x" },
    },
    {
      name: "y",
      type: "linear",
      range: "height",
      nice: true,
      zero: true,
      domain: [0, 100],
    },
    {
      name: "color",
      type: "ordinal",
      range: "category",
      domain: { data: "table", field: "c" },
    },
  ],

  axes: [
    { orient: "bottom", scale: "x", labelAngle: "-45", labelAlign: "right" },
    { orient: "left", scale: "y" },
  ],

  marks: [
    {
      type: "group",
      from: {
        facet: {
          name: "series",
          data: "table",
          groupby: "c",
        },
      },
      marks: [
        {
          type: "line",
          from: { data: "series" },
          encode: {
            enter: {
              x: { scale: "x", field: "x", axes: false },
              y: { scale: "y", field: "y" },
              stroke: { scale: "color", field: "c" },
              strokeWidth: { value: 5 },
            },
            update: {
              interpolate: { signal: "interpolate" },
              strokeOpacity: { value: 1 },
            },
            hover: {
              strokeOpacity: { value: 0.5 },
            },
          },
        },
      ],
    },
  ],
};
