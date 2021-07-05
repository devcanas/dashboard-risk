<script>
  import Map from "./Components/Map.svelte";
  import Footer from "./Components/Footer.svelte";
  import Panel from "./Components/Panel/index.svelte";
  import DownloadDummy from "./Components/DownloadDummy.svelte";
  import {
    menus,
    menuSelection,
    availableDatesStore,
    colorsStore,
    riskIqd,
    dateSelection,
  } from "./stores/index";
  import FetchService from "./FetchService";
  import { onMount } from "svelte";
  import decompressRLE from "./Components/helpers/decompressRLE";
  import riskIqdStore from "./stores/riskIqdStore";
  import moment from "moment";
  import "moment/locale/pt";

  export let config;

  moment.locale("pt");

  const { availableDates, clientEndpoints, ...menusConfig } = config;
  const { defaultSelectionState, ...menuConfig } = menusConfig.menus;

  FetchService.init(clientEndpoints);
  menus.setState(menuConfig);
  menuSelection.setState(defaultSelectionState);
  availableDatesStore.setState(availableDates);

  dateSelection.setSelectedDate();

  onMount(async () => {
    const colors = await FetchService.colors("risco");
    colorsStore.setState(colors);
  });

  colorsStore.subscribe((colors) => {});

  availableDatesStore.subscribe((availableDates) => {
    const { selectedInfoSourceId } = $menuSelection;
    const { startDate, dataLength } = $availableDatesStore.filter(
      (item) => item.id === selectedInfoSourceId
    )[0];

    const initialDate = moment(startDate).add(dataLength, "days");
    dateSelection.setSelectedDate(initialDate, dataLength);
  });
</script>

<div class="container">
  <Panel />
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
    align-items: flex-start;
    min-height: 100vh;
    position: relative;
  }
</style>
