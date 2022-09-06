<script>
	import { fade } from 'svelte/transition';

	import ConfigForm from './lib/ConfigForm.svelte';
	import GambleForm from './lib/GambleForm.svelte';
	import { generate, probability } from './utils.js';

	let bets = [],
			dices = [],
			config = {
				draws: 6,
				limit: 49
			};

	const updateConfig = (conf) => {
		config = { ...config, ...conf };
		bets = [];
		dices = [];
	}

	const roll = async (nums) => {
		bets = nums;
		dices = config.limit == config.draws
			? nums
			: generate(config.draws, config.limit);
	}

	$: matches = bets.filter(b => dices.includes(b));
	$: p = probability(config.limit, config.draws, matches.length);
</script>

<main>
	<ConfigForm on:updateConfig={e => updateConfig(e.detail)} />
	<GambleForm {...config} on:roll={e => roll(e.detail)} />
	{#if bets.length === config.draws && dices.length === config.draws }
		{#key matches}
    <p in:fade={{ delay: 350 }} out:fade={{ duration: 350 }}>
      Numbers drawn: {dices}.<br />
		  {#if matches.length > 0 }
      	You hit {matches.length} number{matches.length === 1 ? '' : 's'}. ({matches})<br />
				The probability of this is {p}%.
			{:else}
	      Oops, you lost.
    	{/if}
    </p>
  {/key}
	{/if}
</main>

<style>
	main {
		margin: 1.2rem auto;
		user-select: none;
		max-width: 576px;
	}

	:global(form) {
		margin-bottom: 1.2rem;
	}
</style>
