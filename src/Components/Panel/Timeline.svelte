<script>
  import { onMount } from "svelte";
import FetchService from '../../FetchService';
  import {
    availableDatesStore,
    dateSelection,
    menuSelection,
    player,
    timelineControls,
  } from "../../stores";

  export let didScrubTo;

  let timeline = { el: null, rect: null };
  let scrubber = { el: null, rect: null };
  let chartCanvas = null;

  const handleMouseDownOnScrub = (e) => {
    if ($player.isPlaying) return;
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
    chartCanvas.style.width = timeline.rect.width;
    chartCanvas.style.height = timeline.rect.height;
  };

  const handleNewDate = () => {
    if (!timeline.rect) return;

    const daysOffset = $dateSelection.startDateOffset;
    const { dataLength } = $dateSelection.metadata;

    const scrubberOffset =
      ((timeline.rect.width - scrubber.rect.width) * daysOffset) / dataLength;
    setScrubberPosition(scrubberOffset);
  };

  const configureRiskChart = async () => {
    const {values, yscale} = await FetchService.chartData();
    const indexedValues = values.map((value, index) => [index, value])

    const xScale = d3.scaleLinear().domain([0, values.length]).range([0, timeline.rect.width])
    const yScale = d3.scaleLinear().domain([0, yscale]).range([timeline.rect.height, 5]);

    const line = d3.line()
      .x(function(d) { return xScale(d[0]); }) 
      .y(function(d) { return yScale(d[1]); }) 
      .curve(d3.curveCatmullRom.alpha(0.1))
      
    d3.select("svg")
      .append("path")
      .datum(indexedValues) 
      .attr("class", "line") 
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "rgb(200,100,100)")
      .style("stroke-width", "5");
  }

  onMount(async () => {
    updateControlsMetadata();

    const initialOffset = timeline.rect.width - scrubber.rect.width;
    setScrubberPosition(initialOffset);

    configureRiskChart()
  });

  dateSelection.subscribe(handleNewDate);
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />
<div id="container" bind:this={timeline.el}>
  <svg bind:this={chartCanvas}></svg>
  <div class="center_line" />
  <div
    id="slider-knob"
    class={$player.isPlaying ? "faded" : ""}
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
    overflow: hidden;
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
    transition-duration: 0.3s;
  }

  .faded {
    opacity: 0.3;
    cursor: default;
  }
</style>
