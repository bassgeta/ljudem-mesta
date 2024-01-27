import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'sl';

register('sl', () => import('./locales/sl.json'));

const getInitialLocale = (): string => {
	/*
	const storedLocale = localStorage.getItem('LOCALE');

	if (storedLocale !== null) {
		return cleanENLocale(storedLocale);
	} else {
		const lang = window.navigator.language;

		return cleanENLocale(lang);
	}
  */
	return defaultLocale;
};

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? getInitialLocale() : defaultLocale
});
