import { Result, RESULT_TYPE } from './result';
import { exists, uuid } from '../extensions/utility';

export default class Item {
	//TODO Add support for multiple Types
	constructor(type) {
		this.uuid = uuid();
		this.type = type;
		this.properties = {};
	}

	get isValid() {
		return !!this.uuid && !!this.type;
	}

	setProperty(property, value) {
		//`property` is the Property uuid
		if (property && value) {
			let oldValue = this.properties[property];
			this.properties[property] = value;
			return new Result(RESULT_TYPE.Success, `Set Item Property: '${property}' - '${oldValue}' => '${value}'`);
		} else
			return new Result(
				RESULT_TYPE.Error,
				`Attempted to set Item Property with Property: '${property}' and Value: '${value}'`
			);
	}
}
