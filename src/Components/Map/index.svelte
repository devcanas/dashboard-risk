<script>
import Overlays from "./Overlays";
import LoadingSpinner from "@Components/LoadingSpinner";
import { mapMode, mapInfo, sahInfo, loading } from "../../stores";
import leafletPip from "@mapbox/leaflet-pip";
import { style, getColorFor } from "./aux/layers/style";
import createMap from "./aux/createMap";
import { getConcelhosLayer, getRiskIQDLayer } from "./aux/layers";

const NR_DAYS_PRIOR = 7;
const PLAY_INTERVAL = 500; // milisecons intervall between days animation
var playIntervalObj;
var maxRisk = 0;
var maxIQD = 0;

// layers
let map;
var layerRisk;
var layerConcelhos;

mapMode.subscribe(_ => {
    if (layerRisk) {
        layerRisk.setStyle(getStyle)
    }
})

function getStyle(feature) {
    return style(feature, $mapMode.isRiskMap);
}

function getStayAtHomeInfo() {
    fetch("http://localhost:9000/sah.php?date=2020-10-27")
    .then(res => res.json())
    .then(data => sahInfo.setState(data))
}

function configureEventListeners() {
    layerRisk.on("mouseover", (e) => {
        e.layer.setStyle({ fillColor: "#7d7d7d" })
        const geoProps = getGeoProps(e.latlng, layerConcelhos);
        if (geoProps) {
            mapInfo.setState({...geoProps, ...e.layer.feature.properties})
        } else {
            mapInfo.reset();
        }
    })

    layerRisk.on("mouseout", (e) => {
        e.layer.setStyle({ fillColor: getColorFor(e.layer.feature.properties, $mapMode.isRiskMap) })
        mapInfo.reset();
    })
}

function getGeoProps(coords, layer) {
    const point = leafletPip.pointInLayer(coords,layer)[0];
    if (point) {
        let props = point.feature.properties;
        const sah = ((concelho) => {
            const cn = concelho === "Ponte de Sôr" ? "Ponte de Sor" : concelho;
            var sahConcelho = $sahInfo.filter(item => item.concelho === cn)[0]
            return sahConcelho ? (sahConcelho.sah * 100).toFixed(0) + "%" : "N/A"
        })(props.NAME_2);
        return {
            concelho: `${props.NAME_1} - ${props.NAME_2}`,
            sah
        }
    }
}

function render() {
    loading.setState(true);
    map = createMap()
    
    getStayAtHomeInfo();

    getConcelhosLayer(layer => {
        layerConcelhos = layer;
        layer.addTo(map)    
    })

    getRiskIQDLayer(getStyle, layer => {
        layerRisk = layer;
        layer.addTo(map)
        loading.setState(false);

        configureEventListeners();
    })
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
