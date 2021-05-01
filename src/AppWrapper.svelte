<script>
  import App from "./App.svelte";

  const getInitialConfig = async () => {
    const configEndpoint = "http://localhost:9000/init";
    const res = await fetch(configEndpoint);
    const configValue = await res.json();

    if (res.ok) return configValue;
    else throw new Error("Failed to fetch initial config.");
  };

  const configPromise = getInitialConfig();
</script>

{#await configPromise then config}
  <App {config} />
{/await}
