<script>
  import { availableDates, player } from "../stores";
  export let isPlaying;
  export let items;
  export let selectItem;
  export let didPlay;
  export let didPause;
  let currentPosition = 0;

  availableDates.subscribe((store) => {
    if (!document.getElementById("timeline")) return;
    const { dates, selectedDate } = store;
    const selectedIndex = dates.indexOf(selectedDate);
    const stepWidth =
      document.getElementById("timeline").getBoundingClientRect().width /
      dates.length;
    const scrubOffset = stepWidth * selectedIndex + stepWidth / 2;
    currentPosition = scrubOffset;
    document.getElementById("scrub").style.left = `${scrubOffset}px`;
  });

  const didEndScrubbing = (_) => {
    selectItem(getSelectedItem());
  };

  const getSelectedItem = (_) => {
    let selectedItemIndex = parseInt(
      (currentPosition * (items.length - 1)) / getTimelineCoords().width
    );
    return items[selectedItemIndex];
  };

  const getTimelineCoords = (_) =>
    document.getElementById("timeline").getBoundingClientRect();
  const getScrubCoords = (_) =>
    document.getElementById("scrub").getBoundingClientRect();
  const getLowerBound = (_) => -getScrubCoords().width / 2;
  const getUpperBound = (_) =>
    getTimelineCoords().width - getScrubCoords().width / 2;

  const handleMouseDown = (e) => {
    player.setState({ ...$player, isScrubbing: true });
    document.getElementById("tooltip").style.display = "flex";
    return false;
  };

  const handleMouseUp = (e) => {
    if ($player.isScrubbing) {
      player.setState({ ...$player, isScrubbing: false });
      didEndScrubbing();
      document.getElementById("tooltip").style.display = "none";
    }
    return false;
  };

  const handleMouseMove = (e) => {
    if (!$player.isScrubbing) return false;
    const timelineCoords = getTimelineCoords();
    const lowerBound = getLowerBound();
    const upperBound = getUpperBound();

    let scrubOffset =
      e.clientX - timelineCoords.left - getScrubCoords().width / 2;

    if (scrubOffset < lowerBound) {
      scrubOffset = lowerBound;
    } else if (scrubOffset > upperBound) {
      scrubOffset = upperBound;
    }

    currentPosition = scrubOffset + getScrubCoords().width / 2;
    document.getElementById("scrub").style.left = `${scrubOffset}px`;
    document.getElementById("tooltip").style.left = `${scrubOffset}px`;
    document.getElementById("tooltip").innerHTML = getSelectedItem();
  };
</script>

<style>
  .player {
    padding: 20px;
    display: flex;
    align-items: center;
  }

  .buttons-container {
    display: flex;
    align-items: center;
  }

  button {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: rgba(0, 0, 0, 0);
    border: none;
  }

  button:hover {
    transform: scale(1.1);
  }

  button:focus {
    outline: 0;
  }

  #scrub {
    width: 18px;
    height: 18px;
    background-color: rgb(0, 35, 155);
    border-radius: 50%;

    position: absolute;
    cursor: pointer;
    bottom: -6px;
    left: -9px;
    z-index: 1;

    box-shadow: 0 0 5px 0 #333;
  }

  #timeline {
    position: relative;
    width: 500px;
    height: 5px;
    background-color: #aaa;
    border-radius: 5px;
    margin-right: 20px;
  }

  #tooltip {
    padding: 10px;
    display: none;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    width: 150px;
    left: 0px;
    background-color: white;
    border-radius: 5px;
  }
</style>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />
<div class="player">
  <div id="timeline">
    <div id="tooltip" />
    <div id="scrub" on:mousedown={handleMouseDown} />
  </div>
  <div class="buttons-container">
    <button on:click={isPlaying ? didPause : didPlay}><img
        src={isPlaying ? '/images/pause.png' : '/images/play.png'}
        height="20"
        alt="play" /></button>
  </div>
</div>
