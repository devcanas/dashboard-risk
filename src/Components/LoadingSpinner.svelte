<script>
  export let isLoading;
</script>

<style>
  .loading-spinner-wrapper {
    position: absolute;
    display: none;
    align-items: center;
    justify-content: center;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: rgba(0, 0, 0, 0.4);
  }

  img {
    width: 70px;

    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .visible {
    display: flex;
  }
</style>

<div class="loading-spinner-wrapper {isLoading ? 'visible' : ''}">
  <img src="/images/spinner.png" alt="Loading spinner" />
</div>
