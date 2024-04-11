<script lang="ts">
	import Arrow from '$lib/assets/icons/arrow.svelte';
	import { _ } from 'svelte-i18n';

	export let handleSubmit = () => {};

	const url = 'www.airbnbpejtdomov.si';
	let isCopied = false;

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(url);
			isCopied = true;
		} catch {
			// we aren't gonna do anything XDDD
		}
	}
</script>

<div class="copy-container">
	<div class="shadowed-card address-container">
		<span>{url}</span>
	</div>
	<button class="shadowed-card shadowed-button share-button" on:click="{copyToClipboard}">
		{$_('copy')}
	</button>
</div>
{#if isCopied === true}
	<h4 class="copy-prompt">
		{$_('liberateForm.share-step.prompt')}
	</h4>
	<button class="shadowed-card shadowed-button next-button" on:click="{handleSubmit}">
		<span>{$_('liberateForm.share-step.button')}</span>
		<Arrow />
	</button>
{/if}

<style>
	.copy-container {
		margin-top: 4rem;
		display: flex;
		gap: 1rem;

		@media screen and (max-width: 767px) {
			flex-direction: column;
			align-items: center;
		}
	}

	.address-container {
		background-color: var(--color-white);
		padding: 1rem 3rem;
		font-weight: 500;
		font-size: var(--font-m);
	}

	.share-button {
		background-color: var(--color-neon-green);
	}

	.copy-prompt {
		margin-top: 2rem;
		font-size: var(--font-l);
		font-weight: 700;
	}

	.next-button {
		background-color: var(--color-neon-green);
		margin-top: 1.5rem;
	}
</style>
