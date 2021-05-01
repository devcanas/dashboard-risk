<script>
  import Header from "./Components/Header.svelte";
  import Map from "./Components/Map.svelte";
  import Footer from "./Components/Footer.svelte";
  import { onMount } from "svelte";
  import { menus, endpoints } from "./stores";
  import { menuSelection } from "./stores/index";

  export let config;

  const { clientEndpoints, ...menusConfig } = config;
  const { defaultSelectionState, ...menuConfig } = menusConfig.menus;

  menus.setState(menuConfig);
  menuSelection.setState(defaultSelectionState);
  endpoints.setState(clientEndpoints);
</script>

<div class="container">
  <Header
    infoSourceItems={$menus.infoSourceMenu}
    mapLocationItems={$menus.mapLocationMenu}
  />
  <div class="container__map">
    <Map />
  </div>
  <Footer />
  <a id="map-dl" style="display: none" href="move along" download
    >... these are not the tags you are looking for</a
  >
</div>

<style>
  .container {
    background-color: #eee;
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
  }

  .container__map {
    width: 100%;
    height: calc(100vh - 160px);
    display: flex;
  }
</style>
