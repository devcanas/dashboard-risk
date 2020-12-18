<script>
  import ColorScale from "./overlays/ColorScale.svelte";
  import Info from "./overlays/Info.svelte";
  import { mapMode } from "../stores/index";
  import Chart from "./overlays/Chart.svelte";
  import Timeline from "./overlays/Timeline.svelte";
</script>

<Chart />
<Info />
<ColorScale
  risk={$mapMode.isRiskMap}
  idq={$mapMode.isIDQMap}
  sah={$mapMode.isSAHMap} />
<Timeline />
