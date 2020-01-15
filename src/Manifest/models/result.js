import ManifestConfig from '@/Manifest/config';

export class Result {
	constructor(resultType, message, payload, forceLog) {
		this.resultType = resultType;
		this.message = message;
		this.payload = payload;

		this.isSuccessful = false;
		this.isWarning = false;
		this.isError = false;
		this.isCriticalError = false;
		switch (resultType) {
			case 1: //Success
				this.isSuccessful = true;
				if ((ManifestConfig.logSuccesses || forceLog) && message) console.log(this.message);
				break;
			case 2: //Warning
				this.isWarning = true;
				if ((ManifestConfig.logWarnings || forceLog) && message) console.warn(this.message);
				break;
			case 3: //Error
				this.isError = true;
				if ((ManifestConfig.logErrors || forceLog) && message) console.warn(this.message);
				break;
			case 3: //Critical Error
				this.isCriticalError = true;
				if ((ManifestConfig.logCriticalErrors || forceLog) && message) console.error(this.message);
				break;
		}
	}

	static success(message, payload, forceLog) {
		return new Result(RESULT_TYPE.Success, message, payload, forceLog);
	}

	static warning(message, payload, forceLog) {
		return new Result(RESULT_TYPE.Warning, message, payload, forceLog);
	}

	static error(message, payload, forceLog) {
		return new Result(RESULT_TYPE.Error, message, payload, forceLog);
	}

	static criticalError(message, payload, forceLog) {
		return new Result(RESULT_TYPE.CriticalError, message, payload, forceLog);
	}
}

export let RESULT_TYPE = ManifestConfig.RESULT_TYPE;
