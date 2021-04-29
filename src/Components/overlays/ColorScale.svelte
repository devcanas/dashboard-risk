<script>
  import Wrapper from "./Wrapper.svelte";
  export let menu;
</script>

{#if menu}
  <Wrapper bottomRight>
    <div class="color-scale">
      <div class="color-scale-title">
        {menu.name}<br />
        {#if menu.description !== ""}
          <span class="color-scale-context">{menu.description || ""}</span>
        {/if}
      </div>
      <div class="color-scale-figures">
        {#each menu.intervals as interval}
          <div class="outer">
            <div
              class="inner"
              style={`background-color: ${
                interval.color
                  .primary /** TODO: check if we are in prediction or not */
              };`}
            />
            {interval.asString}
          </div>
        {/each}
      </div>
    </div>
  </Wrapper>
{/if}

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
