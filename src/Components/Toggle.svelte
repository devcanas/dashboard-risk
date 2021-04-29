<script>
  export let items;
  export let isSelected;
  export let select;
</script>

<div class="type-toggle">
  {#each items as item (item.name)}
    <span
      on:click={(_) => select(item.id)}
      class={isSelected(item.id) ? "selected" : ""}>{item.name}</span
    >
  {/each}
</div>

<style>
  .type-toggle {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    background-color: white;
    border-radius: 22px;
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
    color: #333;
  }

  .selected {
    background-color: rgb(105, 154, 187);
    color: white;
    transition-duration: 0.5s;
    box-shadow: 0 0 5px -1px #555;
  }
</style>
