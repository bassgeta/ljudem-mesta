// +layout.ts
import { browser } from '$app/environment';
import '$lib/i18n'; // Import to initialize. Important :)
import { locale, waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';
import { cleanENLocale } from '../utils/i18n';

export const load: LayoutLoad = async () => {
	if (browser) {
		const storedLocale = localStorage.getItem('LOCALE');

		if (storedLocale !== null) {
			locale.set(cleanENLocale(storedLocale));
		} else {
			const lang = window.navigator.language;

			locale.set(cleanENLocale(lang));
		}
	}
	await waitLocale();
};
