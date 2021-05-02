<script>
  import Header from "./Components/Header.svelte";
  import Map from "./Components/Map.svelte";
  import Footer from "./Components/Footer.svelte";
  import DownloadDummy from "./Components/DownloadDummy.svelte";
  import { menus } from "./stores";
  import { menuSelection } from "./stores/index";
  import FetchService from "./FetchService";

  export let config;

  const { clientEndpoints, ...menusConfig } = config;
  const { defaultSelectionState, ...menuConfig } = menusConfig.menus;

  FetchService.init(clientEndpoints);
  menus.setState(menuConfig);
  menuSelection.setState(defaultSelectionState);
</script>

<div class="container">
  <Header
    infoSourceItems={$menus.infoSourceMenu}
    mapLocationItems={$menus.mapLocationMenu}
  />
  <Map />
  <Footer />
  <DownloadDummy />
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
</style>
