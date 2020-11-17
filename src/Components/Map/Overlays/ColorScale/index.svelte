<script>
    import Wrapper from "../Wrapper";
    export let risk = false;
    export let idq = false;
    export let sah = false;
</script>

<style src="./style.scss">

</style>

<Wrapper bottomRight>
    <div class="color-scale">
        <div class="color-scale-title">
            {#if risk}
                Risco<br/>
                <span class="color-scale-context">por 100.000 habitantes</span>
            {:else if idq}
                Incerteza<br/>
                <span class="color-scale-context">por 100.000 habitantes</span>
            {:else if sah}
                Stay@Home
            {/if}
        </div>
        <div class="color-scale-figures">
            {#if sah}
                <div class="outer"><div class="inner" style="background-color: #b8de29;"></div>&gt; 70%</div>
                <div class="outer"><div class="inner" style="background-color: #3cbb75;"></div>60% - 70%</div>
                <div class="outer"><div class="inner" style="background-color: #238a8d;"></div>50% - 70%</div>
                <div class="outer"><div class="inner" style="background-color: #39568c;"></div>40% - 50%</div>
                <div class="outer"><div class="inner" style="background-color: #481567;"></div>&lt; 40%</div>
            {:else}    
                <div class="outer"><div class="inner" style="background-color: #fde725;"></div>1000+</div>
                <div class="outer"><div class="inner" style="background-color: #b8de29;"></div>800</div>
                <div class="outer"><div class="inner" style="background-color: #3cbb75;"></div>600</div>
                <div class="outer"><div class="inner" style="background-color: #238a8d;"></div>400</div>
                <div class="outer"><div class="inner" style="background-color: #39568c;"></div>200</div>
                <div class="outer"><div class="inner" style="background-color: #481567;"></div>0</div>
            {/if}
        </div>
    </div>
</Wrapper>
