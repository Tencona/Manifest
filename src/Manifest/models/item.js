import { Result } from '@/Manifest/models/result';
import Collection from '@/Manifest/collection';
import { v4 as uuid } from 'uuid';

export default class Item {
	constructor(type, name) {
		this.uuid = uuid();
		this.type = type;
		this.name = name || 'Unnamed Item';
		this.values = new Collection('Values');
	}

	get isValid() {
		return !!this.uuid && !!this.type && !!this.name;
	}

	get name() {
		return this._name;
	}

	set name(newName) {
		if (newName !== undefined && newName !== null && newName !== '') {
			this._name = newName;
			return Result.success(`Set Item Name: ${this.name}`, newName);
		}
		this._name = 'Unnamed Item';
		return Result.error(`Invalid name: ${newName}`, newName);
	}

	//! This is the *value* of the property
	// TODO ensure the property actually exists for for the Type before setting
	setValue(property, value) {
		// `property` is the Property uuid
		if (property !== undefined && value !== undefined) {
			const oldValue = this.values.get(property);
			this.values.set(property, value);
			return Result.success(`Set Item Property: '${property}' - '${oldValue}' => '${value}'`);
		}
		return Result.error(`Attempted to set Item Property with Property: '${property}' and Value: '${value}'`);
	}

	removeUnusedProperties() {
		throw new Error(`Not Implemented ${this.name}.removeUnusedProperties()`);

		// TODO this will check this Item's Type's Properties and if it contains a value in `this.properties` that isn't in the Type Properties, it will remove it.
		// Have to do it here because if I do it on removing a property, I'll have to iterate down it and all of its children then look up all of the items under that Type line then remove the property from all of them.
		// That's probably better, but Items are referenced one at a time 99% of the time, so it can perform a clean-up on loading.
	}
}
