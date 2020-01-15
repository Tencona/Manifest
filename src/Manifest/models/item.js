import { Result, RESULT_TYPE } from '@/Manifest/models/result';
import { exists, uuid } from '@/Manifest/extensions/utility';
import Collection from '@/Manifest/collection';

export default class Item {
	constructor(type) {
		this.uuid = uuid();
		this.type = type;
		this.values = new Collection('Values');
	}

	get isValid() {
		return !!this.uuid && !!this.type;
	}

	//!This is the *value* of the property
	//TODO ensure the property actually exists for for the Type before setting
	setValue(property, value) {
		//`property` is the Property uuid
		if (property && value) {
			let oldValue = this.values.get(property);
			this.values.set(property, value);
			return Result.success(`Set Item Property: '${property}' - '${oldValue}' => '${value}'`);
		} else return Result.error(`Attempted to set Item Property with Property: '${property}' and Value: '${value}'`);
	}

	removeUnusedProperties() {
		//TODO this will check this Item's Type's Properties and if it contains a value in `this.properties` that isn't in the Type Properties, it will remove it.
		//Have to do it here because if I do it on removing a property, I'll have to iterate down it and all of its children then look up all of the items under that Type line then remove the property from all of them.
		//That's probably better, but Items are referenced one at a time 99% of the time, so it can perform a clean-up on loading.
	}
}
