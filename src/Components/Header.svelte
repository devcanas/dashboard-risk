<script>
  import { mapMode, mapLocation, availableDates } from "../stores";
  import { Locations, MapModes } from "../constants";
  import Toggle from "./Toggle.svelte";

  $: isSelectedLocation = (item) => {
    return $mapLocation === item;
  };

  let onClickLocation = (item) => {
    mapLocation.setState(item);
  };

  $: isSelectedMapMode = (item) => {
    return $mapMode === item;
  };

  let onClickMapMode = (item) => {
    mapMode.setState(item);
  };

  const downloadMapAsPng = () => {
    const imgUrl = document.querySelector("canvas").toDataURL("image/png");
    const a = document.getElementById("map-dl");
    const download_name = `${$mapLocation.label}_${$mapMode.label}_${$availableDates.selectedDate}`;
    a.download = download_name;
    a.href = imgUrl;
    a.click();
  };
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=XanhMono&display=swap");
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100vw;
    height: 65px;
    padding: 10px 20px 10px 20px;

    background-color: rgb(0, 35, 155);
    color: white;

    box-shadow: 0 0 10px #555;
  }

  .info-controls-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  h1 {
    margin-right: 50px;
    font-weight: 400;
    font-size: 25px;
  }

  img {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 20px -1px #333;
  }
</style>

<div class="header">
  <div class="info-controls-wrapper">
    <h1>Dashboard Risco Covid-19</h1>
    <Toggle
      items={MapModes}
      bind:selected={isSelectedMapMode}
      bind:onClick={onClickMapMode} />
    <Toggle
      items={Locations}
      bind:selected={isSelectedLocation}
      bind:onClick={onClickLocation} />
  </div>
  <img
    on:click={downloadMapAsPng}
    src="images/download-button.png"
    alt="download" />
</div>
