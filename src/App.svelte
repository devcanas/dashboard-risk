<script>
  import Header from "./Components/Header.svelte";
  import Map from "./Components/Map.svelte";
  import Footer from "./Components/Footer.svelte";
  import { onMount } from "svelte";
  import { availableDates, sahInfo, mapLocation } from "./stores";

  onMount((_) => {
    fetch("http://localhost:9000/dates.php")
      .then((res) => res.json())
      .then((data) => {
        availableDates.setState(data);
        return data[data.length - 1];
      })
      .then((defaultDate) => {
        availableDates.selectDate(defaultDate);
      })
      .catch((err) => {
        console.log(
          "There was a problem fetching the available risk maps, make sure every file is properly formatted. ",
          err
        );
      });
  });

  availableDates.subscribe((newData) => {
    const endpoint = `http://localhost:9000/sah.php?date=${newData.selectedDate}`;

    newData.selectedDate &&
      fetch(endpoint)
        .then((res) => res.json())
        .then((sah) => {
          sahInfo.setState(sah);
        })
        .catch((err) =>
          console.log(
            `There was a problem getting the mobility data for the date: ${newData.selectedDate}.\n`,
            err
          )
        );
  });
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
