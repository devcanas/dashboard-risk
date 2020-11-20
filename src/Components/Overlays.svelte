<script>
  import ColorScale from "./overlays/ColorScale.svelte";
  import Info from "./overlays/Info.svelte";
  import { mapMode } from "../stores/index";
</script>

<Info />
<ColorScale
  risk={$mapMode.isRiskMap}
  idq={$mapMode.isIDQMap}
  sah={$mapMode.isSAHMap} />
