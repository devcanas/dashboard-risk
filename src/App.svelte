<script>
  import Header from "./Components/Header.svelte";
  import Map from "./Components/Map.svelte";
  import Footer from "./Components/Footer.svelte";
  import { onMount } from "svelte";
  import {
    availableDates,
    sahInfo,
    riskProps,
    loading,
    mapMode,
  } from "./stores";
  import FetchService from "./network/FetchService";
  import moment from "moment";
  import config from "./config";

  const fetchMissingProps = (selectedDate) => {
    rangeFetch(selectedDate);
    if ($mapMode.isSAHMap) {
      console.log("fetchcing sah date");
      FetchService.sahByDate(selectedDate, false, (state) => {
        sahInfo.setState(state);
        loading.setState({ ...$loading, isLayerLoading: false });
      });
    } else {
      FetchService.propertiesByDate(selectedDate, false, (props) => {
        riskProps.setState({ ...props, initialRender: true });
        loading.setState({ ...$loading, isLayerLoading: false });
      });
    }
  };

  const rangeFetch = (selectedDate) => {
    if ($mapMode.isSAHMap) {
      console.log("fetching range");
      FetchService.sahByDate(selectedDate, true, sahInfo.setState);
    } else {
      FetchService.propertiesByDate(selectedDate, true, (props) => {
        riskProps.setState({ ...props });
      });
    }
  };

  const cacheMissPadding = (date) => {
    return cacheMiss(daysBefore(date)) || cacheMiss(daysAfter(date));
  };

  const cacheMiss = (date) => {
    if ($mapMode.isSAHMap) {
      return cacheMissSah(date);
    } else {
      return cacheMissRisk(date);
    }
  };

  const cacheMissRisk = (date) => {
    // key represents geojson feature so it is
    // not really important which one to pick since
    // if a date is cached it exists in every feature
    const randomKey = Object.keys($riskProps)[2];
    if (!randomKey) return true;
    const filterP = (data) => data.date === date;
    return $riskProps[randomKey].filter(filterP).length === 0;
  };

  const cacheMissSah = (date) => {
    return $sahInfo.filter((it) => it.date === date).length === 0;
  };

  const daysBefore = (selectedDate) => {
    return moment(selectedDate)
      .subtract(config.rangeFetchPadding, "days")
      .format("YYYY-MM-DD");
  };

  const daysAfter = (selectedDate) => {
    return moment(selectedDate)
      .add(config.rangeFetchPadding, "days")
      .format("YYYY-MM-DD");
  };

  const loadPropsIfNeeded = (selectedDate) => {
    if (!selectedDate) return;

    if (cacheMiss(selectedDate)) {
      loading.setState({ ...$loading, isLayerLoading: true });
      fetchMissingProps(selectedDate);
      return;
    }

    if (cacheMissPadding(selectedDate)) {
      rangeFetch(selectedDate);
      return;
    }
  };

  availableDates.subscribe(({ selectedDate }) => {
    loadPropsIfNeeded(selectedDate);
  });

  mapMode.subscribe(() => {
    loadPropsIfNeeded($availableDates.selectedDate);
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
