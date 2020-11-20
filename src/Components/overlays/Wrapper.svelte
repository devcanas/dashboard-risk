<script>
  export let bottomLeft = false;
  export let bottomRight = false;
  export let topRight = false;
  export let topLeft = false;
</script>

<style>
  .map-overlay-wrapper {
    position: absolute;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 10px rgb(180, 180, 180);
  }

  .bottomLeft {
    left: 10px;
    bottom: 10px;
  }

  .bottomRight {
    right: 10px;
    bottom: 30px;
  }

  .topRight {
    right: 10px;
    top: 10px;
  }

  .topLeft {
    left: 40px;
    top: 10px;
  }
</style>

<div
  class="map-overlay-wrapper"
  class:bottomLeft
  class:bottomRight
  class:topRight
  class:topLeft>
  <slot />
</div>
