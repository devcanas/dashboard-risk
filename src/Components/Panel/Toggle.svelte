<script>
  import { afterUpdate, onMount, tick } from "svelte";

  export let label;
  export let items;
  export let isSelected;
  export let select;

  let shouldUpdatePill = false;
  let pill = { el: null, rect: null };
  let toggle = { el: null, rect: null };
  let selectedItem = { el: null, rect: null };
  let refs = [];

  afterUpdate(async () => {
    if (!shouldUpdatePill) return;
    updateMetadata();
    positionPill();
  });

  const updateMetadata = () => {
    pill.rect = pill.el.getBoundingClientRect();
    toggle.rect = toggle.el.getBoundingClientRect();

    const selectedRef = refs.filter((ref) =>
      ref.classList.contains("selected")
    )[0];

    if (!selectedRef) return;

    selectedItem.el = selectedRef;
    selectedItem.rect = selectedRef.getBoundingClientRect();
    shouldUpdatePill = true;
  };

  const positionPill = () => {
    const selectedItemOffset = selectedItem.rect.x - toggle.rect.x;
    const selectedItemWidth = selectedItem.rect.width;

    pill.el.style.left = selectedItemOffset + "px";
    pill.el.style.width = selectedItemWidth + "px";
  };

  onMount(() => {
    updateMetadata();
    positionPill();
  });
</script>

<div class="toggle-wrapper">
  {#if label && label !== ""}
    <div class="toggle-label">{label}</div>
  {/if}
  <div class="toggle" bind:this={toggle.el}>
    {#each items as item, i (item.name)}
      <span
        on:click={(_) => select(item.id)}
        bind:this={refs[i]}
        class={isSelected(item.id) ? "selected" : ""}>{item.name}</span
      >
    {/each}
    <div class="pill" bind:this={pill.el} />
  </div>
</div>

<style>
  .toggle {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    background-color: white;
    border-radius: 22px;
  }

  .toggle-wrapper {
    margin-bottom: 20px;
    pointer-events: visible;
    position: relative;
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
    z-index: 2;
    transition-duration: 0.3s;
    transition-delay: 0.1s;
  }

  .selected {
    color: white;
  }

  .pill {
    position: absolute;
    border-radius: 20px;
    background-color: rgba(39, 120, 173, 0.8);
    color: white;
    left: 0;
    z-index: 0;
    width: 50px;
    height: 100%;
    transition-duration: 0.3s;
  }
</style>
