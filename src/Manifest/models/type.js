import Manifest from '../manifest';
import ManifestConfig from '../config';
import { Result, RESULT_TYPE } from './result';
import { exists, uuid } from '../extensions/utility';

export default class Type {
	constructor(name) {
		this.uuid = uuid();
		this.name = name;
		this.parentType = undefined;
		this.pageLayout = undefined; //Unsure how to handle this.
		this._properties = [];
	}

	get isValidType() {
		return exists(this.name);
	}

	addProperty(property) {
		if (property && property.isValidProperty) {
			if (this.properties.map(x => x.name).includes(property.name)) {
				return new Result(
					RESULT_TYPE.Error,
					`Attempted to add a Property in Type.addProperty() but a Property with the same name already exists: ${
						property.name
					}`
				);
			}

			this._properties.push(property);
			return new Result(
				RESULT_TYPE.Success,
				`Added Property - name: '${property.name}'\nvalueType: '${
					property.valueType.name
				}'\nvalidation: ${property.validation ? 'true' : 'false'}`
			);
		} else
			return new Result(
				RESULT_TYPE.Error,
				'Attempted to add an invalid Property in Type.addProperty()'
			);
	}

	get properties() {
		//Combine all parent Types and with this._properties
		let props = this._properties;
		if (this.parentType) props = props.concat(this.parentType.properties);

		return props;

		//This needs to grab all properties then traverse up to the `parentType` and get its properties, ignoring the ones that match on any of the names already gathered.
		/*
		Sedan.parentType = Car;
		Sedan.wheels; //Added to list

		Car.parentType = Vehicle;
		Car.wheels; //This is ignored because we already have a `wheels` property
		
		Vehicle.parentType = null;
		Vehicle.make; //Added to list
		Vehicle.model; //Added to list

		The Item of this Type would have all of these properties available to it to assign values to.
		properties = [wheels, make, model];
		
		Item.type.properties = [wheels, make, model];
		Item.wheels = 4;
		Item.make = 'Honda';
		Item.model = 'Civic';

		*/
	}
	set properties(value) {
		return value;
	}
}
