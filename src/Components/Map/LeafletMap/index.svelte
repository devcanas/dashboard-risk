<script>
import { get } from "svelte/store";
import { isRiskMap, info, nosInfo, loading } from "../../../stores";
import { style, getColorFor } from "./mapStyle";
import leafletPip from "@mapbox/leaflet-pip";
    
    const START_ZOOM = 7;
    const NR_DAYS_PRIOR = 7;
    const MIN_ZOOM = 7; // less than 7 the visualization gets bugged (not enough pixels for each square)
    const MAX_ZOOM = 11;
    const PLAY_INTERVAL = 500; // milisecons intervall between days animation
    var playIntervalObj;
    var maxRisk = 0;
    var maxIQD = 0;
    var layerConcelhos;
    let map;
    var layerRisk;

    isRiskMap.subscribe(newValue => {
        if (layerRisk) {
            layerRisk.setStyle(getStyle)
        }
    })

    function getStyle(feature) {
        return style(feature, get(isRiskMap));
    }
    
	function createMap(container) {
        let m = L.map("covid-risk-map", {
            center: [39.38950933, -7.77282714],
            zoom: window.innerWidth < 700 ? START_ZOOM - 1 : START_ZOOM,
            minZoom: MIN_ZOOM,
            maxZoom: MAX_ZOOM,
            fullscreenControl: true,
            preferCanvas: true, // without this, rendering 22 000 poligons gets painfully slow, and dragging/zooming the map is slow
        });

        L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
            {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 21,
            }
        ).addTo(m);

        return m;
    }

    function addGeoJson() {
        fetch("/data/2020_10_27_risk_idq.js")
        .then(res => res.json())
        .then(data => {
            layerRisk = L.geoJSON(data, { style: getStyle }).addTo(map);
            
            layerRisk.on("mouseover", (e) => {
                e.layer.setStyle({ fillColor: "#7d7d7d" })

                var concelhoFeatures = leafletPip.pointInLayer(
                    e.latlng,
                    layerConcelhos
                );

                var districtName =
                    concelhoFeatures.length > 0
                    ? concelhoFeatures[0].feature.properties.NAME_1
                    : "";
                    
                var concelhoName =
                    concelhoFeatures.length > 0
                    ? concelhoFeatures[0].feature.properties.NAME_2
                    : "";

                var concelhoFullName = districtName + " - " + concelhoName;

                var cn = concelhoName === "Ponte de Sôr" ? "Ponte de Sor" : concelhoName
                var sahInfo = $nosInfo.filter(item => item.concelho === cn)[0]
                var sahValue = sahInfo ? (sahInfo.sah * 100).toFixed(0) + "%" : "N/A"

                info.setState({
                    concelho: concelhoFullName,
                    ...e.layer.feature.properties,
                    FicarEmCasa: sahValue
                })
            })
            
            layerRisk.on("mouseout", (e) => {
                e.layer.setStyle({ fillColor: getColorFor(e.layer.feature.properties, get(isRiskMap)) })
            })
        }).then(_ => {
            loading.setState(false)
        })
    }

    function addConcelhos() {
        fetch("/data/concelhos-portugal_0_001.js")
        .then(res => res.json())
        .then(data => {
            layerConcelhos = L.geoJSON(data, {
                style: {
                    color: "#000000", // this is border color
                    fillColor: "#00000000",
                    weight: 0.5, // border
                    opacity: 1,
                },
            }).addTo(map);
        })
    }

    function getStayAtHomeInfo() {
        fetch("http://localhost:9000/sah.php?date=2020-10-27")
        .then(res => res.json())
        .then(data => nosInfo.setState(data))
    }

    function mapAction(container) {
        map = createMap(container);
        addConcelhos();
        addGeoJson();
        getStayAtHomeInfo();

        return {
            destroy: () => {
                map.remove();
                map = null;
            }
        };
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
<div
  id="covid-risk-map"
  use:mapAction />
