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

  const didScrubTo = ({ scrubberOffsetPercentage }) => {
    setSelectedDateForScrubberAt(scrubberOffsetPercentage);
  };

  const didPressPlayPause = () => {
    const isPlaying = $player.isPlaying;
    player.setIsPlaying(!isPlaying);
  };

  const didPressPreviousDay = () => {
    if ($dateSelection.startDateOffset <= 0) return;
    const newDate = moment($dateSelection.selectedDate)
      .subtract(1, "days")
      .format(config.dateFormat);
    dateSelection.setSelectedDate(newDate, $dateSelection.startDateOffset - 1);
  };

  const didPressNextDay = () => {
    const { selectedInfoSourceId } = $menuSelection;
    const { startDate, dataLength } = $availableDatesStore.filter(
      (item) => item.id === selectedInfoSourceId
    )[0];

    if ($dateSelection.startDateOffset >= dataLength) return;
    const newDate = moment($dateSelection.selectedDate)
      .add(1, "days")
      .format(config.dateFormat);
    dateSelection.setSelectedDate(newDate, $dateSelection.startDateOffset + 1);
  };

  const setSelectedDateForScrubberAt = (scrubberOffsetPercentage) => {
    const { selectedInfoSourceId } = $menuSelection;
    const { startDate, dataLength } = $availableDatesStore.filter(
      (item) => item.id === selectedInfoSourceId
    )[0];
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
