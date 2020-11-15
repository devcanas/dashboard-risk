<script>
    import Wrapper from "../Wrapper";
    import { info } from "../../../../stores";
import { dataset_dev } from "svelte/internal";

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
        10: 'Novembro',
        11: 'Dezembro'
    }

    let dateStr = "2020-10-27"
    let date = new Date(dateStr);
    let prettyDate = "27 de " + months[date.getMonth()] + " de 2020"

</script>

<style src="./style.scss">

</style>

<Wrapper topRight>
    <div class="info-wrapper">
            <span class="info-label bold">{prettyDate}</span><br/>
        {#if !$info.edited }
            <span class="info-label">Passe por cima do mapa</span>
        {:else}
            <span class="info-label">Concelho: {$info.concelho}</span><br/>
            <span class="info-label">Risco: {Math.round($info.Risk)}</span><br/>
            <span class="info-label">Incerteza: {Math.round($info.IQD)}</span><br/>
            <span class="info-label">Fica em casa: {$info.FicarEmCasa}</span>
        {/if }
    </div>
</Wrapper>
