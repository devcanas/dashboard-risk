<script>
  import { availableDatesStore, menuSelection } from "../../stores";
  import Timeline from "./Timeline.svelte";
  import moment from "moment";
  import config from "../../config";

  const initialState = {
    lowerBoundPercent: 0.8,
    upperBoundPercent: 1,
    scrubPercent: 1,
  };

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

<Timeline {getLabelForTimeLineAt} {initialState} />
