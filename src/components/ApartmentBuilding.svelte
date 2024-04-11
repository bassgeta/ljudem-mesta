<script lang="ts">
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

	async function handleLiberateSubmit(selectedType: ApartmentType, message: string) {
		const response = await fetch('/api/liberate', {
			method: 'POST',
			body: JSON.stringify({
				apartmentId: apartmentToLiberate,
				apartmentType: selectedType,
				message
			}),
			headers: {
				'content-type': 'application/json'
			}
		});

		console.log('sabumito!', { apartmentToLiberate, selectedType, message });
		apartmentToLiberate = null;
	}
</script>

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

<style>
	.building-outer {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 100%;

		display: flex;
		align-items: flex-start;

		background-color: #87ceeb;
		padding: 0 5rem;

		@media only screen and (max-width: 767px) {
			padding: 0 1rem;
		}
	}

	.disable-scroll {
		overflow: hidden;
	}

	.building-inner {
		width: 100%;
		height: 100%;
		max-height: 100%;
		max-width: 100%;
		overflow-y: auto;
		overflow-x: auto;

		display: flex;
		align-items: center;
		flex-direction: column;

		border-left: 2px solid var(--color-black);
		border-right: 2px solid var(--color-black);
	}

	.floor {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(6, 1fr);
	}

	.apartment {
		position: relative;
		min-width: 200px;
		min-height: 150px;
	}

	.apartment-image {
		width: 100%;
		height: 100%;
	}
</style>
