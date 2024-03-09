<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import supabase from '$lib/supabase';
	import { SUPABASE_TABLE_NAME } from '../../constants/supabase';

	enum ApartmentStatus {
		FREE = 'FREE',
		AIRBNB = 'AIRBNB'
	}

	type Apartment = {
		number: number;
		state: ApartmentStatus;
	};

	type Floor = {
		number: number;
		apartments: Apartment[];
	};

	let floors: Floor[] = [];
	function addFloor(floorNo: number) {
		const newFloor: Floor = { number: floorNo, apartments: [] };
		floors[floorNo] = newFloor;
	}

	function addNewApartment(floorNo: number, appNo: number, state: ApartmentStatus) {
		if (floors[floorNo] === undefined) {
			addFloor(floorNo);
		}

		floors[floorNo].apartments[appNo] = { number: appNo, state };
	}

	async function fetchApartmentData() {
		try {
			// Fetch data from Supabase
			const { data, error } = await supabase.from(SUPABASE_TABLE_NAME).select('*');

			if (error) {
				throw new Error(`Error fetching data: ${error.message}`);
			}

			console.log('the dejta', data);
			data.forEach((apartment) => {
				addNewApartment(apartment.floor, apartment.apartment, apartment.state);
			});
		} catch (error) {
			console.error(error.message);
		}
	}
	onMount(async () => {
		await fetchApartmentData();

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

					floors[updatedApartment.floor].apartments[updatedApartment.apartment] = {
						number: updatedApartment.apartment,
						state: updatedApartment.state
					};
				}
			)
			.subscribe();
	});

	async function liberateApartment(floorNo: number, appNo: number) {
		console.log('liberating', floorNo, appNo);
		const { error } = await supabase
			.from(SUPABASE_TABLE_NAME)
			.update({ state: 'FREE' })
			.eq('floor', floorNo)
			.eq('apartment', appNo);

		console.log('erar', error);
	}
</script>

<svelte:head>
	<title>{$_('liberate.head.title')}</title>
</svelte:head>

<div class="building">
	{#each floors as floor}
		<div class="floor">
			{#each floor.apartments as apartment}
				<div class="apartment">
					{apartment.state}
					{#if apartment.state === ApartmentStatus.AIRBNB}
						<button on:click="{() => liberateApartment(floor.number, apartment.number)}"
							>Liberate!</button>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
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
</style>
