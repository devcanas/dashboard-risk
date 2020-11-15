<script>
    import Overlays from "./Overlays";
    import LeafletMap from "./LeafletMap";
    import LoadingSpinner from "@Components/LoadingSpinner";
    import { isRiskMap } from "../../stores";
</script>

<style src="./style.scss">
</style>

<div class="map-wrapper">
  <LeafletMap isRiskMap={$isRiskMap} />
  <Overlays />
  <LoadingSpinner />
</div>
