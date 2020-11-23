<script>
  import Overlays from "./Overlays.svelte";
  import LoadingSpinner from "./LoadingSpinner.svelte";
  import {
    mapMode,
    mapInfo,
    sahInfo,
    loading,
    availableDates,
    mapLocation,
    riskProps,
  } from "../stores";
  import style from "./helpers/style";
  import createMap from "./helpers/createMap";
  import {
    getConcelhoSahValue,
    getGeoProps,
    getProps,
  } from "./helpers/mapUtils";
  import { onMount } from "svelte";
  import FetchService from "../FetchService";
  import { defaultLocation } from "../constants";

  // layers
  let map;
  var layerRisk;
  var layerConcelhos;

  const setLayerStyles = () => {
    layerConcelhos && layerConcelhos.setStyle(concelhosStyle);
    layerRisk && layerRisk.setStyle(riskIqdStyle);
  };

  [sahInfo, mapMode, availableDates].forEach((store) => {
    store.subscribe((_) => {
      setLayerStyles();
    });
  });

  mapLocation.subscribe(({ coords, zoom }) => {
    map && map.flyTo(coords, zoom, { duration: 1 });
  });

  const propsFor = (layer) =>
    getProps($riskProps, layer, $availableDates.selectedDate);

  const riskIqdStyle = (feature) => {
    return style.riskIqd.getStyle(propsFor(feature), $mapMode);
  };

  const concelhosStyle = (feature) =>
    style.concelhos.getStyle(
      $mapMode,
      getConcelhoSahValue(feature.properties.NAME_2, $sahInfo)
    );

  const geoProps = (e) =>
    layerConcelhos && getGeoProps(e.latlng, layerConcelhos, $sahInfo);

  const updateRiskInfo = (e) => {
    const riskInfo = propsFor(e.layer.feature);
    updateInfo(riskInfo, geoProps(e));
  };

  const updateConcelhoInfo = (e) => {
    updateInfo(null, geoProps(e));
  };

  const updateInfo = (riskInfo, geoProps) => {
    if (geoProps) mapInfo.setState({ ...riskInfo, ...geoProps });
    else mapInfo.reset();
  };

  function configureEventListenersForRisk() {
    layerRisk.on("mouseover", (e) => {
      e.layer.setStyle({ fillColor: "#7d7d7d" });
      updateRiskInfo(e);
    });
    layerRisk.on("mouseout", (e) => {
      e.layer.setStyle({
        fillColor: style.riskIqd.getColor(propsFor(e.layer.feature), $mapMode),
      });
      mapInfo.reset();
    });
  }

  function configureEventListenersForConcelhos() {
    layerConcelhos.on("mouseover", (e) => {
      e.layer.setStyle({ fillColor: "rgb(0, 40, 150)" });
      updateConcelhoInfo(e);
    });
    layerConcelhos.on("mouseout", (e) => {
      e.layer.setStyle({
        fillColor: style.concelhos.getColor(
          $mapMode,
          getConcelhoSahValue(e.layer.feature.properties.NAME_2, $sahInfo)
        ),
      });
      mapInfo.reset();
    });
  }

  const setupConcelhosLayer = (layer) => {
    layer.addTo(map);
    layerConcelhos = layer;
    layer.bringToFront();
    configureEventListenersForConcelhos();
  };

  const setupRiskIqdLayer = (layer) => {
    layer.addTo(map);
    layerRisk = layer;
    layer.bringToBack();
    configureEventListenersForRisk();

    // trying to figure out bug where will
    // not load styles without this
    setInterval(() => {
      setLayerStyles();
      loading.setState(false);
    }, 300);
  };

  onMount(() => {
    loading.setState(true);
    map = createMap(defaultLocation);
    FetchService.getConcelhosLayer(concelhosStyle, setupConcelhosLayer);
    FetchService.getRiskIQDLayer(riskIqdStyle, setupRiskIqdLayer);
  });
</script>

<style>
  .map-wrapper {
    position: relative;
    flex: 1;
  }

  #covid-risk-map {
    width: 100%;
    height: 100%;
    z-index: 0;
  }
</style>

<div class="map-wrapper">
  <div id="covid-risk-map" />
  <Overlays />
  <LoadingSpinner />
</div>
