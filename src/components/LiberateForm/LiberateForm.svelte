<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Cross from '$lib/assets/icons/cross.svelte';

	export let apartmentNumber = 0;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export let handleSubmit = (apartmentId: string, selectedType: number, message: string) => {};
	export let handleClose = () => {};

	let step: 'share' | 'choose' | 'message' = 'share';
	let selectedType: number;
	let message: string = '';

	function onShareComplete() {
		step = 'choose';
	}

	function onChooseComplete(type: number) {
		selectedType = type;
		step = 'message';
	}

	function onMessageComplete(msg: string) {
		handleSubmit(apartmentNumber, selectedType, message);
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
	</div>
</div>

<style>
	.liberate-popup {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.95);
	}

	.liberate-content {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.liberate-title {
		margin-top: 2rem;
		text-transform: uppercase;
		font-weight: 700;
	}

	.liberate-subtitle {
		font-weight: 500;
	}

	.close-button {
		position: absolute;
		width: 48px;
		height: 48px;
		top: 1.5rem;
		right: 1.5rem;

		color: black;
		border: 2px solid black;
		border-radius: 50%;

		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
</style>
