<script>
  import App from "./App.svelte";
  import FetchService from "./FetchService";
  const configPromise = FetchService.initialConfiguration();
</script>

{#await configPromise then configuration}
  <App {configuration} />
{/await}
