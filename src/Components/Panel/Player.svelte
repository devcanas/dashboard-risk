<script>
  import { availableDatesStore, menuSelection } from "../../stores";
  import Timeline from "./Timeline.svelte";
  import moment from "moment";
  import config from "../../config";

  const getLabelForTimeLineAt = ({ scrubberOffsetPercentage }) => {
    const { selectedInfoSourceId } = $menuSelection;
    const { startDate, dataLength } = $availableDatesStore.filter(
      (item) => item.id === selectedInfoSourceId
    )[0];
    const daysSince = Math.round(dataLength * scrubberOffsetPercentage);
    const firstDate = moment(startDate, config.dateFormat);
    const days = daysSince === 0 ? daysSince : daysSince - 1;
    const requestedDate = firstDate.add(days, "days");
    return requestedDate.format(config.dateFormat);
  };
</script>

<div id="wrapper">
  <div id="player-controls">
    <img
      class="actionable"
      src="/images/UI/playpause.png"
      alt="Play and pause"
    />
    <img
      class="fadeable actionable"
      src="/images/UI/previousday.png"
      alt="Previous Day"
    />
    <img
      class="fadeable actionable"
      src="/images/UI/nextday.png"
      alt="Next Day"
    />
  </div>
  <Timeline {getLabelForTimeLineAt} />
</div>

<style>
  .actionable {
    cursor: pointer;
    pointer-events: visible;
  }

  .actionable:active {
    opacity: 0.3;
  }

  #wrapper {
    display: flex;
    flex-direction: column;
  }

  #player-controls {
    display: flex;
    margin-bottom: 5px;
  }

  #player-controls img {
    height: 45px;
  }

  #player-controls :first-child {
    margin-right: 15px;
  }

  #player-controls :nth-child(2) {
    margin-right: 5px;
  }
</style>
