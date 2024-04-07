<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import supabase from '$lib/supabase';
	import { APARTMENT_TYPE_TO_IMAGE_URL, AIRBNB_IMAGE_URL } from '../constants/apartments';
	import {
		ApartmentStatus,
		fetchApartmentData,
		liberateApartment,
		type Apartment,
		ApartmentType
	} from '../utils/liberation';
	import LiberateForm from './LiberateForm/LiberateForm.svelte';
	import DevDbControls from './DevDBControls.svelte';
	import LiberationMessage from './LiberationMessage.svelte';

	type Floor = {
		number: number;
		apartments: Apartment[];
	};

	let floors: Floor[] = [];
	function addFloor(floorNo: number) {
		const newFloor: Floor = { number: floorNo, apartments: [] };
		floors[floorNo] = newFloor;
	}

	function addNewApartment(
		id: number,
		floorNo: number,
		appNo: number,
		state: ApartmentStatus,
		type: number,
		message: string | null
	) {
		if (floors[floorNo] === undefined) {
			addFloor(floorNo);
		}

		floors[floorNo].apartments[appNo] = { id, number: appNo, state, apartment_type: type, message };
	}

	function clearApartments() {
		floors = [];
	}

	onMount(async () => {
		const appartments = await fetchApartmentData();
		console.log('apartmani', appartments);

		if (appartments) {
			appartments.forEach((apartment) => {
				addNewApartment(
					apartment.id,
					apartment.floor,
					apartment.apartment,
					apartment.state,
					apartment.apartment_type,
					apartment.message
				);
			});
		}

		const subscription = supabase
			.channel('schema-db-changes')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public'
				},
				(payload) => {
					const updatedApartment = payload.new;
					// TODO typecheck here
					if (floors.length - 1 < updatedApartment.floor) {
						addNewApartment(
							updatedApartment.id,
							updatedApartment.floor,
							updatedApartment.apartment,
							updatedApartment.state,
							updatedApartment.apartment_type,
							updatedApartment.message
						);
					} else {
						floors[updatedApartment.floor].apartments[updatedApartment.apartment] = {
							id: updatedApartment.id,
							apartment_type: updatedApartment.apartment_type,
							number: updatedApartment.apartment,
							state: updatedApartment.state
						};
					}
				}
			)
			.subscribe();
	});
	$: console.log('flori', floors);

	let apartmentToLiberate: number | null = null;
	function openLiberatePopup(apartmentId: number) {
		apartmentToLiberate = apartmentId;
	}

	function closeLiberatePopup() {
		apartmentToLiberate = null;
	}

	function handleLiberateSubmit(selectedType: ApartmentType, message: string) {
		console.log('sabumito!', { apartmentToLiberate, selectedType, message });
		liberateApartment(apartmentToLiberate, selectedType, message);
		apartmentToLiberate = null;
	}
</script>

<div class="liberate-container">
	<div class="what-to-do">
		<h4 class="what-to-do-title">
			{@html $_('liberate.what-to-do.title')}
		</h4>
		<div class="what-to-do-description">
			{$_('liberate.what-to-do.description')}
		</div>
	</div>
	<div class="building-outer">
		{#if apartmentToLiberate !== null}
			<LiberateForm handleSubmit="{handleLiberateSubmit}" handleClose="{closeLiberatePopup}" />
		{/if}
		<div class="building-inner" class:disable-scroll="{apartmentToLiberate !== null}">
			{#each floors as floor}
				<div class="floor">
					{#each floor.apartments as apartment}
						<!-- {apartment.state} -->
						{#if apartment && apartment.state === ApartmentStatus.AIRBNB}
							<button class="apartment" on:click="{() => openLiberatePopup(apartment.id)}">
								<img loading="lazy" src="{AIRBNB_IMAGE_URL}" class="apartment-image" />
							</button>
						{/if}
						{#if apartment && apartment.state === ApartmentStatus.FREE}
							<div class="apartment">
								<img
									loading="lazy"
									src="{APARTMENT_TYPE_TO_IMAGE_URL[apartment.apartment_type] ||
										APARTMENT_TYPE_TO_IMAGE_URL[ApartmentType.TYPE_1]}"
									class="apartment-image" />
								{#if apartment.message && apartment.message.length > 0}
									<LiberationMessage message="{apartment.message}" />
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
<DevDbControls clearApartments="{clearApartments}" />

<style>
	.liberate-container {
		width: 100%;
		max-width: 1400px;

		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 0 1.5rem;
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

		margin: 4rem 0;
		padding: 0 2rem;
	}

	.what-to-do-title {
		flex-grow: 2;
		font-size: var(--font-xl);
		font-weight: 700;
	}

	.what-to-do-description {
		border: 2px solid var(--color-black);
		border-radius: 12px;
		padding: 1rem 2rem;

		text-align: center;
		font-weight: 500;
		font-size: var(--font-m);
	}

	.building-outer {
		position: relative;
		width: 100%;
		display: flex;
		align-items: flex-start;
		overflow: hidden;

		border: 4px solid var(--color-black);
		border-radius: 25px;
		background-color: #87ceeb;
		padding: 0 3rem;

		@media only screen and (max-width: 767px) {
			padding: 0 0.5rem;
		}
	}

	.disable-scroll {
		overflow: hidden;
	}

	.building-inner {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;

		min-height: 70vh;
		max-height: 70vh;
		overflow-y: auto;

		border-left: 2px solid var(--color-black);
		border-right: 2px solid var(--color-black);
	}

	.floor {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.apartment {
		position: relative;
		width: 200px;
		height: 250px;
	}

	.apartment-image {
		width: 100%;
		height: 100%;
	}
</style>
