<script>
  export let label;
  export let items;
  export let isSelected;
  export let select;
</script>

<div class="toggle-wrapper">
  {#if label && label !== ""}
    <div class="toggle-label">{label}</div>
  {/if}
  <div class="toggle">
    {#each items as item (item.name)}
      <span
        on:click={(_) => select(item.id)}
        class={isSelected(item.id) ? "selected" : ""}>{item.name}</span
      >
    {/each}
  </div>
</div>

<style>
  .toggle {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    background-color: white;
    border-radius: 22px;
  }

  .toggle-wrapper {
    margin-bottom: 20px;
    pointer-events: visible;
  }

  .toggle-label {
    color: #555;
    font-size: 15px;
    margin-bottom: 10px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 100%;
    padding: 7px 10px;
    border-radius: 20px;
    font-size: 15px;
    color: #555;
  }

  .selected {
    background-color: rgb(39, 120, 173);
    color: white;
    transition-duration: 0.5s;
  }
</style>
