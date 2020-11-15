<script>
import Overlays from "./Overlays";
import LoadingSpinner from "@Components/LoadingSpinner";
import { mapMode, mapInfo, sahInfo, loading } from "../../stores";
import leafletPip from "@mapbox/leaflet-pip";
import style from "./aux/layers/style";
import createMap from "./aux/createMap";
import { getConcelhosLayer, getRiskIQDLayer, tileLayer } from "./aux/layers";

const NR_DAYS_PRIOR = 7;
const PLAY_INTERVAL = 500; // milisecons intervall between days animation
var playIntervalObj;
var maxRisk = 0;
var maxIQD = 0;

// layers
let map;
var layerRisk;
var layerConcelhos;

const removeLayerIfNeeded = (layer) => {
    if(map.hasLayer(layer)) {
        map.removeLayer(layer)
    }
}

const addLayerIfNeeded = (layer) => {
    if (!map.hasLayer(layer))
        layer.addTo(map)
}

const handleMapMode = (mode) => {
    setLayerStyles()
    if (mode.isSAHMap) {
        removeLayerIfNeeded(layerRisk)
    } else {
        addLayerIfNeeded(layerRisk)
    }
}

const setLayerStyles = () => {
    layerConcelhos.setStyle(concelhosStyle)
    layerRisk.setStyle(riskIqdStyle)
}

mapMode.subscribe(mode => {
    if (!(layerRisk && layerConcelhos && map))
        return;

    handleMapMode(mode)    
})

const riskIqdStyle = feature => style.riskIqd.getStyle(feature, $mapMode)

const concelhosStyle = (feature) => style.concelhos.getStyle(
        $mapMode, 
        getConcelhoSahValue(feature.properties.NAME_2))

function getStayAtHomeInfo() {
    fetch("http://localhost:9000/sah.php?date=2020-10-27")
    .then(res => res.json())
    .then(data => sahInfo.setState(data))
}

function configureEventListeners() {

    const updateInfo = (e) => {
        const geoProps = getGeoProps(e.latlng, layerConcelhos);
        if (geoProps) {
            mapInfo.setState({...geoProps, ...e.layer.feature.properties})
        } else {
            mapInfo.reset();
        }
    }

    layerRisk.on("mouseover", (e) => {
        e.layer.setStyle({ fillColor: "#7d7d7d" })
        updateInfo(e)
    })

    layerRisk.on("mouseout", (e) => {
        e.layer.setStyle({ fillColor: style.riskIqd.getColor(e.layer.feature.properties, $mapMode) })
        mapInfo.reset();
    })

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
    const cn = concelho === "Ponte de Sôr" ? "Ponte de Sor" : concelho;
    var sahConcelho = $sahInfo.filter(item => item.concelho === cn)[0]
    return sahConcelho ? asString ? (sahConcelho.sah * 100).toFixed(0) + "%" : sahConcelho.sah : "N/A"
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

function render() {
    loading.setState(true);
    map = createMap()
    
    getStayAtHomeInfo();

    getConcelhosLayer(concelhosStyle, layer => {
        layerConcelhos = layer;
        layer.addTo(map)
    })

    getRiskIQDLayer(riskIqdStyle, layer => {
        layerRisk = layer;
        layer.addTo(map)
        loading.setState(false);

        configureEventListeners();
        
    })

    tileLayer.addTo(map);
}

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
    <div id="covid-risk-map" use:render />
    <Overlays />
    <LoadingSpinner />
</div>
