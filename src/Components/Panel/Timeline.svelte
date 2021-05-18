<script>
  import { onMount } from "svelte";
  import { timelineControls } from "../../stores";
  let controls;

  const handleMouseDownOnScrub = (e) => {
    timelineControls.setIsScrubbing(true);
    return false;
  };

  const handleMouseDownOnLeftRangeControl = (e) => {
    timelineControls.setIsAdjustingLowerBound(true);
    return false;
  };

  const handleMouseDownOnRightRangeControl = (e) => {
    timelineControls.setIsAdjustingUpperBound(true);
    return false;
  };

  const handleMouseUp = (e) => {
    timelineControls.reset();
    updateControlsMetadata();
    return false;
  };

  const scrubberBoundXFor = ({ bound }) => {
    const { timeline, scrubber } = controls;
    return (
      scrubber.rect.x -
      bound.rect.width / 2 +
      scrubber.rect.width / 2 -
      timeline.rect.x
    );
  };

  const handleScrub = (e) => {
    const { timeline, scrubber, lowerBound, upperBound } = controls;

    const boundsFor = (rect) =>
      rect.x -
      timeline.rect.x -
      lowerBound.rect.width +
      scrubber.rect.width / 2;

    const lowerBoundX = boundsFor(lowerBound.rect);
    const upperBoundX = boundsFor(upperBound.rect);

    let scrubOffset = e.clientX - timeline.rect.x - scrubber.rect.width / 2;

    if (scrubOffset < lowerBoundX) {
      scrubOffset = lowerBoundX;
    } else if (scrubOffset > upperBoundX) {
      scrubOffset = upperBoundX;
    }

    // currentPosition = scrubOffset + getScrubCoords().width / 2;
    scrubber.el.style.left = `${scrubOffset}px`;
  };

  const offsetForAdjustedBound = (e, bound, { upperBoundX, lowerBoundX }) => {
    const { timeline } = controls;

    let offset = e.clientX - timeline.rect.x - bound.rect.width / 2;

    if (offset < lowerBoundX) {
      offset = lowerBoundX;
    } else if (offset > upperBoundX) {
      offset = upperBoundX;
    }

    return offset;
  };

  const handleAdjustLowerBound = (e) => {
    const { lowerBound, leftFaded } = controls;
    const lowerBoundX = -lowerBound.rect.width / 2;
    const upperBoundX = scrubberBoundXFor({ bound: lowerBound });
    const bounds = { lowerBoundX, upperBoundX };
    const offset = offsetForAdjustedBound(e, lowerBound, bounds);
    lowerBound.el.style.left = `${offset}px`;
    leftFaded.style.width = `${offset + lowerBound.rect.width / 2}px`;
  };

  const handleAdjustUpperBound = (e) => {
    const { timeline, upperBound, rightFaded } = controls;
    const lowerBoundX = scrubberBoundXFor({ bound: upperBound });
    const upperBoundX = timeline.rect.width - upperBound.rect.width / 2;
    const bounds = { lowerBoundX, upperBoundX };
    const offset = offsetForAdjustedBound(e, upperBound, bounds);
    upperBound.el.style.left = `${offset}px`;
    rightFaded.style.width = `${
      timeline.rect.width - offset - upperBound.rect.width / 2
    }px`;
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    let handler;
    if ($timelineControls.isScrubbing) {
      handler = handleScrub;
    } else if ($timelineControls.isAdjustingLowerBound) {
      handler = handleAdjustLowerBound;
    } else if ($timelineControls.isAdjustingUpperBound) {
      handler = handleAdjustUpperBound;
    } else return false;

    handler(e);
    return false;
  };

  const updateControlsMetadata = (_) => {
    const metadata = ({ id }) => {
      const el = document.querySelector(id);
      const rect = el.getBoundingClientRect();
      return { el, rect };
    };

    controls = {
      timeline: metadata({ id: "#container" }),
      scrubber: metadata({ id: "#slider-knob" }),
      lowerBound: metadata({ id: "#left-range-control" }),
      upperBound: metadata({ id: "#right-range-control" }),
      leftFaded: document.querySelector("#left-range-faded"),
      rightFaded: document.querySelector("#right-range-faded"),
    };
  };

  onMount(() => {
    updateControlsMetadata();
  });
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />
<div id="container">
  <div class="center_line" />
  <img
    id="slider-knob"
    on:mousedown={handleMouseDownOnScrub}
    src="/images/slider-knob.png"
    alt="slider knob"
  />
  <img
    id="left-range-control"
    on:mousedown={handleMouseDownOnLeftRangeControl}
    class="range-control"
    src="/images/slider-range-control.png"
    alt="left range control"
  />
  <img
    id="right-range-control"
    on:mousedown={handleMouseDownOnRightRangeControl}
    class="range-control"
    src="/images/slider-range-control.png"
    alt="right range control"
  />
  <div id="left-range-faded" class="faded" />
  <div id="right-range-faded" class="faded" />
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
    top: 40px;
    cursor: grab;
    z-index: 3;
  }

  .range-control {
    position: absolute;
    width: 13px;
    bottom: 0;
    cursor: grab;
    z-index: 2;
  }

  #right-range-control {
    left: 200px;
  }

  #left-range-faded {
    left: 0;
  }

  #right-range-faded {
    right: 0;
  }

  .faded {
    position: absolute;
    width: 0;
    height: 100%;
    background-color: rgba(212, 218, 220, 0.4);
    z-index: 1;
  }
</style>
