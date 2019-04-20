import ManifestConfig from '../config';

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
				if ((ManifestConfig.logSuccesses || forceLog) && message)
					console.log(this.message);
				break;
			case 2: //Warning
				this.isWarning = true;
				if ((ManifestConfig.logWarnings || forceLog) && message)
					console.warn(this.message);
				break;
			case 3: //Error
				this.isError = true;
				if ((ManifestConfig.logErrors || forceLog) && message)
					console.warn(this.message);
				break;
			case 3: //Critical Error
				this.isCriticalError = true;
				if ((ManifestConfig.logCriticalErrors || forceLog) && message)
					console.error(this.message);
				break;
		}
	}
}

export let RESULT_TYPE = ManifestConfig.RESULT_TYPE;
