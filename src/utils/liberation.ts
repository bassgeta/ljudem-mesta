import supabase from '$lib/supabase';
import { SUPABASE_TABLE_NAME } from '../constants/supabase';
import { error } from '@sveltejs/kit';

const FLATS_PER_FLOOR = 6;
const AIRBNB_PER_FLAT = 0.4;

// tmp type for types
export enum ApartmentType {
	TYPE_1 = '1',
	TYPE_2 = '2',
	TYPE_3 = '3',
	TYPE_4 = '4',
	TYPE_5 = '5',
	TYPE_6 = '6'
}

export enum ApartmentStatus {
	FREE = 'FREE',
	AIRBNB = 'AIRBNB'
}

export type Apartment = {
	id: number;
	number: number;
	state: ApartmentStatus;
	apartment_type: number;
};

export async function fetchApartmentData() {
	try {
		// Fetch data from Supabase
		const { data, error } = await supabase.from(SUPABASE_TABLE_NAME).select('*');

		if (error) {
			throw new Error(`Error fetching data: ${error.message}`);
		}

		return data;
	} catch (error) {
		console.error(error.message);
	}
}

export async function fetchLastFloorData() {
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

export async function removeAppartments(count?: number, floor?: number) {
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
		apartment_type: Math.ceil(Math.random() * 6),
		apartment: appartment_number,
		floor
	};
	const { error } = await supabase.from(SUPABASE_TABLE_NAME).insert(newAppartment);

	return newAppartment;
}

export async function generateApartments(quantity: number) {
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

export async function liberateApartment(
	apartmentId: number,
	type: ApartmentType,
	_message: string
) {
	const { error } = await supabase
		.from(SUPABASE_TABLE_NAME)
		.update({ state: 'FREE', apartment_type: type })
		.eq('id', apartmentId);

	// console.log('erar', error);
}
