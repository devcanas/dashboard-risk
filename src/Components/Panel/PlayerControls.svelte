<script>
  import { player } from "../../stores";

  export let didPressPlayPause;
  export let didPressPreviousDay;
  export let didPressNextDay;
</script>

<div id="player-controls">
  <img
    on:click={didPressPlayPause}
    class="actionable"
    src="/images/UI/playpause.png"
    alt="Play and pause"
  />
  <img
    on:click={didPressPreviousDay}
    class="{$player.isPlaying ? 'faded' : ''} actionable"
    src="/images/UI/previousday.png"
    alt="Previous Day"
  />
  <img
    on:click={didPressNextDay}
    class="{$player.isPlaying ? 'faded' : ''} actionable"
    src="/images/UI/nextday.png"
    alt="Next Day"
  />
</div>

<style>
  .actionable {
    cursor: pointer;
    pointer-events: visible;
    transition-duration: 0.3s;
  }

  .faded {
    transition-duration: 0.3s;
    opacity: 0.3;
    cursor: default;
  }

  .actionable:active {
    opacity: 0.3;
  }

  #player-controls {
    display: flex;
  }

  #player-controls img {
    height: 35px;
  }

  #player-controls :first-child {
    margin-right: 15px;
  }

  #player-controls :nth-child(2) {
    margin-right: 5px;
  }
</style>
