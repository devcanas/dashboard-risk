<script>
  import Toggle from "./Toggle.svelte";
  import { menus, menuSelection } from "../../stores/index";

  /// Info Source

  $: isSelectedInfoSource = (id) => {
    return id === $menuSelection.selectedInfoSourceId;
  };

  let selectInfoSource = (id) => {
    menuSelection.setInfoSourceId(id);
  };

  // Map location

  $: isSelectedMapLocation = (id) => {
    return id === $menuSelection.selectedMapLocationId;
  };

  let selectMapLocation = (id) => {
    menuSelection.setMapLocationId(id);
  };
</script>

<div class="toggle-wrapper">
  <Toggle
    label={"Tipo de dados"}
    items={$menus.infoSourceMenu}
    bind:isSelected={isSelectedInfoSource}
    bind:select={selectInfoSource}
  />
  <Toggle
    label={"Localização"}
    items={$menus.mapLocationMenu}
    bind:isSelected={isSelectedMapLocation}
    bind:select={selectMapLocation}
  />
</div>

<style>
  .toggle-wrapper {
    margin-bottom: 20px;
  }
</style>
