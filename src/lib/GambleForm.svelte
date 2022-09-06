<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  export let draws;
  export let limit;

  let bets;

  const roll = () => {
    const nums = bets.reduce((r,b,i) => {
      if (b) r.push(i+1);
      return r;
    }, []);
    dispatch('roll', nums);
  };

  $: propsChanged(draws, limit)
  const propsChanged = (draws, limit) => {
    bets = Array(limit).fill(false);
  };
  $: placedBets = bets.filter(b => b).length;
  $: columnCount = Math.ceil(Math.sqrt(limit));
  $: rowCount = Math.ceil(limit/columnCount);
</script>

<form on:submit|preventDefault={roll}>
  <div class="fieldset-responsive">
    <fieldset name="numbers" class="grid"
      style="
        grid-template-columns: repeat({columnCount}, 32px);
        grid-template-rows: repeat({rowCount}, 32px);
      "
    >
      <legend>Choose {draws} numbers:</legend>
      {#each Array(limit) as _, i}
      <div class="number-box">
        <input
          type="checkbox"
          id="box-{i+1}"
          bind:checked={bets[i]}
          disabled={ !bets[i] && placedBets === draws }
          hidden
        />
        <label for="box-{i+1}">{i + 1}</label>
      </div>
      {/each}
    </fieldset>
  </div>
  <input type="submit" class="block" value="Gamble" disabled={ placedBets !== draws } />
</form>

<style>
  legend {
    font-weight: bold;
    text-align: left;
    font-size: 10pt;
  }

  .fieldset-responsive {
    width: 100%;
    overflow: auto;
  }

  fieldset {
    border-color: #f00;
    border-style: solid;
    border-radius: 3px;
    margin-bottom: 0.64rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(7, 32px);
    grid-template-rows: repeat(7, 32px);
    column-gap: 6px;
    row-gap: 6px;
    justify-content:center;
  }

  .number-box label {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid #f00;
    border-radius: 2px;
    color: #f00;
    font-size: 14pt;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.4s, color 0.4s, border 0.4s;
  }

  .number-box input:checked ~ label {
    background-color: #f00;
    color: #fff;
  }

  .number-box input:disabled ~ label {
    cursor: not-allowed;
    color: #666;
    border-color: #666;
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

    transition: background 0.4s;
  }

  input[type="submit"]:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
</style>
