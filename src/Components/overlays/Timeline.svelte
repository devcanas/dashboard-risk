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

  const indexOfSelectedDate = () => {
    let { selectedDate, dates } = $availableDates;
    for (let i = 0; i < dates.length; i++) {
      if (dates[i].date === selectedDate) {
        return i;
      }
    }
    return null;
  };

  const getNextDate = (_) => {
    const selectedIndex = indexOfSelectedDate();
    let { dates } = $availableDates;
    console.log("current: ", dates[selectedIndex].date);
    console.log("next   : ", dates[selectedIndex + 1].date);
    if (selectedIndex !== null && selectedIndex < dates.length - 1) {
      return dates[selectedIndex + 1].date;
    } else {
      return dates[0].date;
    }
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
