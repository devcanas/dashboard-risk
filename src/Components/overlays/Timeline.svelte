<script>
  import { availableDates } from "../../stores";

  import Player from "../Player.svelte";
  import Wrapper from "./Wrapper.svelte";

  let timeout = null;

  const handleSelection = (selectedDate) => {
    availableDates.selectDate(selectedDate);
  };

  const getNextDate = (_) => {
    const selectedDate = $availableDates.selectedDate;
    const selectedIndex = $availableDates.dates.indexOf(selectedDate);
    return $availableDates.dates[selectedIndex + 1];
  };

  const playerHandler = (_) => {
    timeout = setTimeout(playerHandler, 1000);
    const nextDate = getNextDate();
    availableDates.selectDate(nextDate);
  };

  const didPlay = () => {
    !timeout && setTimeout(playerHandler, 1000);
  };

  const didPause = (_) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  const didStopPlayout = (_) => {};
</script>

<style>
</style>

<Wrapper topLeft>
  <Player
    isPlaying={timeout !== null}
    items={$availableDates.dates}
    selectItem={handleSelection}
    {didPlay}
    {didPause}
    {didStopPlayout} />
</Wrapper>
