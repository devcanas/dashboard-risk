<script>
  import { onMount } from "svelte";
  import {
    availableDatesStore,
    dateSelection,
    menuSelection,
    timelineControls,
  } from "../../stores";
  export let didScrubTo;

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

    const scrubberOffsetPercentage = getScrubberOffsetPercentage(safeOffset);
    didScrubTo({ scrubberOffsetPercentage });
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

  const handleNewDate = () => {
    if (!timeline.rect) return;

    const daysOffset = $dateSelection.startDateOffset;

    const { selectedInfoSourceId } = $menuSelection;
    const { startDate, dataLength } = $availableDatesStore.filter(
      (item) => item.id === selectedInfoSourceId
    )[0];

    const scrubberOffset =
      ((timeline.rect.width - scrubber.rect.width) * daysOffset) / dataLength;
    setScrubberPosition(scrubberOffset);
  };

  onMount(async () => {
    updateControlsMetadata();

    const initialOffset = timeline.rect.width - scrubber.rect.width;
    setScrubberPosition(initialOffset);
  });

  dateSelection.subscribe(handleNewDate);
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
