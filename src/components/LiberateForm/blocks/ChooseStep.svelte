<script lang="ts">
	import Arrow from '$lib/assets/icons/arrow.svelte';
	import { _ } from 'svelte-i18n';
	import { ApartmentType } from '../../../utils/liberation';
	import { APARTMENT_TYPE_TO_IMAGE_URL } from '../../../constants/apartments';

	export let handleSubmit = (type: ApartmentType) => {};

	let selectedType: ApartmentType | null = null;

	function handleSelectType(type: ApartmentType) {
		selectedType = type;
	}

	function handleNextClick() {
		if (selectedType === null) {
			return;
		}

		handleSubmit(selectedType);
	}
</script>

<div class="types-container">
	{#each Object.values(ApartmentType) as apartmentType}
		<div class="type-selector">
			<div class="type-chosen-indicator" class:type-selected="{selectedType === apartmentType}">
			</div>
			<button
				class="liberate-card type-card"
				class:type-card-selected="{selectedType === apartmentType}"
				on:click="{() => handleSelectType(apartmentType)}">
				<img src="{APARTMENT_TYPE_TO_IMAGE_URL[apartmentType]}" class="type-image" />
			</button>
		</div>
	{/each}
</div>
<button
	disabled="{selectedType === null}"
	class="liberate-card share-button next-button"
	on:click="{() => handleNextClick()}">
	<span>{$_('liberateForm.choose-step.button')}</span>
	<Arrow />
</button>

<style>
	.types-container {
		margin: 1rem 1rem 0 1rem;
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		flex-flow: wrap;
	}

	.type-selector {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.type-chosen-indicator {
		width: 24px;
		height: 24px;
		border: 1px solid var(--color-black);
		background-color: var(--color-medium-grey);
		border-radius: 50%;
	}

	.type-selected {
		background-color: var(--color-neon-green);
	}

	.type-card {
		width: 140px;
		height: 140px;
		background-color: var(--color-white);
	}

	.type-card-selected {
		box-shadow: 0px 0px 15px 0px var(--color-neon-green);
	}

	.type-image {
		width: 100%;
		height: 100%;
		border-radius: 20px;
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

	.next-button:disabled {
		color: var(--color-black);
		pointer-events: none;
		background-color: var(--color-medium-grey);
	}
</style>
