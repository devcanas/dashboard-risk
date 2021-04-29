<script>
  import ColorScale from "./overlays/ColorScale.svelte";
  import Info from "./overlays/Info.svelte";
  import Chart from "./overlays/Chart.svelte";
  import Timeline from "./overlays/Timeline.svelte";
  import { menuSelection } from "../stores/";
  import { menus } from "../stores";

  $: colorScaleMenu = (selectedMenuId) => {
    return $menus.infoSourceMenu.filter(
      (item) => item.id === selectedMenuId
    )[0];
  };
</script>

<Chart />
<Info />
<ColorScale menu={colorScaleMenu($menuSelection.selectedInfoSourceId)} />
<Timeline />
