export const cleanENLocale = (locale: string): string => {
	if (locale.includes('en')) {
		return 'en';
	} else {
		return locale;
	}
};
