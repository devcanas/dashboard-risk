<script>
  import { menuSelection } from "../stores/index";

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
  <!-- <img
    on:click={downloadMapAsPng}
    src="images/download-button.png"
    alt="download"
  /> -->
</div>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 55px;
    top: 10px;
    border-radius: 10px;
    z-index: 1;
    width: auto;
    height: 65px;
    padding: 10px;
    background-color: rgba(212, 218, 220, 0.5);
  }

  .info-controls-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  h1 {
    font-family: "Roboto Condensed", sans-serif;
    color: #444;
    font-size: 40px;
  }

  /* img {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 20px -1px #333;
  } */
</style>
