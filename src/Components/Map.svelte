<script>
  import Overlays from "./Overlays.svelte";
  import LoadingSpinner from "./LoadingSpinner.svelte";
  import {
    mapInfo,
    sahInfo,
    loading,
    availableDates,
    riskProps,
    sahChart,
  } from "../stores";
  import createMap from "./helpers/createMap";
  import {
    getConcelhoSahValue,
    getGeoProps,
    getProps,
  } from "./helpers/mapUtils";
  import { onMount } from "svelte";
  import FetchService from "../network/FetchService";
  import showChartFor from "./helpers/chartData";

  // layers
  let map;
  var iterator = 0;
  var layerRisk;
  var layerConcelhos;

  const setLayerStyles = () => {
    iterator = 0;
    layerConcelhos && layerConcelhos.setStyle(concelhosStyle);
    layerRisk &&
      Object.keys($riskProps).length > 0 &&
      layerRisk.setStyle(riskIqdStyle);
  };

  availableDates.subscribe(() => {
    setLayerStyles();
  });

  loading.subscribe(() => {
    setLayerStyles();
  });

  const propsFor = (layer) => {
    return getProps($riskProps, layer, $availableDates.selectedDate);
  };

  const riskIqdStyle = (feature) => {
    return {
      fillColor: iterator++ < 10010 ? "#00ff00" : "#ff0000",
      weight: 0,
      dashArray: "0",
      fillOpacity: 1,
    }; // style.riskIqd.getStyle(propsFor(feature), $mapMode);
  };

  const concelhosStyle = (feature) => {};
  // style.concelhos.getStyle(
  //   $mapMode,
  //   getConcelhoSahValue(
  //     feature.properties.NAME_2,
  //     $sahInfo.filter((it) => it.date === $availableDates.selectedDate)
  //   )
  // );

  const geoProps = (e) =>
    layerConcelhos &&
    getGeoProps(
      e.latlng,
      layerConcelhos,
      $sahInfo.filter((it) => it.date === $availableDates.selectedDate)
    );

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
        fillColor: "#00ff00",
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
        fillColor: "#00ff00",
      });
      mapInfo.reset();
    });
  }

  const configureEventListenersForMap = () => {
    map.on("click", (e) => {
      const geoProps = getGeoProps(
        e.latlng,
        layerConcelhos,
        $sahInfo.filter((it) => it.date === $availableDates.selectedDate)
      );
      if (geoProps) {
        loading.setState({ ...$loading, isConcelhoChartLoading: true });
        showChartFor(geoProps.concelho, sahChart, () => {
          loading.setState({ ...$loading, isConcelhoChartLoading: false });
        });
      }
    });
  };

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
  };

  onMount(() => {
    loading.setState({ ...$loading, isLayerLoading: true });
    map = createMap();
    FetchService.concelhosLayer(concelhosStyle, setupConcelhosLayer);
    FetchService.riskIQDLayer(riskIqdStyle, setupRiskIqdLayer);
    configureEventListenersForMap();
  });
</script>

<div class="map-wrapper">
  <div id="covid-risk-map" />
  <Overlays />
  <!-- <LoadingSpinner isLoading={$loading.isLayerLoading} /> -->
</div>

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
