<script>
  import Overlays from "./Overlays.svelte";
  import LoadingSpinner from "./LoadingSpinner.svelte";
  import { loading, menuSelection, menus, riskIqd } from "../stores";
  import createMap from "./helpers/createMap";
  import decompressRLE from "./helpers/decompressRLE";
  import {
    getConcelhoSahValue,
    getGeoProps,
    getProps,
  } from "./helpers/mapUtils";
  import { onMount } from "svelte";
  import FetchService from "../FetchService";
  import showChartFor from "./helpers/chartData";

  // layers
  let map;
  var layerRisk;
  var layerConcelhos;

  riskIqd.subscribe((state) => {
    layerRisk && layerRisk.setStyle(riskIqdStyle);
  });

  const changeMapLocationIfNeeded = (mapLocationId) => {
    const selectedLocation = $menus.mapLocationMenu.filter(
      (menu) => menu.id === mapLocationId
    )[0];

    if (selectedLocation) {
      const { lat, long, zoom } = selectedLocation.coordinates;
      map && map.flyTo([lat, long], zoom, { duration: 0.2 });
    }
  };

  menuSelection.subscribe((selectionState) => {
    changeMapLocationIfNeeded(selectionState.selectedMapLocationId);
  });

  const riskIqdStyle = (feature) => {
    return {
      fillColor: $riskIqd.colors.risk[feature.properties.i],
    };
  };

  function configureEventListenersForRisk() {
    layerRisk.on("mouseover", (e) => {
      e.layer.setStyle({ fillColor: "#7d7d7d" });
    });
    layerRisk.on("mouseout", (e) => {
      e.layer.setStyle({
        fillColor: $riskIqd.colors.risk[e.layer.feature.properties.i],
      });
    });
  }

  function configureEventListenersForConcelhos() {
    layerConcelhos.on("mouseover", (e) => {
      e.layer.setStyle({ fillColor: "rgb(0, 40, 150)" });
      updateConcelhoInfo(e);
    });
    layerConcelhos.on("mouseout", (e) => {
      console.log(e.layer);
      e.layer.setStyle({
        fillColor: "#00ff00",
      });
      mapInfo.reset();
    });
  }

  const configureEventListenersForMap = () => {
    map.on("click", (e) => {
      console.log(e.latlng);
      // const geoProps = getGeoProps(
      //   e.latlng,
      //   layerConcelhos,
      //   $sahInfo.filter((it) => it.date === $availableDates.selectedDate)
      // );
      // if (geoProps) {
      //   loading.setState({ ...$loading, isConcelhoChartLoading: true });
      //   showChartFor(geoProps.concelho, sahChart, () => {
      //     loading.setState({ ...$loading, isConcelhoChartLoading: false });
      //   });
      // }
    });
  };

  const setupConcelhosLayer = (layer) => {
    layer.addTo(map);
    layerConcelhos = layer;
    layer.bringToFront();
    configureEventListenersForConcelhos();
  };

  const setupRiskIqdLayer = (json) => {
    const layer = L.geoJSON(json, {
      style: {
        fillColor: "#ffffff00",
        weight: 0,
        dashArray: "0",
        fillOpacity: 0.6,
      },
    });
    layer.addTo(map);
    layerRisk = layer;
    layer.bringToBack();
    configureEventListenersForRisk();
  };

  onMount(async () => {
    map = createMap();
    const { risk, concelhos } = await FetchService.getLayers();
    setupRiskIqdLayer(risk);
    // setupConcelhosLayer(concelhos);
    configureEventListenersForMap();

    changeMapLocationIfNeeded("continente");
  });
</script>

<div class="container__map">
  <div class="map-wrapper">
    <div id="covid-risk-map" />
    <Overlays />
    <!-- <LoadingSpinner isLoading={$loading.isLayerLoading} /> -->
  </div>
</div>

<style>
  .container__map {
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
  }

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
