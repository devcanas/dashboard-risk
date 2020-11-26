export const getGeoProps = (coords, layer, sahInfo) => {
  const point = leafletPip.pointInLayer(coords, layer)[0];
  if (point) {
    let props = point.feature.properties;
    return {
      concelho: props.NAME_2,
      displayString: `${props.NAME_1} - ${props.NAME_2}`,
      sah: getConcelhoSahValue(props.NAME_2, sahInfo, true),
    };
  }
};

export const getConcelhoSahValue = (concelho, sahInfo, asString = false) => {
  let cn = concelho === "Ponte de Sôr" ? "Ponte de Sor" : concelho;
  const sahConcelho = sahInfo.filter(
    (item) => item.concelho.toUpperCase() === cn.toUpperCase()
  )[0];
  return sahConcelho
    ? asString
      ? parseInt(sahConcelho.sah * 100) + "%"
      : sahConcelho.sah
    : "N/A";
};

export const getProps = (store, layer, date) => {
  return store[layer.properties.data]
    ? store[layer.properties.data].filter((data) => data.date === date)[0]
    : undefined;
};
