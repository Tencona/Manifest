import { Result, RESULT_TYPE } from './result';
import { exists, uuid } from '../extensions/utility';

export default class Item {
	constructor(type) {
		this.uuid = uuid();
		this.type = type;
		this.properties = type.properties;
		//? Should this be the Property's uuid?
		//* The page will handle the Property's validation which should be checked before setProperty() is ever called, but the uuid should be what's used.
		//This will be an item with the Type's Property's name and the Item's value {'name':'Tom','age':42,'spouse':[Item]}
		//Example:
		//Item: Car
		//Property: Wheels (Numeric)
		//Item.properties = {'Wheels': 4}

		//Update:
		//A dictionary makes the lookup quick, but the property needs to remain a reference to the original Property in case the validation is updated.
	}

	get isValidItem() {
		return !!this.uuid && !!this.type;
	}

	setProperty(property, value) {
		//`property` is just a string that matches the Property.name it refers to
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
