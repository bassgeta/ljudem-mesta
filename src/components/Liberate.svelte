<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ApartmentBuilding from './ApartmentBuilding.svelte';
	import { onMount } from 'svelte';
	import { fetchTotalLiberated } from '../utils/liberation';
	import Arrow from '$lib/assets/icons/arrow.svelte';
	import DevDbControls from './DevDBControls.svelte';
	import { dev } from '$app/environment';
	import Block from './Block/Block.svelte';

	let totalLiberated = 0;

	onMount(async () => {
		const total = await fetchTotalLiberated();
		totalLiberated = total ?? 0;
	});

	function onAdd() {
		totalLiberated += 1;
	}
</script>

<div class="liberate-container">
	<div class="what-to-do">
		<h4 class="what-to-do-title">
			{@html $_('liberate.what-to-do.title')}
		</h4>
		<div class="what-to-do-description">
			{@html $_('liberate.what-to-do.description')}
		</div>
	</div>
	<!-- <div class="building-container">
		<ApartmentBuilding />
	</div> -->
	<Block onAdd="{onAdd}" />
	{#if dev}
		<div class="devdb">
			<DevDbControls />
		</div>
	{/if}
	<p class="total-liberated">
		<!-- Skupaj smo osvobodili že <span class="total-number">{totalLiberated}</span> stanovanj! -->
		{@html $_('liberatePage.counter.message', {
			values: { n: totalLiberated }
		})}
	</p>
	<a class="shadowed-card shadowed-button map-link" href="/liberate">
		<span>{$_('liberate.go-to-map')}</span>
		<Arrow />
	</a>
</div>

<style>
	.liberate-container {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 0 1.5rem;
		@media only screen and (max-width: 767px) {
			padding: 0;
		}
		padding-bottom: 4rem;
		color: var(--color-black);
	}

	.what-to-do {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;

		@media only screen and (max-width: 767px) {
			flex-direction: column;
		}

		margin: 3rem 0;
		padding: 0 2rem;
	}

	.what-to-do-title {
		flex-grow: 2;
		font-size: var(--font-xl);
		font-weight: 700;
		line-height: 1.2;
		text-wrap: balance;
	}

	.what-to-do-description {
		border: 2px solid var(--color-black);
		border-radius: 12px;
		padding: 2rem;

		text-align: center;
		font-weight: 500;
		font-size: var(--font-m);
		text-wrap: balance;
	}

	.building-container {
		width: 100%;
		height: 70vh;

		overflow: hidden;
		border: 4px solid var(--color-black);
		border-radius: 25px;
	}

	.total-liberated {
		text-align: center;
		font-size: var(--font-xl);
		font-weight: 900;
		margin: 3rem 0 1.5rem 0;
		& span {
			background-color: var(--color-neon-green);
		}
	}

	.map-link {
		background-color: var(--color-neon-green);
		margin-top: 2rem;
	}
</style>
