import { exists, uuid } from '../extensions/utility';

export default class Property {
	constructor(name, valueType, validation) {
		this.uuid = uuid();
		this.name = name;
		this.valueType = valueType;
		this.validation = validation;
	}

	get hasValidValue() {
		return this.validation ? this.validation() : true;
	}

	get isValidProperty() {
		return exists(this.name) && exists(this.valueType);
	}
}
