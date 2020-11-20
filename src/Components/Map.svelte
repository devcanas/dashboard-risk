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
import style from "./map/aux/layers/style";
import createMap from "./map/aux/createMap";
import {
  getConcelhosLayer,
  getRiskIQDLayer,
  tileLayer,
} from "./map/aux/layers";
import { onMount } from "svelte";

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

  const endpointFromSelectedDate = ((date) => {
    const dateStr = date.split("-").join("_");
    return "data/" + dateStr + "_risk_idq.js";
  })(dates.selectedDate);

  getRiskIQDLayer(
    endpointFromSelectedDate,
    riskIqdStyle,
    (layer) => {
      removeLayerIfNeeded(layerRisk);
      layerRisk = layer;
      ($mapMode.isRiskMap || $mapMode.isIDQMap) && layerRisk.addTo(map);
      layer.bringToBack();
      configureEventListenersForRisk();
      loading.setState(false);
    },
    (_) => {
      loading.setState(false);
    }
  );
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
    getConcelhoSahValue(feature.properties.NAME_2)
  );

const updateInfo = (e) => {
  const geoProps = getGeoProps(e.latlng, layerConcelhos);
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
        getConcelhoSahValue(e.layer.feature.properties.NAME_2)
      ),
    });
    mapInfo.reset();
  });
}

function getConcelhoSahValue(concelho, asString = false) {
  let cn = concelho === "Ponte de Sôr" ? "Ponte de Sor" : concelho;
  cn =
    concelho === "Sobral de Monte Agraço" ? "Sobral de Monte Agraco" : concelho;

  const sahConcelho = $sahInfo.filter(
    (item) => item.concelho.toUpperCase() === cn.toUpperCase()
  );
  return sahConcelho[0]
    ? asString
      ? (sahConcelho[0].sah * 100).toFixed(0) + "%"
      : sahConcelho[0].sah
    : "N/A";
}

function getGeoProps(coords, layer) {
  const point = leafletPip.pointInLayer(coords, layer)[0];
  if (point) {
    let props = point.feature.properties;
    return {
      concelho: `${props.NAME_1} - ${props.NAME_2}`,
      sah: getConcelhoSahValue(props.NAME_2, true),
    };
  }
}

onMount(() => {
  loading.setState(true);
  map = createMap();
  tileLayer.addTo(map);

  getConcelhosLayer(concelhosStyle, (layer) => {
    layerConcelhos = layer;
    layer.addTo(map);
    layer.bringToFront();
    configureEventListenersForConcelhos();
  });
});

function resizeMap() {
  if (map) {
    map.invalidateSize();
  }
}
</script>

<svelte:window on:resize="{resizeMap}" />
<div class="map-wrapper">
  <div id="covid-risk-map"></div>
  <Overlays />
  <LoadingSpinner />
</div>
