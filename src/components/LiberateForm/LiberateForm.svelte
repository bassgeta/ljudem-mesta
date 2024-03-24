<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Cross from '$lib/assets/icons/cross.svelte';
	import ShareStep from './blocks/ShareStep.svelte';
	import ChooseStep from './blocks/ChooseStep.svelte';
	import { ApartmentType } from '../../utils/liberation';
	import MessageStep from './blocks/MessageStep.svelte';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export let handleSubmit = (selectedType: ApartmentType, message: string) => {};
	export let handleClose = () => {};

	let step: 'share' | 'choose' | 'message' = 'share';
	let selectedType: ApartmentType;

	function onShareComplete() {
		step = 'choose';
	}

	function onChooseComplete(type: ApartmentType) {
		selectedType = type;
		step = 'message';
	}

	function onMessageComplete(message: string) {
		if (!selectedType) {
			return;
		}
		handleSubmit(selectedType, message);
	}

	$: subtitle = {
		share: $_('liberateForm.share-step.subtitle'),
		choose: $_('liberateForm.choose-step.subtitle'),
		message: $_('liberateForm.message-step.subtitle')
	}[step];
</script>

<div class="liberate-popup">
	<div class="liberate-content">
		<button class="close-button" on:click="{handleClose}">
			<Cross />
		</button>
		<h2 class="liberate-title">
			{$_('liberateForm.title')}
		</h2>
		<p class="liberate-subtitle">{subtitle}</p>
		{#if step === 'share'}
			<ShareStep handleSubmit="{onShareComplete}" />
		{:else if step === 'choose'}
			<ChooseStep handleSubmit="{onChooseComplete}" />
		{:else if step === 'message'}
			<MessageStep handleSubmit="{onMessageComplete}" />
		{:else}
			<div></div>
		{/if}
	</div>
</div>

<style>
	.liberate-popup {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		min-height: 100%;
		max-height: 100%;
		background-color: rgba(255, 255, 255, 0.95);
		overflow-y: auto;
		padding-bottom: 1rem;
		z-index: 3;
	}

	.liberate-content {
		display: flex;
		flex-direction: column;
		align-items: center;

		color: var(--color-black);
		position: relative;
		width: 100%;
		height: 100%;
	}

	.liberate-title {
		font-size: var(--font-xxl);
		margin-top: 4rem;
		text-transform: uppercase;
		font-weight: 700;
	}

	.liberate-subtitle {
		text-align: center;
		margin-top: 1rem;
		font-weight: 500;
		font-size: var(--font-l);
	}

	.close-button {
		position: absolute;
		width: 48px;
		height: 48px;
		top: 1rem;
		right: 1rem;

		color: black;
		border: 2px solid black;
		border-radius: 50%;

		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
</style>
