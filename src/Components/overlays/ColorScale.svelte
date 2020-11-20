<script>
  import Wrapper from "./Wrapper.svelte";
  export let risk = false;
  export let idq = false;
  export let sah = false;
</script>

<style>
  .color-scale {
    min-width: 200px;
  }
  .color-scale-title {
    background-color: rgb(0, 35, 155);
    padding: 15px;
    color: white;
    box-shadow: 0 0 5px black;
  }

  .color-scale-context {
    font-size: 13px;
  }

  .color-scale-figures {
    padding: 20px;
    color: #333;
  }
  .outer {
    display: flex;
  }

  .inner {
    width: 30px;
    height: 20px;
    margin-right: 20px;
  }
</style>

<Wrapper bottomRight>
  <div class="color-scale">
    <div class="color-scale-title">
      {#if risk}
        Risco<br />
        <span class="color-scale-context">por 100.000 habitantes</span>
      {:else if idq}
        Incerteza<br />
        <span class="color-scale-context">por 100.000 habitantes</span>
      {:else if sah}Stay@Home{/if}
    </div>
    <div class="color-scale-figures">
      {#if sah}
        <div class="outer">
          <div class="inner" style="background-color: #b8de29;" />&gt; 70%
        </div>
        <div class="outer">
          <div class="inner" style="background-color: #3cbb75;" />60% - 70%
        </div>
        <div class="outer">
          <div class="inner" style="background-color: #238a8d;" />50% - 70%
        </div>
        <div class="outer">
          <div class="inner" style="background-color: #39568c;" />40% - 50%
        </div>
        <div class="outer">
          <div class="inner" style="background-color: #481567;" />&lt; 40%
        </div>
      {:else}
        <div class="outer">
          <div class="inner" style="background-color: #fde725;" />1000+
        </div>
        <div class="outer">
          <div class="inner" style="background-color: #b8de29;" />800
        </div>
        <div class="outer">
          <div class="inner" style="background-color: #3cbb75;" />600
        </div>
        <div class="outer">
          <div class="inner" style="background-color: #238a8d;" />400
        </div>
        <div class="outer">
          <div class="inner" style="background-color: #39568c;" />200
        </div>
        <div class="outer">
          <div class="inner" style="background-color: #481567;" />0
        </div>
      {/if}
    </div>
  </div>
</Wrapper>
