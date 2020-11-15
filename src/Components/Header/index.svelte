<script>
    import { isRiskMap } from "../../stores.js";

</script>

<style src="./style.scss">

</style>

<div class="header">
    <h1>Mapa de Risco COVID-19</h1>
    <div class="type-toggle">
        <span on:click={isRiskMap.setTrue} class="{$isRiskMap ? "selected" : ""}">Risco</span>
        <span on:click={isRiskMap.setFalse} class="{$isRiskMap ? "" : "selected"}">Incerteza</span>
    </div>
</div>
