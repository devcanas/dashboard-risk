<script>
  import ColorScale from "./overlays/ColorScale.svelte";
  import Info from "./overlays/Info.svelte";
  import { menuSelection } from "../stores/";
  import { menus } from "../stores";

  const defaultMenuId = "risco";

  $: colorScaleMenu = (selectedMenuId) => {
    return (
      $menus &&
      $menus.infoSourceMenu &&
      $menus.infoSourceMenu.filter((item) => item.id === selectedMenuId)[0]
    );
  };
</script>

<ColorScale
  menu={colorScaleMenu(
    ($menuSelection && $menuSelection.selectedInfoSourceId) || defaultMenuId
  )}
/>
