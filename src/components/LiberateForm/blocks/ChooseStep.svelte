<script lang="ts">
	import Arrow from '$lib/assets/icons/arrow.svelte';
	import { _ } from 'svelte-i18n';
	import { ApartmentType } from '../../../utils/liberation';
	import { APARTMENT_TYPE_TO_IMAGE_URL } from '../../../constants/apartments';
	import { Flats } from '../../Block/blocks';

	export let handleSubmit = (type: number) => {};

	let selectedType: number | null = null;

	function handleSelectType(type: number) {
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
	{#each Object.entries(Flats) as [id, apartmentType]}
		<div class="type-selector">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="type-chosen-indicator"
				on:click="{() => handleSelectType(Number(id))}"
				class:type-selected="{selectedType === Number(id)}">
			</div>
			<div class="button-wrapper" class:button-wrapper-selected="{selectedType === Number(id)}">
				<button
					class="type-card"
					class:type-card-selected="{selectedType === Number(id)}"
					on:click="{() => handleSelectType(Number(id))}">
					<svelte:component this="{apartmentType.flat}" />
					<!-- <img src="{APARTMENT_TYPE_TO_IMAGE_URL[apartmentType]}" class="type-image" /> -->
				</button>
			</div>
		</div>
	{/each}
</div>
<button
	disabled="{selectedType === null}"
	class="shadowed-card shadowed-button next-button"
	on:click="{() => handleNextClick()}">
	<span>{$_('liberateForm.choose-step.button')}</span>
	<Arrow />
</button>

<style>
	.types-container {
		margin: 1rem 1rem 0 1rem;
		display: flex;
		gap: 1rem;
		justify-content: center;
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
		cursor: pointer;
		&.type-selected {
			background-color: var(--color-neon-green);
		}
	}

	.type-card {
		width: 140px;
		overflow: hidden;
		background-color: var(--color-white);
		cursor: pointer;

		position: relative;
		border-radius: 20px;
		border: 2px solid black;
		transform-style: preserve-3d;
		color: var(--color-black);
	}

	.type-card-selected {
		border-color: var(--color-neon-green);
	}

	.button-wrapper {
		filter: drop-shadow(6px 6px 0px black);
		/* transition:
			filter 0.2s linear,
			transform 0.2s linear; */
		transform: translate(-3px, -3px);
		&:hover {
			filter: drop-shadow(3px 3px 0px black);
			transform: translate(0, 0);
		}
	}

	.button-wrapper.button-wrapper-selected {
		/* filter: drop-shadow(6px 6px 0px var(--color-neon-green)); */
		&:hover {
			/* filter: drop-shadow(3px 3px 0px var(--color-neon-green)); */
		}
	}

	.next-button {
		color: var(--color-black);
		background-color: var(--color-neon-green);
		margin-top: 2rem;
	}

	.next-button:disabled {
		color: var(--color-black);
		pointer-events: none;
		background-color: var(--color-medium-grey);
	}
</style>
