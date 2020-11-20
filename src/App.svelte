<script>
  import Header from "./Components/Header.svelte";
  import Map from "./Components/Map.svelte";
  import Footer from "./Components/Footer.svelte";
  import { onMount } from "svelte";
  import { availableDates, sahInfo } from "./stores";
  import FetchService from "./FetchService";

  onMount((_) => {
    FetchService.getAvailableDates((dates) => {
      availableDates.setState(dates);
      availableDates.selectDate(dates[dates.length - 1]);
    });
  });

  $: FetchService.getSah($availableDates.selectedDate, sahInfo.setState);
</script>

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

<div class="container">
  <Header />
  <div class="container__map">
    <Map />
  </div>
  <Footer />
  <a id="map-dl" style="display: none" href="move along" download>... these are
    not the tags you are looking for</a>
</div>
