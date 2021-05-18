<script>
  import Timeline from "./Timeline.svelte";
  import Toggles from "./Toggles.svelte";
</script>

<div class="container">
  <div class="header"><h1>Dashboard Risco Covid-19</h1></div>
  <div class="content">
    <Toggles />
    <Timeline />
  </div>
</div>

<style>
  .container {
    position: absolute;
    top: 0;
    bottom: 70px;
    z-index: 1;
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    pointer-events: none;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    height: 65px;
    padding: 0 10px;
    background-color: rgba(212, 218, 220, 0.5);
    font-size: 15px;
    margin-bottom: 20px;
    flex: 1;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 20px;
    flex: 5;
  }
</style>
