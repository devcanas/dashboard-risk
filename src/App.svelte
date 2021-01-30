<script>
  import Header from "./Components/Header.svelte";
  import Map from "./Components/Map.svelte";
  import Footer from "./Components/Footer.svelte";
  import { onMount } from "svelte";
  import { availableDates, sahInfo, riskProps, loading } from "./stores";
  import FetchService from "./network/FetchService";

  availableDates.subscribe(({ selectedDate }) => {
    if (selectedDate) {
      FetchService.sahByDate(selectedDate, false, sahInfo.setState);

      FetchService.propertiesByDate(selectedDate, false, (props) => {
        riskProps.setState(props);
        loading.setState({ ...$loading, isLayerLoading: false });
      });
    }
  });

  onMount((_) => {
    loading.setState({ ...$loading, isLayerLoading: true });
    FetchService.availableDates((dates) => {
      availableDates.setState(dates);
    });
  });
</script>

<div class="container">
  <Header />
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
