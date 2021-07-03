<script>
  import { onMount } from "svelte";
  import { timelineControls } from "../../stores";
  export let getLabelForTimeLineAt;

  let timeline = { el: null, rect: null };
  let scrubber = { el: null, rect: null };

  const handleMouseDownOnScrub = (e) => {
    timelineControls.setIsScrubbing(true);
    return false;
  };

  const handleMouseUp = (e) => {
    timelineControls.reset();
    updateControlsMetadata();
    return false;
  };

  const handleScrub = (e) => {
    let scrubOffset = e.clientX - timeline.rect.x - scrubber.rect.width / 2;
    let scrubbableWidth = timeline.rect.width - scrubber.rect.width;
    let safeOffset = Math.min(Math.max(0, scrubOffset), scrubbableWidth);
    setScrubberPosition(safeOffset);

    const label = getLabelForTimeLineAt({
      scrubberOffsetPercentage: getScrubberOffsetPercentage(safeOffset),
    });
  };

  const getScrubberOffsetPercentage = (offset) => {
    const scrubbableWidth = timeline.rect.width - scrubber.rect.width;
    return offset / scrubbableWidth;
  };

  const setScrubberPosition = (offset) => {
    scrubber.el.style.left = `${offset}px`;
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    let handler;
    if ($timelineControls.isScrubbing) {
      handler = handleScrub;
    } else {
      return;
    }
    handler(e);
    return false;
  };

  const updateControlsMetadata = (_) => {
    timeline.rect = timeline.el.getBoundingClientRect();
    scrubber.rect = scrubber.el.getBoundingClientRect();
  };

  onMount(async () => {
    updateControlsMetadata();

    const initialOffset = timeline.rect.width - scrubber.rect.width;
    setScrubberPosition(initialOffset);
  });
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />
<div id="container" bind:this={timeline.el}>
  <div class="center_line" />
  <div
    id="slider-knob"
    on:mousedown={handleMouseDownOnScrub}
    bind:this={scrubber.el}
  />
</div>

<style>
  #container {
    width: 500px;
    height: 100px;
    border-radius: 8px;
    background-color: rgba(39, 120, 173, 0.5);
    pointer-events: visible;
    position: relative;
  }

  .center_line {
    position: absolute;
    height: 5px;
    width: 100%;
    top: 47.5px;
    background-color: rgb(212, 218, 220);
  }

  #slider-knob {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: rgb(100, 100, 100);
    border-radius: 50%;
    top: 40px;
    cursor: grab;
    z-index: 3;
  }
</style>
