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
  } from "../stores";
  import style from "./aux/style";
  import createMap from "./aux/createMap";
  import { getConcelhoSahValue, getGeoProps } from "./aux/mapUtils";
  import { onMount } from "svelte";
  import FetchService from "../FetchService";
  import { Locations } from "../constants";

  // layers
  let map;
  var layerRisk;
  var layerConcelhos;

  const removeLayerIfNeeded = (layer) => {
    if (map && map.hasLayer(layer)) {
      map.removeLayer(layer);
    }
  };

  const addLayerIfNeeded = (layer) => {
    if (map && !map.hasLayer(layer)) layer.addTo(map);
  };

  const handleMapMode = (mode) => {
    if (mode.isSAHMap) {
      removeLayerIfNeeded(layerRisk);
    } else {
      addLayerIfNeeded(layerRisk);
      layerConcelhos.bringToFront();
    }
    setLayerStyles();
  };

  const setLayerStyles = () => {
    layerConcelhos.setStyle(concelhosStyle);
    layerRisk.setStyle(riskIqdStyle);
  };

  availableDates.subscribe((dates) => {
    if (dates.selectedDate === null) return;

    FetchService.getRiskIQDLayer(dates.selectedDate, riskIqdStyle, (layer) => {
      removeLayerIfNeeded(layerRisk);
      layerRisk = layer;
      ($mapMode.isRiskMap || $mapMode.isIDQMap) && layerRisk.addTo(map);
      layer.bringToBack();
      configureEventListenersForRisk();
      loading.setState(false);
    });
  });

  sahInfo.subscribe((_) => {
    layerConcelhos && layerConcelhos.setStyle(concelhosStyle);
  });

  mapMode.subscribe((mode) => {
    if (!(layerRisk && layerConcelhos && map)) return;
    handleMapMode(mode);
  });

  mapLocation.subscribe(({ coords, zoom }) => {
    map && map.flyTo(coords, zoom, { duration: 1 });
  });

  const riskIqdStyle = (feature) => style.riskIqd.getStyle(feature, $mapMode);

  const concelhosStyle = (feature) =>
    style.concelhos.getStyle(
      $mapMode,
      getConcelhoSahValue(feature.properties.NAME_2, $sahInfo)
    );

  const updateInfo = (e) => {
    const geoProps = getGeoProps(e.latlng, layerConcelhos, $sahInfo);
    if (geoProps) {
      mapInfo.setState({ ...geoProps, ...e.layer.feature.properties });
    } else {
      mapInfo.reset();
    }
  };

  function configureEventListenersForRisk() {
    layerRisk.on("mouseover", (e) => {
      e.layer.setStyle({ fillColor: "#7d7d7d" });
      updateInfo(e);
    });

    layerRisk.on("mouseout", (e) => {
      e.layer.setStyle({
        fillColor: style.riskIqd.getColor(e.layer.feature.properties, $mapMode),
      });
      mapInfo.reset();
    });
  }

  function configureEventListenersForConcelhos() {
    layerConcelhos.on("mouseover", (e) => {
      if (!$mapMode.isSAHMap) return;
      e.layer.setStyle({ fillColor: "rgb(0, 40, 150)" });
      updateInfo(e);
    });

    layerConcelhos.on("mouseout", (e) => {
      if (!$mapMode.isSAHMap) return;
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
    layerConcelhos = layer;
    layer.addTo(map);
    layer.bringToFront();
    configureEventListenersForConcelhos();
  };

  onMount(() => {
    const defaultLocation = Locations.filter((loc) => loc.default)[0];
    loading.setState(true);
    map = createMap(defaultLocation);
    FetchService.getConcelhosLayer(concelhosStyle, setupConcelhosLayer);
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
