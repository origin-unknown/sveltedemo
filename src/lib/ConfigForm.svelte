<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let draws = 6, limit = 49;

  const updateConfig = () => {
    dispatch('updateConfig', { draws: draws, limit: limit });
  }

  const drawsChanged = () => {
    if (limit < draws) limit = draws;
  };
</script>

<form on:submit|preventDefault={updateConfig}>
  <div class="mb-1">
    <label for="draws">Number of draws:</label>
    <input
      type="number"
      id="draws"
      bind:value={draws}
      on:change={drawsChanged}
      min="1"
      max="10"
      step="1"
    />
  </div>
  <div class="mb-2">
    <label for="limit">Limit of numbers:</label>
    <input
      type="number"
      id="limit"
      bind:value={limit}
      min="{draws}"
      max="196"
      step="1"
    />
  </div>
  <input type="submit" class="block" value="Configure" />
</form>

<style>
  form div {
    display: flex;
    flex-direction: column;
  }

  form label {
    font-size: 10pt;
    font-weight: bold;
    margin-bottom: .3rem;
  }

  form input[type="number"] {
    outline: none;
    border-radius: 3px;
    border: 1px solid #666;
    padding: 0.42rem;
    font-size: 14px;
  }

  .block {
    display: block;
    width: 100%;
    border: none;
    background-color: #f00;
    border-radius: 3px;
    color: #fff;
    font-weight: bold;

    padding: 0.64rem 1.2rem;
    margin: 0.64rem 0;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
  }

  .mb-1 {
    margin-bottom: .64rem;
  }
  .mb-2 {
    margin-bottom: 1.2rem;
  }
</style>
