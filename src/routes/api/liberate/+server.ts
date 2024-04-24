import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';
import supabase from '$lib/supabase';
import { IP_TABLE_NAME, SUPABASE_TABLE_NAME } from '../../../constants/supabase';
import {findAndFilter} from 'swearify';


export async function POST(data) {
	let { apartmentId, apartmentType, message } = await data.request.json();

	if (message) {
		const result = findAndFilter(message,
			'☠️',                                          // placeholder
			['en', 'sl'],                                     // filter in which languages
			[],                                               // allowed swears
			[],                                               // add your own words
		)
		if (result.found) {
			message = result.filtered_sentense
		}
	}

	if (!apartmentId || !apartmentType) {
		return json({ status: 400 });
	}

	if (!dev) {
		const ip = data.getClientAddress();
		const { error } = await supabase.from(IP_TABLE_NAME).insert({ ip, apartment_id: apartmentId });

		if (error) {
			console.error(error.message);

			return json({ status: 400 });
		}
	}

	const { error } = await supabase
		.from(SUPABASE_TABLE_NAME)
		.update({ state: 'FREE', apartment_type: apartmentType, message: message.substring(0, 500) })
		.eq('id', apartmentId);

	if (error) {
		console.error(error.message);

		return json({ status: 400 });
	}

	return json({ status: 200 });
}
