<script lang="ts">
	import Arrow from '$lib/assets/icons/arrow.svelte';
	import { _ } from 'svelte-i18n';

	let message: string = '';

	export let handleSubmit = (msg: string) => {};

	function handleNoMessageClick() {
		handleSubmit('');
	}

	function handleSubmitClick() {
		handleSubmit(message);
	}
</script>

<textarea class="liberate-card message-input" bind:value="{message}" maxlength="{100}" autofocus
></textarea>
<button class="no-message-button" on:click="{() => handleNoMessageClick()}">
	<span>{$_('liberateForm.message-step.no-message')}</span>
	<Arrow />
</button>
<button class="liberate-card next-button" on:click="{() => handleSubmitClick()}">
	<span>{$_('liberateForm.message-step.button')}</span>
	<Arrow />
</button>

<style>
	.message-input {
		background-color: var(--color-white);
		width: 440px;
		height: 120px;
		padding: 1rem;
		margin-top: 2rem;
		font-size: var(--font-s);
	}

	.no-message-button {
		gap: 0.75rem;
		text-decoration: underline;
		margin: 1.5rem 0;
		font-weight: 700;
		font-size: var(--font-m);
	}

	.next-button {
		display: flex;
		align-items: center;
		gap: 1rem;

		background-color: var(--color-neon-green);
		font-weight: 700;
		font-size: var(--font-m);

		padding: 1rem 1.5rem;
		margin-top: 2rem;
	}
</style>
