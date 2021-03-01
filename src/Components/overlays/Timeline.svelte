<script>
  import { availableDates, player } from "../../stores";

  import Player from "../Player.svelte";
  import Wrapper from "./Wrapper.svelte";

  let timeout = null;

  const startPlayoutIfNeeded = () => {
    !timeout && setTimeout(playerHandler, 1000);
  };

  const stopPlayoutIfNeeded = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

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

  const shouldStartPlayout = () => {
    player.setState({ ...$player, isPlaying: true });
  };

  const shouldPausePlayout = (_) => {
    player.setState({ ...$player, isPlaying: false });
  };

  player.subscribe((playerStore) => {
    if (playerStore.isPlaying) {
      startPlayoutIfNeeded();
    } else if (!playerStore.isPlaying) {
      stopPlayoutIfNeeded();
    }
  });
</script>

<Wrapper topLeft>
  <Player
    isPlaying={timeout !== null}
    items={$availableDates.dates}
    selectItem={handleSelection}
    {shouldStartPlayout}
    {shouldPausePlayout}
  />
</Wrapper>

<style>
</style>
