import supabase from '$lib/supabase';
import { SUPABASE_TABLE_NAME } from '../constants/supabase';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import thenby from 'thenby';
const { firstBy } = thenby;

const FLATS_PER_FLOOR = 3;
const AIRBNB_PER_FLAT = 1;

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

const ApartmentSchema = z.object({
	id: z.number(),
	created_at: z.string().transform((s) => new Date(s)),
	floor: z.number(),
	apartment: z.number(),
	state: z.enum(['AIRBNB', 'FREE']),
	apartment_type: z.number(),
	unlocked_at: z
		.string()
		.transform((s) => new Date(s))
		.nullable(),
	message: z.string().nullable()
});
export type Apartment = z.infer<typeof ApartmentSchema>;

const ApartmentArray = ApartmentSchema.array();

export async function fetchTotalLiberated() {
	try {
		const { count, error } = await supabase
			.from(SUPABASE_TABLE_NAME)
			.select('*', { count: 'exact' })
			.eq('state', 'FREE');

		console.log('kaj mona', count);

		if (error) {
			throw new Error(`Error fetching data: ${error.message}`);
		}

		return count;
	} catch (error) {
		console.error(error.message);
	}
}

export async function fetchApartmentData() {
	try {
		// Fetch data from Supabase
		const { data, error } = await supabase.from(SUPABASE_TABLE_NAME).select('*');

		if (error) {
			throw new Error(`Error fetching data: ${error.message}`);
		}

		return ApartmentArray.parse(data);
	} catch (error) {
		console.error(error.message);

		return [] as z.infer<typeof ApartmentArray>;
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

		const apartments = ApartmentArray.parse(data ?? []);

		if (apartments.length == 0) {
			return null;
		}
		const [apartment] = apartments;

		const { count } = await supabase
			.from(SUPABASE_TABLE_NAME)
			.select('*', { count: 'exact' })
			.eq('floor', apartment.floor)
			.limit(3);

		return { floor: apartment.floor, count };
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
	const state = Math.random() <= AIRBNB_PER_FLAT ? ApartmentStatus.AIRBNB : ApartmentStatus.FREE;

	const newAppartment = {
		state,
		apartment_type: Math.ceil(Math.random() * 6),
		apartment: appartment_number,
		floor
	};
	const { error } = await supabase.from(SUPABASE_TABLE_NAME).insert(newAppartment);
	if (error) console.error(error);

	return newAppartment;
}

export async function generateApartments() {
	const current = await fetchApartmentData();
	const plusOneGrid = apartmentGrid(current, 1);
	const newApartments = plusOneGrid
		.filter((app) => app.id === -1)
		.map(({ id: _, ...rest }) => rest);
	await Promise.all(
		newApartments.map((newApp) => supabase.from(SUPABASE_TABLE_NAME).insert(newApp))
	);
}

export async function liberateApartment(apartmentId: number, type: ApartmentType, message: string) {
	const { error } = await supabase
		.from(SUPABASE_TABLE_NAME)
		.update({ state: 'FREE', apartment_type: type, message })
		.eq('id', apartmentId);

	// console.log('erar', error);
}

export async function handleLiberateSubmit(
	apartmentId: number,
	apartmentType: number,
	message?: string
) {
	return fetch('/api/liberate', {
		method: 'POST',
		body: JSON.stringify({
			apartmentId,
			apartmentType,
			message
		}),
		headers: {
			'content-type': 'application/json'
		}
	});
}

export function subscribeToApartments(callback: (app: Apartment) => any) {
	const connection = supabase
		.channel('schema-db-changes')
		.on(
			'postgres_changes',
			{
				event: '*',
				schema: 'public',
				table: SUPABASE_TABLE_NAME
			},
			(payload) => {
				console.log({ payload });
				if (payload.new) callback(ApartmentSchema.parse(payload.new));
			}
		)
		.subscribe();
	return () => connection.unsubscribe();
}

export function applyNewApartment(apartments: Apartment[], apartment: Apartment) {
	const obj = Object.fromEntries(apartments.map((app) => [getApartmentKey(app), app]));
	obj[getApartmentKey(apartment)] = apartment;
	return Object.values(obj);
}

function getApartmentKey(app: Apartment) {
	return `${app.floor}-${app.apartment}` as `${number}-${number}`;
}

export function apartmentGrid(aparments: Apartment[], plusRows = 0) {
	const current = Object.fromEntries(aparments.map((app) => [getApartmentKey(app), app]));

	const floors = aparments.reduce((max, curr) => Math.max(max, curr.floor), 0) + 1 + plusRows;
	const blanks = Object.fromEntries(
		new Array(floors).fill(null).flatMap((_, floor) =>
			new Array(3).fill(null).map(
				(_, apartment) =>
					[
						`${floor}-${apartment}`,
						{
							floor,
							apartment,
							apartment_type: 0,
							created_at: new Date(),
							message: null,
							state: 'AIRBNB',
							unlocked_at: null,
							id: -1
						}
					] as const
			)
		)
	);
	return (
		Object.values({
			...blanks,
			...current
		}) as Apartment[]
	).sort(firstBy('floor', 'desc').thenBy('apartment', 'asc'));
}
