import { json, error as svError } from '@sveltejs/kit';
import { dev } from '$app/environment';
import supabase from '$lib/supabase';
import { IP_TABLE_NAME, SUPABASE_TABLE_NAME } from '../../../constants/supabase';
import { findAndFilter } from 'swearify';
import { z } from 'zod';

const char_limit = 5000;
const BodySchema = z.object({
	apartmentId: z.number(),
	apartmentType: z.number(),
	message: z
		.string()
		.transform((str) => {
			if (str) {
				const result = findAndFilter(
					str.substring(0, char_limit),
					'☠️', // placeholder
					['sl'], // filter in which languages
					[], // allowed swears
					['prasci', 'golazen'] // add your own words
				);
				if (result.found) {
					return result.filtered_sentense;
				}
			}

			return str?.substring(0, char_limit);
		})
		.optional()
		.nullable(),
	fp: z.string()
});

export async function POST(data) {
	const body = await data.request.json();
	const parsed = BodySchema.safeParse(body);
	if (!parsed.success) {
		return svError(400, { message: JSON.stringify(parsed.error) });
	}

	const { apartmentId, apartmentType, message, fp } = parsed.data;

	if (!dev) {
		const { error } = await supabase
			.from(IP_TABLE_NAME)
			.insert({ ip: fp, apartment_id: apartmentId });

		if (error) {
			return svError(403);
		}
	}

	const { error } = await supabase
		.from(SUPABASE_TABLE_NAME)
		.update({ state: 'FREE', apartment_type: apartmentType, message: message.substring(0, 500) })
		.eq('id', apartmentId);

	if (error) {
		console.error(error.message);

		return svError(400);
	}

	return json({ status: 200 });
}
