<script>
    export let bottomLeft = false;
    export let bottomRight = false;
    export let topRight = false;
    export let topLeft = false;
</script>

<style src="./style.scss">

</style>

<div class="map-overlay-wrapper" class:bottomLeft class:bottomRight class:topRight class:topLeft>
    <slot />
</div>
