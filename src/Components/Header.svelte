<script>
  import Toggle from "./Toggle.svelte";
  import { menuSelection } from "../stores/index";

  export let infoSourceItems;
  export let mapLocationItems;

  /// Info Source

  $: isSelectedInfoSource = (id) => {
    return id === $menuSelection.selectedInfoSourceId;
  };

  let selectInfoSource = (id) => {
    menuSelection.setInfoSourceId(id);
  };

  // Map location

  $: isSelectedMapLocation = (id) => {
    return id === $menuSelection.selectedMapLocationId;
  };

  let selectMapLocation = (id) => {
    menuSelection.setMapLocationId(id);
  };

  const downloadMapAsPng = () => {
    // const imgUrl = document.querySelector("canvas").toDataURL("image/png");
    // const a = document.getElementById("map-dl");
    // const download_name = `${$mapLocation.label}_${$mapMode.label}_${$availableDates.selectedDate}`;
    // a.download = download_name;
    // a.href = imgUrl;
    // a.click();
  };
</script>

<div class="header">
  <div class="info-controls-wrapper">
    <h1>Dashboard Risco Covid-19</h1>
    <Toggle
      items={infoSourceItems}
      bind:isSelected={isSelectedInfoSource}
      bind:select={selectInfoSource}
    />
    <Toggle
      items={mapLocationItems}
      bind:isSelected={isSelectedMapLocation}
      bind:select={selectMapLocation}
    />
  </div>
  <!-- <img
    on:click={downloadMapAsPng}
    src="images/download-button.png"
    alt="download"
  /> -->
</div>

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
