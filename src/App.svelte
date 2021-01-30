<script>
  import Header from "./Components/Header.svelte";
  import Map from "./Components/Map.svelte";
  import Footer from "./Components/Footer.svelte";
  import { onMount } from "svelte";
  import { availableDates, sahInfo, riskProps, loading } from "./stores";
  import FetchService from "./network/FetchService";

  const fetchMissingProps = (selectedDate) => {
    FetchService.sahByDate(selectedDate, false, sahInfo.setState);

    FetchService.propertiesByDate(selectedDate, false, (props) => {
      riskProps.setState({ ...props, initialRender: true });
      loading.setState({ ...$loading, isLayerLoading: false });
      smartFetch(selectedDate);
    });
  };

  const smartFetch = (selectedDate) => {
    FetchService.sahByDate(selectedDate, true, sahInfo.setState);

    FetchService.propertiesByDate(selectedDate, true, (props) => {
      riskProps.setState({ ...props });
    });
  };

  const cacheMiss = (selectedDate) => {
    const randomKey = Object.keys($riskProps)[2];
    return (
      selectedDate &&
      (!randomKey ||
        (randomKey &&
          !$riskProps[randomKey].filter(
            (data) => data.date === selectedDate
          )[0]))
    );
  };

  availableDates.subscribe(({ selectedDate }) => {
    if (cacheMiss(selectedDate)) {
      loading.setState({ ...$loading, isLayerLoading: true });
      fetchMissingProps(selectedDate);
      return;
    }

    if (selectedDate) {
      smartFetch(selectedDate);
      return;
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
