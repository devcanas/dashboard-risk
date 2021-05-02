<script>
  import Wrapper from "./Wrapper.svelte";

  $: isPrediction = () => {
    let { dates } = $availableDates;
    let selectedIndex = indexOfSelectedDate();
    return dates[selectedIndex].isPred;
  };
</script>

{#if $availableDates.selectedDate !== null}
  <Wrapper topRight>
    <div class="info-wrapper">
      {#if isPrediction()}
        <div id="pred_warning">
          <img src="/images/warn.png" width="25" alt="warning" />
          <span>Dados de previsão</span>
        </div>
      {/if}
      {#if !$mapInfo.edited}
        <span class="info-label">Passe por cima do mapa</span>
      {:else}
        <span class="info-label">Concelho: {$mapInfo.displayString}</span><br />
        <span class="info-label"
          >Risco:
          {Math.round($mapInfo.Risk) || "-"}</span
        ><br />
        <span class="info-label"
          >Incerteza:
          {Math.round($mapInfo.IQD) || "-"}</span
        ><br />
        <span class="info-label">Fica em casa: {$mapInfo.sah}</span>
      {/if}
    </div>
  </Wrapper>
{/if}

<style>
  .info-wrapper {
    width: 500px;
    padding: 20px;
  }

  .info-label {
    font-size: 20px;
    color: #333;
  }

  #pred_warning {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  #pred_warning span {
    margin-left: 10px;
    font-weight: 600;
  }
</style>
