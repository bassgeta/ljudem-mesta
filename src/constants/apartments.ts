import airbnb from '$lib/assets/h/airbnb.png';
import type1 from '$lib/assets/h/h1.png';
import type2 from '$lib/assets/h/h2.png';
import type3 from '$lib/assets/h/h3.png';
import type4 from '$lib/assets/h/h4.png';
import type5 from '$lib/assets/h/h5.png';
import type6 from '$lib/assets/h/h6.png';
import { ApartmentType } from '../utils/liberation';

export const AIRBNB_IMAGE_URL = airbnb;
export const APARTMENT_TYPE_TO_IMAGE_URL = {
	[ApartmentType.TYPE_1]: type1,
	[ApartmentType.TYPE_2]: type2,
	[ApartmentType.TYPE_3]: type3,
	[ApartmentType.TYPE_4]: type4,
	[ApartmentType.TYPE_5]: type5,
	[ApartmentType.TYPE_6]: type6
};
