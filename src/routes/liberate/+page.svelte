<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import supabase from '$lib/supabase';
	import { TYPE_TO_IMAGE_URL } from '../../constants/apartments';
	import { ApartmentStatus, fetchApartmentData, generateApartments, liberateApartment, removeAppartments, type Apartment } from './liberation';

	type Floor = {
		number: number;
		apartments: Apartment[];
	};

	let floors: Floor[] = [];
	function addFloor(floorNo: number) {
		const newFloor: Floor = { number: floorNo, apartments: [] };
		floors[floorNo] = newFloor;
	}

	function addNewApartment(floorNo: number, appNo: number, state: ApartmentStatus, type: number) {
		if (floors[floorNo] === undefined) {
			addFloor(floorNo);
		}

		floors[floorNo].apartments[appNo] = { number: appNo, state, apartment_type: type };
	}

	function clearAppartments() {
		floors = []
	}


	onMount(async () => {
		const appartments = await fetchApartmentData()

		if (appartments) {
			appartments.forEach((apartment) => {
				addNewApartment(
					apartment.floor,
					apartment.apartment,
					apartment.state,
					apartment.apartment_type
				)
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
							updatedApartment.floor,
							updatedApartment.apartment,
							updatedApartment.state,
							updatedApartment.apartment_type
						);
					} else {
						floors[updatedApartment.floor].apartments[updatedApartment.apartment] = {
							number: updatedApartment.apartment,
							state: updatedApartment.state
						};
					}
				}
			)
			.subscribe();
	});

</script>

<svelte:head>
	<title>{$_('liberate.head.title')}</title>
</svelte:head>

<div class="building">
	{#each floors as floor}
		<div class="floor">
			{#each floor.apartments as apartment}
				<!-- {apartment.state} -->
				<div class="apartment">
					{#if apartment.state === ApartmentStatus.AIRBNB}
						<img src="{TYPE_TO_IMAGE_URL.airbnb}" width="50px" height="50px" />

						<button on:click="{() => liberateApartment(floor.number, apartment.number)}"
							>Liberate!</button>
					{/if}
					{#if apartment.state === ApartmentStatus.FREE}
						<!-- {console.log(
							'apartman',
							apartment,
							apartment.apartment_type,
							TYPE_TO_IMAGE_URL[apartment.apartment_type]
						)} -->
						<img src="{TYPE_TO_IMAGE_URL[apartment.apartment_type]}" width="50px" height="50px" />
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>
<div class="controls">
	<button on:click="{() => generateApartments(10)}">Generate</button>
	<button on:click="{() => {removeAppartments();clearAppartments();}}">Clear</button>
</div>

<style>
	.building {
		width: 600px;
		display: flex;
		flex-direction: column;
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
