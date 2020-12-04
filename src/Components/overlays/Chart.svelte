<script>
  import { loading, sahChart } from "../../stores";
  import LoadingSpinner from "../LoadingSpinner.svelte";
  import Wrapper from "./Wrapper.svelte";

  var view;
  function render(data) {
    view = new vega.View(vega.parse(data), {
      renderer: "canvas", // renderer (canvas or svg)
      container: "#concelho-chart", // parent DOM container
      hover: true, // enable hover processing
    });
    return view.runAsync();
  }

  sahChart.subscribe((chartData) => {
    chartData.data && render(chartData.data);
  });
</script>

<style>
  .chart-wrapper {
    width: 100%;
    height: 100%;
    padding: 20px;
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .content-header {
    margin-bottom: 20px;
  }

  .chart-concelho-description {
    font-size: 15px;
    color: blue;
  }

  .chart-concelho-name {
    font-size: 20px;
  }

  .chart-concelho-data {
    font-size: 25px;
    color: #555;
    margin-bottom: 10px;
  }

  #concelho-chart {
    flex: 1;
  }

  #no-data {
    font-size: 15px;
    color: #555;
  }
</style>

{#if $sahChart.edited}
  <Wrapper bottomLeft>
    <div class="chart-wrapper">
      <LoadingSpinner isLoading={$loading.isConcelhoChartLoading} />
      <div class="close-btn" on:click={sahChart.reset}>
        <img
          width="20"
          src="https://icons-for-free.com/iconfiles/png/512/x-1321215629555778185.png"
          alt="close" />
      </div>
      <div class="content">
        <div class="content-header">
          <div class="chart-concelho-data">
            Evolução Stay@Home - Últimos 30 dias
          </div>
          <div class="chart-concelho-description">Concelho</div>
          <div class="chart-concelho-name">{$sahChart.concelho}</div>
        </div>
        <div class="content-body">
          {#if $sahChart.data}
            <div id="concelho-chart" />
          {:else}
            <div id="no-data">Não existem dados para este concelho.</div>
          {/if}
        </div>
      </div>
    </div>
  </Wrapper>
{/if}
