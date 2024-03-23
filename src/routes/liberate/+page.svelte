<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import supabase from '$lib/supabase';
	import { APARTMENT_TYPE_TO_IMAGE_URL, AIRBNB_IMAGE_URL } from '../../constants/apartments';
	import {
		ApartmentStatus,
		fetchApartmentData,
		generateApartments,
		liberateApartment,
		removeAppartments,
		type Apartment,
		ApartmentType
	} from '../../utils/liberation';
	import LiberateForm from '../../components/LiberateForm/LiberateForm.svelte';

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
		type: number
	) {
		if (floors[floorNo] === undefined) {
			addFloor(floorNo);
		}

		floors[floorNo].apartments[appNo] = { id, number: appNo, state, apartment_type: type };
	}

	function clearAppartments() {
		floors = [];
	}

	onMount(async () => {
		const appartments = await fetchApartmentData();

		if (appartments) {
			appartments.forEach((apartment) => {
				addNewApartment(
					apartment.id,
					apartment.floor,
					apartment.apartment,
					apartment.state,
					apartment.apartment_type
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
					if (floors.length - 1 < updatedApartment.floor) {
						addNewApartment(
							updatedApartment.id,
							updatedApartment.floor,
							updatedApartment.apartment,
							updatedApartment.state,
							updatedApartment.apartment_type
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

	let apartmentToLiberate: number | null = null;
	function openLiberatePopup(apartmentId: number) {
		apartmentToLiberate = apartmentId;
	}

	function closeLiberatePopup() {
		apartmentToLiberate = null;
	}

	function handleLiberateSubmit(selectedType: ApartmentType, message: string) {
		console.log('sabumito!', { apartmentToLiberate, selectedType, message });
		apartmentToLiberate = null;
	}
</script>

<svelte:head>
	<title>{$_('liberate.head.title')}</title>
</svelte:head>

<div class="building">
	{#if apartmentToLiberate !== null}
		<LiberateForm handleSubmit="{handleLiberateSubmit}" handleClose="{closeLiberatePopup}" />
	{/if}
	{#each floors as floor}
		<div class="floor">
			{#each floor.apartments as apartment}
				<!-- {apartment.state} -->
				<div class="apartment">
					{#if apartment.state === ApartmentStatus.AIRBNB}
						<img src="{AIRBNB_IMAGE_URL}" width="50px" height="50px" />

						<button on:click="{() => openLiberatePopup(apartment.id)}">Liberate!</button>
					{/if}
					{#if apartment.state === ApartmentStatus.FREE}
						<!-- {console.log(
							'apartman',
							apartment,
							apartment.apartment_type,
							TYPE_TO_IMAGE_URL[apartment.apartment_type]
						)} -->
						<img
							src="{APARTMENT_TYPE_TO_IMAGE_URL[apartment.apartment_type] ||
								APARTMENT_TYPE_TO_IMAGE_URL[ApartmentType.TYPE_1]}"
							width="50px"
							height="50px" />
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>
<div class="controls">
	<button on:click="{() => generateApartments(10)}">Generate</button>
	<button
		on:click="{() => {
			removeAppartments();
			clearAppartments();
		}}">Clear</button>
</div>

<style>
	.building {
		position: relative;
		width: 1200px;
		display: flex;
		flex-direction: column;
		min-height: 600px;
		max-height: 600px;
		overflow-y: auto;
	}

	.floor {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.apartment {
		width: 33%;
		padding: 1rem;
		border: 1px solid black;
	}

	button {
		background-color: darksalmon;
	}

	.controls {
		padding: 40px;
		background-color: black;
	}
</style>
