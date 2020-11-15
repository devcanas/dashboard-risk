<script>
    import { mapMode } from "../../stores";
    import { MapModes } from "../../constants";
</script>

<style src="./style.scss">

</style>

<div class="header">
    <h1>Mapa de Risco COVID-19</h1>
    <div class="type-toggle">
        <span on:click={_ => mapMode.setMapMode(MapModes.riskMap)} class="{$mapMode.isRiskMap ? "selected" : ""}">Risco</span>
        <span on:click={_ => mapMode.setMapMode(MapModes.idqMap)} class="{$mapMode.isIDQMap ? "selected" : ""}">Incerteza</span>
        <span on:click={_ => mapMode.setMapMode(MapModes.sahMap)} class="{$mapMode.isSAHMap ? "selected" : ""}">Stay@Home</span>
    </div>
</div>
