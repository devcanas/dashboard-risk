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
    dateSelection,
    mapData,
  } from "./stores/index";
  import FetchService from "./FetchService";
  import { onMount } from "svelte";
  import decompressRLE from "./Components/helpers/decompressRLE";
  import moment from "moment";
  import "moment/locale/pt";
  import config from "./config";

  export let configuration;

  moment.locale("pt");

  const { availableDates, clientEndpoints, ...menusConfig } = configuration;
  const { defaultSelectionState, ...menuConfig } = menusConfig.menus;

  FetchService.init(clientEndpoints);
  menus.setState(menuConfig);
  menuSelection.setState(defaultSelectionState);
  availableDatesStore.setState(availableDates);

  dateSelection.setSelectedDate();

  onMount(async () => {
    colorsStore.setAll(await FetchService.colors("risco"));
  });

  availableDatesStore.subscribe(() => {
    const { selectedInfoSourceId } = $menuSelection;
    const { startDate, dataLength } = $availableDatesStore.filter(
      (item) => item.id === selectedInfoSourceId
    )[0];

    const initialDate = moment(startDate)
      .add(dataLength, "days")
      .format(config.dateFormat);
    dateSelection.setMetadata({ startDate, dataLength });
    dateSelection.setSelectedDate(initialDate, dataLength);
  });

  dateSelection.subscribe(({ selectedDate }) => {
    if ($colorsStore.all.length === 0) return;
    mapData.setState(buildMapDataState());
  });

  colorsStore.subscribe(({ all }) => {
    if (all.length === 0) return;
    mapData.setState(buildMapDataState());
  });

  menuSelection.subscribe((_) => {
    if ($colorsStore.all.length === 0) return;
    mapData.setState(buildMapDataState());
  });

  const buildMapDataState = (
    allColors = $colorsStore.all,
    selectedDate = $dateSelection.selectedDate
  ) => {
    const selectedColorMetadata = allColors.filter(
      (item) => item.date === selectedDate
    )[0];

    const { isPred, colors } = selectedColorMetadata;
    const colorType =
      $menuSelection.selectedInfoSourceId === "risco"
        ? colors.risk
        : colors.iqd;
    return {
      isPred,
      colors: decompressRLE(JSON.parse(colorType)),
    };
  };
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
