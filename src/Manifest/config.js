export default {
	RESULT_TYPE: Object.freeze({
		Success: 1, //Process works uninterrupted
		Warning: 2, //Possible complications, but process completed
		Error: 3, //Process was stopped, though not broken
		CriticalError: 4, //Process was stopped, system failure
	}),
	logSuccesses: true,
	logWarnings: true,
	logErrors: true,
	logCriticalErrors: true,

	PROPERTY_TYPES: Object.freeze({
		TEXT: { value: 0, name: 'Text' },
		NUMERIC: { value: 1, name: 'Numeric' },
		DATE: { value: 2, name: 'Date' },
	}),
};
