<script>
import Overlays from "./Overlays";
import LoadingSpinner from "@Components/LoadingSpinner";
import { mapMode, mapInfo, sahInfo, loading, availableDates } from "../../stores";
import leafletPip from "@mapbox/leaflet-pip";
import style from "./aux/layers/style";
import createMap from "./aux/createMap";
import { getConcelhosLayer, getRiskIQDLayer, tileLayer } from "./aux/layers";
import { onMount } from "svelte";
import { SSL_OP_CIPHER_SERVER_PREFERENCE } from "constants";

// layers
let map;
var layerRisk;
var layerConcelhos;

const removeLayerIfNeeded = (layer) => {
    if(map && map.hasLayer(layer)) {
        map.removeLayer(layer)
    }
}

const addLayerIfNeeded = (layer) => {
    if (map && !map.hasLayer(layer))
        layer.addTo(map)
}

const handleMapMode = (mode) => {
    
    if (mode.isSAHMap) {
        removeLayerIfNeeded(layerRisk)
    } else {
        addLayerIfNeeded(layerRisk)
        layerConcelhos.bringToFront();
    }
    setLayerStyles()
}

const setLayerStyles = () => {
    layerConcelhos.setStyle(concelhosStyle)
    layerRisk.setStyle(riskIqdStyle)
}

availableDates.subscribe(dates => {

    if (dates.selectedDate === null) return;

    const endpointFromSelectedDate = ((date) => {
        const dateStr = date.split("-").join("_");
        return "http://covid.vps.tecnico.ulisboa.pt/data/" + dateStr + "_risk_idq.js";
    })(dates.selectedDate);

    getRiskIQDLayer(endpointFromSelectedDate, riskIqdStyle, layer => {
        removeLayerIfNeeded(layerRisk);
        layerRisk = layer;
        ($mapMode.isRiskMap || $mapMode.isIDQMap) && layerRisk.addTo(map);
        layer.bringToBack();
        configureEventListenersForRisk();
        loading.setState(false);
    }, _ => {
        loading.setState(false);
    })
})

sahInfo.subscribe(newInfo => {
    layerConcelhos && layerConcelhos.setStyle(concelhosStyle)
    console.log("data updated: ", newInfo[0])
})

mapMode.subscribe(mode => {
    if (!(layerRisk && layerConcelhos && map))
        return;

    handleMapMode(mode)
})

const riskIqdStyle = feature => style.riskIqd.getStyle(feature, $mapMode)

const concelhosStyle = (feature) => style.concelhos.getStyle(
        $mapMode,
        getConcelhoSahValue(feature.properties.NAME_2))

const updateInfo = (e) => {
    const geoProps = getGeoProps(e.latlng, layerConcelhos);
    if (geoProps) {
        mapInfo.setState({...geoProps, ...e.layer.feature.properties})
    } else {
        mapInfo.reset();
    }
}

function configureEventListenersForRisk() {
    layerRisk.on("mouseover", (e) => {
        e.layer.setStyle({ fillColor: "#7d7d7d" })
        updateInfo(e)
    })

    layerRisk.on("mouseout", (e) => {
        e.layer.setStyle({ fillColor: style.riskIqd.getColor(e.layer.feature.properties, $mapMode) })
        mapInfo.reset();
    })
}

function configureEventListenersForConcelhos() {
    layerConcelhos.on("mouseover", e => {
        if (!$mapMode.isSAHMap) return;
        e.layer.setStyle({ fillColor: "rgb(0, 40, 150)" })
        updateInfo(e)
    })

    layerConcelhos.on("mouseout", (e) => {
        if (!$mapMode.isSAHMap) return;
        e.layer.setStyle({ fillColor: style.concelhos.getColor($mapMode, getConcelhoSahValue(e.layer.feature.properties.NAME_2)) })
        mapInfo.reset();
    })
}

function getConcelhoSahValue(concelho, asString=false) {
    console.log("getting sah");
    let cn = concelho === "Ponte de Sôr" ? "Ponte de Sor" : concelho;
    cn = concelho === "Sobral de Monte Agraço" ? "Sobral de Monte Agraco" : concelho;

    const sahConcelho = $sahInfo.filter(item => item.concelho.toUpperCase() === cn.toUpperCase())
    return sahConcelho[0] ? asString ? (sahConcelho[0].sah * 100).toFixed(0) + "%" : sahConcelho[0].sah : "N/A"
}

function getGeoProps(coords, layer) {
    const point = leafletPip.pointInLayer(coords,layer)[0];
    if (point) {
        let props = point.feature.properties;
        return {
            concelho: `${props.NAME_1} - ${props.NAME_2}`,
            sah: getConcelhoSahValue(props.NAME_2, true)
        }
    }
}

onMount(()=>{
    loading.setState(true);
    map = createMap()
    tileLayer.addTo(map);

    getConcelhosLayer(concelhosStyle, layer => {
        layerConcelhos = layer;
        layer.addTo(map);
        layer.bringToFront();
        configureEventListenersForConcelhos();
    })
})

function resizeMap() {
    if(map) {
        map.invalidateSize(); 
    }
}
</script>

<style src="./style.scss">

</style>

<svelte:window on:resize={resizeMap} />
<div class="map-wrapper">
    <div id="covid-risk-map" />
    <Overlays />
    <LoadingSpinner />
</div>
