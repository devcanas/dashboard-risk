<script>
    import Wrapper from "../Wrapper";
    import DatePicker from "@Components/date-picker-external/DatePicker";
    import { availableDates, mapInfo } from "../../../../stores";

    const months = {
        0: 'Janeiro',
        1: 'Fevereiro',
        2: 'Março',
        3: 'Abril',
        4: 'Maio',
        5: 'Junho',
        6: 'Julho',
        7: 'Agosto',
        8: 'Setembro',
        9: 'Outubro',
        10:'Novembro',
        11:'Dezembro'
    }

    const prettyFormat = date => {
        return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
    }

    const addZeroIfNeeded = no => {
        const needsZero = no < 10;
        return `${needsZero ? "0" : ""}${no}`;
    }

    const shortFormat = date => {
        const year = date.getFullYear();
        const month = addZeroIfNeeded(date.getMonth() + 1);
        const day = addZeroIfNeeded(date.getDate());
        return `${year}-${month}-${day}`;
    }

    let formattedSelected = prettyFormat(new Date($availableDates.selectedDate))

    const dateFromString = (str) => {
        if (str === null) return;
        const parts = str.split("-")
        return new Date(parts[0], parts[1] - 1, parts[2])
    }

    /* $availableDates.dates.includes(shortFormat(date)) */
</script>

<style src="./style.scss">

</style>
{#if $availableDates.selectedDate !== null}
<Wrapper topRight>
    <div class="info-wrapper">
        <div class="date-picker-wrapper">
            <DatePicker
                on:dateSelected={e => {
                    const dateStr = shortFormat(e.detail.date);
                    if (dateStr === $availableDates.selectedDate) return;
                    return availableDates.selectDate(dateStr);
                }}
                bind:formattedSelected
                start={dateFromString("2020-01-01")}
                end={dateFromString($availableDates.dates[$availableDates.dates.length - 1] || "2020-10-27")}
                selected={new Date($availableDates.selectedDate)}
                selectableCallback={date => true}
                format={prettyFormat}>
                <button class='custom-button'>{formattedSelected}</button>
            </DatePicker>
        </div>
        {#if !$mapInfo.edited }
            <span class="info-label">Passe por cima do mapa</span>
        {:else}
            <span class="info-label">Concelho: {$mapInfo.concelho}</span><br/>
            <span class="info-label">Risco: {Math.round($mapInfo.Risk) || "-"}</span><br/>
            <span class="info-label">Incerteza: {Math.round($mapInfo.IQD) || "-"}</span><br/>
            <span class="info-label">Fica em casa: {$mapInfo.sah}</span>
        {/if }
    </div>
</Wrapper>
{/if}
