<script>
  import Header from "./Components/Header.svelte";
  import Map from "./Components/Map.svelte";
  import Footer from "./Components/Footer.svelte";
  import { onMount } from "svelte";
  import { availableDates, sahInfo, riskProps, loading } from "./stores";
  import FetchService from "./network/FetchService";
  import moment from "moment";

  const fetchMissingProps = (selectedDate) => {
    rangeFetch(selectedDate);
    FetchService.sahByDate(selectedDate, false, sahInfo.setState);

    FetchService.propertiesByDate(selectedDate, false, (props) => {
      riskProps.setState({ ...props, initialRender: true });
      loading.setState({ ...$loading, isLayerLoading: false });
    });
  };

  const rangeFetch = (selectedDate) => {
    FetchService.sahByDate(selectedDate, true, sahInfo.setState);

    FetchService.propertiesByDate(selectedDate, true, (props) => {
      riskProps.setState({ ...props });
    });
  };

  const cacheMiss = (selectedDate) => {
    // key represents geojson feature so it is
    // not really important which one to pick since
    // if a date is cached it exists in every feature
    const randomKey = Object.keys($riskProps)[2];
    if (!randomKey) return true;
    const filterP = (data) => data.date === selectedDate;
    return $riskProps[randomKey].filter(filterP).length === 0;
  };

  const dayBefore = (selectedDate) => {
    return moment(selectedDate).subtract(1, "days").format("YYYY-MM-DD");
  };

  const dayAfter = (selectedDate) => {
    return moment(selectedDate).add(1, "days").format("YYYY-MM-DD");
  };

  availableDates.subscribe(({ selectedDate }) => {
    if (!selectedDate) return;

    if (cacheMiss(selectedDate)) {
      loading.setState({ ...$loading, isLayerLoading: true });
      fetchMissingProps(selectedDate);
      return;
    }

    if (
      selectedDate &&
      (cacheMiss(dayBefore(selectedDate)) || cacheMiss(dayAfter(selectedDate)))
    ) {
      rangeFetch(selectedDate);
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
