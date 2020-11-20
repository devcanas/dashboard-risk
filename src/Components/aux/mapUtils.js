export const getGeoProps = (coords, layer, sahInfo) => {
  const point = leafletPip.pointInLayer(coords, layer)[0];
  if (point) {
    let props = point.feature.properties;
    return {
      concelho: `${props.NAME_1} - ${props.NAME_2}`,
      sah: getConcelhoSahValue(props.NAME_2, sahInfo),
    };
  }
};

export const getConcelhoSahValue = (concelho, sahInfo) => {
  let cn = concelho === "Ponte de Sôr" ? "Ponte de Sor" : concelho;
  const sahConcelho = sahInfo.filter(
    (item) => item.concelho.toUpperCase() === cn.toUpperCase()
  )[0];
  return (sahConcelho && sahConcelho[0].sah) || "N/A";
};
