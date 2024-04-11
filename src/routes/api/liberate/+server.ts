import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';
import supabase from '$lib/supabase';
import { IP_TABLE_NAME, SUPABASE_TABLE_NAME } from '../../../constants/supabase';

export async function POST(data) {
	const { apartmentId, apartmentType, message } = await data.request.json();

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
		.update({ state: 'FREE', apartment_type: apartmentType })
		.eq('id', apartmentId);

	if (error) {
		console.error(error.message);

		return json({ status: 400 });
	}

	return json({ status: 200 });
}
