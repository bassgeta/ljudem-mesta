import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';
import { cleanENLocale } from '../../utils/i18n';

const defaultLocale = 'sl';

register('en', () => import('./locales/en.json'));
register('sl', () => import('./locales/sl.json'));

const getInitialLocale = (): string => {
	const storedLocale = localStorage.getItem('LOCALE');

	if (storedLocale !== null) {
		return cleanENLocale(storedLocale);
	} else {
		const lang = window.navigator.language;

		return cleanENLocale(lang);
	}
};

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? getInitialLocale() : defaultLocale
});
