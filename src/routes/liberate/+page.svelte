<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import supabase from '$lib/supabase';
	import { SUPABASE_TABLE_NAME } from '../../constants/supabase';
	import { TYPE_TO_IMAGE_URL } from '../../constants/apartments';
	import { error } from '@sveltejs/kit';
	import LiberateForm from '../../components/LiberateForm/LiberateForm.svelte';

	const FLATS_PER_FLOOR = 10;
	const AIRBNB_PER_FLAT = 0.4;

	enum ApartmentStatus {
		FREE = 'FREE',
		AIRBNB = 'AIRBNB'
	}

	type Apartment = {
		number: number;
		state: ApartmentStatus;
		apartment_type: number;
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

	function addNewApartment(floorNo: number, appNo: number, state: ApartmentStatus, type: number) {
		if (floors[floorNo] === undefined) {
			addFloor(floorNo);
		}

		floors[floorNo].apartments[appNo] = { number: appNo, state, apartment_type: type };
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
				addNewApartment(
					apartment.floor,
					apartment.apartment,
					apartment.state,
					apartment.apartment_type
				);
			});
		} catch (error) {
			console.error(error.message);
		}
	}

	async function fetchLastFloorData() {
		try {
			// Fetch data from Supabase
			const { data, error } = await supabase
				.from(SUPABASE_TABLE_NAME)
				.select('floor')
				.order('floor', { ascending: false })
				.limit(1);

			if (!data || data?.length == 0) {
				console.log(data);
				return null;
			}

			const { count } = await supabase
				.from(SUPABASE_TABLE_NAME)
				.select('*', { count: 'exact' })
				.eq('floor', data[0].floor);

			return { floor: data[0].floor, count };
		} catch (error) {
			console.error(error.message);
		}
	}

	async function removeAppartments(count?: number, floor?: number) {
		try {
			const { error } = await supabase.from(SUPABASE_TABLE_NAME).delete().neq('id', 0);
		} catch (e) {
			console.error(error.message);
		}
	}

	async function generateApartment(floor: number, appartment_number: number) {
		const state = Math.random() < AIRBNB_PER_FLAT ? ApartmentStatus.AIRBNB : ApartmentStatus.FREE;

		const newAppartment = {
			state,
			apartment_type: Math.ceil(Math.random() * 10),
			apartment: appartment_number,
			floor
		};
		const { error } = await supabase.from(SUPABASE_TABLE_NAME).insert(newAppartment);

		return newAppartment;
	}

	async function generateApartments(quantity: number) {
		let fresh = false;
		const apartments = [];
		let lastFloorData = await fetchLastFloorData();

		if (lastFloorData === null) {
			lastFloorData = { floor: 0, count: 0 };
			fresh = true;
		}

		let missingFlatsTillNextFloor =
			FLATS_PER_FLOOR - lastFloorData?.count! == 0
				? FLATS_PER_FLOOR
				: FLATS_PER_FLOOR - lastFloorData?.count!;
		let currentFloor = lastFloorData?.floor!;

		for (let i = 0; i < quantity; i++) {
			currentFloor =
				missingFlatsTillNextFloor == FLATS_PER_FLOOR && !fresh ? currentFloor + 1 : currentFloor;

			const newAppartment = await generateApartment(
				currentFloor,
				FLATS_PER_FLOOR - missingFlatsTillNextFloor
			);

			apartments.push(newAppartment);

			missingFlatsTillNextFloor -= 1;
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

	async function liberateApartment(floorNo: number, appNo: number) {
		console.log('liberating', floorNo, appNo);
		const { error } = await supabase
			.from(SUPABASE_TABLE_NAME)
			.update({ state: 'FREE' })
			.eq('floor', floorNo)
			.eq('apartment', appNo);

		// console.log('erar', error);
	}

	let apartmentToLiberate: number | null = null;
	function openLiberatePopup(apartmentId: number) {
		apartmentToLiberate = apartmentId;
	}

	function closeLiberatePopup() {
		apartmentToLiberate = null;
	}

	function handleLiberateSubmit(apartmentId: string, selectedType: number, message: string) {
		console.log('sabumito!', { apartmentId, selectedType, message });
		apartmentToLiberate = null;
	}
</script>

<svelte:head>
	<title>{$_('liberate.head.title')}</title>
</svelte:head>

<div class="building">
	{#if apartmentToLiberate !== null}
		<LiberateForm
			apartmentNumber="{apartmentToLiberate}"
			handleSubmit="{handleLiberateSubmit}"
			handleClose="{closeLiberatePopup}" />
	{/if}
	{#each floors as floor}
		<div class="floor">
			{#each floor.apartments as apartment}
				<!-- {apartment.state} -->
				<div class="apartment">
					{#if apartment.state === ApartmentStatus.AIRBNB}
						<img src="{TYPE_TO_IMAGE_URL.airbnb}" width="50px" height="50px" />

						<button on:click="{() => openLiberatePopup()}">Liberate!</button>
					{/if}
					{#if apartment.state === ApartmentStatus.FREE}
						{console.log(
							'apartman',
							apartment,
							apartment.apartment_type,
							TYPE_TO_IMAGE_URL[apartment.apartment_type]
						)}
						<img src="{TYPE_TO_IMAGE_URL[apartment.apartment_type]}" width="50px" height="50px" />
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>
<div class="controls">
	<button on:click="{() => generateApartments(10)}">Generate</button>
	<button on:click="{() => removeAppartments()}">Clear</button>
</div>

<style>
	.building {
		position: relative;
		width: 600px;
		display: flex;
		flex-direction: column;
		min-height: 40vh;
		max-height: 40vh;
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
