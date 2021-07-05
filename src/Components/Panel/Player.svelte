<script>
  import {
    availableDatesStore,
    dateSelection,
    menuSelection,
    player,
  } from "../../stores";
  import Timeline from "./Timeline.svelte";
  import PlayerControls from "./PlayerControls.svelte";
  import moment from "moment";
  import config from "../../config";
  import { onMount } from "svelte";

  let label;

  const handlePlayback = () => {
    setTimeout(() => {
      if (!$player.isPlaying) return;
      handleNextPreviousDay({ direction: 1 });
      handlePlayback();
    }, 150);
  };

  player.subscribe(({ isPlaying }) => {
    if (isPlaying) handlePlayback();
  });

  const didScrubTo = ({ scrubberOffsetPercentage }) => {
    setSelectedDateForScrubberAt(scrubberOffsetPercentage);
  };

  const didPressPlayPause = () => {
    const isPlaying = $player.isPlaying;
    player.setIsPlaying(!isPlaying);
  };

  const didPressPreviousDay = () => {
    if ($player.isPlaying) return;
    handleNextPreviousDay({ direction: -1 });
  };

  const didPressNextDay = () => {
    if ($player.isPlaying) return;
    handleNextPreviousDay({ direction: 1 });
  };

  const handleNextPreviousDay = ({ direction }) => {
    const { dataLength } = $dateSelection.metadata;

    let newDate;
    if (direction === 1 && $dateSelection.startDateOffset < dataLength) {
      newDate = moment($dateSelection.selectedDate)
        .add(1, "days")
        .format(config.dateFormat);
    } else if (direction === -1 && $dateSelection.startDateOffset > 0) {
      newDate = moment($dateSelection.selectedDate)
        .subtract(1, "days")
        .format(config.dateFormat);
    } else {
      if ($player.isPlaying) {
        player.setIsPlaying(false);
      }
      return;
    }
    dateSelection.setSelectedDate(
      newDate,
      $dateSelection.startDateOffset + direction
    );
  };

  const setSelectedDateForScrubberAt = (scrubberOffsetPercentage) => {
    const { startDate, dataLength } = $dateSelection.metadata;
    const daysSince = Math.round(dataLength * scrubberOffsetPercentage);
    const firstDate = moment(startDate, config.dateFormat);
    const newDate = firstDate.add(daysSince, "days").format(config.dateFormat);
    dateSelection.setSelectedDate(newDate, daysSince);
  };

  const labelForSelectedDate = () => {
    let dateFormat = "DD [de] MMMM [de] YYYY";
    let selectedDate = moment($dateSelection.selectedDate);
    return selectedDate.format(dateFormat);
  };

  const updateLabel = () => {
    if (!label) return;
    label.innerHTML = labelForSelectedDate();
  };

  dateSelection.subscribe(updateLabel);
  onMount(updateLabel);
</script>

<div id="wrapper">
  <div id="controls-wrapper">
    <span bind:this={label}>25 de Novembro de 2020</span>
    <PlayerControls
      {didPressPlayPause}
      {didPressPreviousDay}
      {didPressNextDay}
    />
  </div>

  <Timeline {didScrubTo} />
</div>

<style>
  #wrapper {
    display: flex;
    flex-direction: column;
  }

  #controls-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  #controls-wrapper span {
    font-size: 20px;
    color: white;
    padding: 10px;
    background-color: rgba(39, 120, 173, 0.5);
    border-radius: 10px;
  }
</style>
