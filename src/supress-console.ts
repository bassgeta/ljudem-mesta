if (import.meta.env.PROD) {
	const { log: ogLog, error: ogError } = console;
	console.log = () => undefined;
	console.error = () => undefined;
}
